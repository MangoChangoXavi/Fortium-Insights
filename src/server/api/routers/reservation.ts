import {
  type PrismaClient,
  type Prisma,
  type Reservation,
} from "@prisma/client";
import { type DefaultArgs } from "@prisma/client/runtime/library";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { addConditionToWhere } from "~/utils/functions";

interface fullReservation extends Reservation {
  lot: {
    identifier: string;
    project: {
      name: string;
    };
  };
  user: {
    name: string | null;
  };
}

const getReservationsBetweenDates = async (
  ctx: {
    userId: string | null;
    db: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;
  },
  startDate: Date,
  endDate: Date,
): Promise<fullReservation[]> => {
  return await ctx.db.reservation.findMany({
    take: 100,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      lot: true,
      user: {
        select: {
          name: true,
        },
      },
    },
    where: {
      NOT: {
        startDate: {
          gt: endDate,
        },
        endDate: {
          lt: startDate,
        },
      },
    },
  });
};

const getReservationTransactions = (
  reservation: fullReservation,
  startDate: Date,
  endDate: Date,
) => {
  // Calculate the number of reservations to pay between start and end
  const transactions = [];
  const clientName = `${reservation.firstname} ${reservation.lastname}`;
  const clientEmail = reservation.email;
  const clientPhone = reservation.phone;
  const proyectName = reservation.lot.project.name;
  const lotIdentifier = reservation.lot.identifier;
  const reservationNumber = reservation.reservationNumber;
  if (reservationNumber) {
    const reservationEndDate = new Date(
      reservation.startDate.getFullYear(),
      reservation.startDate.getMonth() + reservationNumber - 1,
      reservation.payday,
    );
    const amount = reservation.reservationPrice.toNumber() / reservationNumber;
    // add one payday per month between start and end
    for (
      let d = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
      d < new Date(endDate.getFullYear(), endDate.getMonth() + 1, 1);
      d.setMonth(d.getMonth() + 1)
    ) {
      const payday = reservation.payday;
      const paydayDate = new Date(d.getFullYear(), d.getMonth(), payday);

      if (
        paydayDate <= reservationEndDate &&
        paydayDate > d &&
        paydayDate <= endDate &&
        paydayDate >= startDate
      ) {
        transactions.push({
          clientName,
          clientEmail,
          clientPhone,
          proyectName,
          lotIdentifier,
          payDate: paydayDate,
          amount,
        });
      }
    }
  } else {
    const paydayDate = new Date(
      reservation.startDate.getFullYear(),
      reservation.startDate.getMonth(),
      reservation.payday,
    );
    const reservationAmount = reservation.reservationPrice.toNumber();
    const reservationStart = new Date(
      reservation.startDate.getFullYear(),
      reservation.startDate.getMonth(),
      reservation.payday,
    );
    const reservationEnd = new Date(
      reservation.endDate.getFullYear(),
      reservation.endDate.getMonth(),
      reservation.payday,
    );
    if (
      paydayDate > startDate &&
      paydayDate <= endDate &&
      paydayDate >= reservationStart &&
      paydayDate <= reservationEnd
    ) {
      transactions.push({
        clientName,
        clientEmail,
        clientPhone,
        proyectName,
        lotIdentifier,
        payDate: paydayDate,
        amount: reservationAmount,
      });
    }
  }

  return transactions;
};

const getDownPaymentTransactions = (
  reservation: fullReservation,
  startDate: Date,
  endDate: Date,
) => {
  const transactions = [];
  const clientName = `${reservation.firstname} ${reservation.lastname}`;
  const clientEmail = reservation.email;
  const clientPhone = reservation.phone;
  const proyectName = reservation.lot.project.name;
  const lotIdentifier = reservation.lot.identifier;
  const downPaymentNumber = reservation.downpaymentNumber;
  const reservationNumber = reservation.reservationNumber;
  // get first down payment payday
  const firstDownPaymentPaydayDate = new Date(
    reservation.startDate.getFullYear(),
    reservation.startDate.getMonth(),
    reservation.payday,
  );
  const lastDownPaymentPaydayDate = new Date(
    reservation.startDate.getFullYear(),
    reservation.startDate.getMonth(),
    reservation.payday,
  );
  if (reservationNumber) {
    firstDownPaymentPaydayDate.setMonth(
      firstDownPaymentPaydayDate.getMonth() + reservationNumber,
    );
    lastDownPaymentPaydayDate.setMonth(
      lastDownPaymentPaydayDate.getMonth() + reservationNumber,
    );
  }
  if (downPaymentNumber) {
    lastDownPaymentPaydayDate.setMonth(
      lastDownPaymentPaydayDate.getMonth() + downPaymentNumber - 1,
    );
  }

  if (downPaymentNumber) {
    const downPaymentStart = new Date(
      reservation.startDate.getFullYear(),
      reservation.startDate.getMonth(),
      reservation.payday,
    );
    const downPaymentEnd = new Date(
      reservation.endDate.getFullYear(),
      reservation.endDate.getMonth(),
      reservation.payday,
    );
    const downPaymentAmount =
      reservation.downpaymentPrice.toNumber() / downPaymentNumber;

    // add one payday per month between start and end
    for (
      let d = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
      d <= new Date(endDate.getFullYear(), endDate.getMonth() + 1, 1);
      d.setMonth(d.getMonth() + 1)
    ) {
      const payday = reservation.payday;
      const paydayDate = new Date(d.getFullYear(), d.getMonth(), payday);

      if (
        paydayDate <= lastDownPaymentPaydayDate &&
        paydayDate >= firstDownPaymentPaydayDate &&
        paydayDate > d &&
        paydayDate <= endDate &&
        paydayDate >= downPaymentStart &&
        paydayDate <= downPaymentEnd
      ) {
        transactions.push({
          clientName,
          clientEmail,
          clientPhone,
          proyectName,
          lotIdentifier,
          payDate: paydayDate,
          amount: downPaymentAmount,
        });
      }
    }
  } else {
    const paydayDate = new Date(
      reservation.startDate.getFullYear(),
      reservation.startDate.getMonth(),
      reservation.payday,
    );
    const reservationStart = new Date(
      reservation.startDate.getFullYear(),
      reservation.startDate.getMonth(),
      reservation.payday,
    );
    const reservationEnd = new Date(
      reservation.endDate.getFullYear(),
      reservation.endDate.getMonth(),
      reservation.payday,
    );

    const downPaymentAmount = reservation.downpaymentPrice.toNumber();
    if (
      paydayDate > startDate &&
      paydayDate <= endDate &&
      paydayDate >= reservationStart &&
      paydayDate <= reservationEnd
    ) {
      transactions.push({
        clientName,
        clientEmail,
        clientPhone,
        proyectName,
        lotIdentifier,
        payDate: paydayDate,
        amount: downPaymentAmount,
      });
    }
  }

  return transactions;
};

const getNormalTransactions = (
  reservation: fullReservation,
  startDate: Date,
  endDate: Date,
) => {
  const transactions = [];
  const clientName = `${reservation.firstname} ${reservation.lastname}`;
  const clientEmail = reservation.email;
  const clientPhone = reservation.phone;
  const proyectName = reservation.lot.project.name;
  const lotIdentifier = reservation.lot.identifier;
  const reservationNumber = reservation.reservationNumber;
  const downPaymentNumber = reservation.downpaymentNumber;

  const amount =
    reservation.price.toNumber() /
    ((reservation.endDate.getFullYear() - reservation.startDate.getFullYear()) *
      12);

  // get first normal payday
  const firstNormalPaydayDate = new Date(
    reservation.startDate.getFullYear(),
    reservation.startDate.getMonth(),
    reservation.payday,
  );
  if (reservationNumber) {
    firstNormalPaydayDate.setMonth(
      firstNormalPaydayDate.getMonth() + reservationNumber,
    );
  }
  if (downPaymentNumber) {
    firstNormalPaydayDate.setMonth(
      firstNormalPaydayDate.getMonth() + downPaymentNumber,
    );
  }
  if (!reservationNumber && !downPaymentNumber) {
    firstNormalPaydayDate.setMonth(firstNormalPaydayDate.getMonth() + 1);
  }
  // add one payday per month between start and end
  for (
    let d = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
    d <= new Date(endDate.getFullYear(), endDate.getMonth() + 1, 1);
    d.setMonth(d.getMonth() + 1)
  ) {
    const payday = reservation.payday;
    const paydayDate = new Date(d.getFullYear(), d.getMonth(), payday);

    if (
      paydayDate >= firstNormalPaydayDate &&
      paydayDate > d &&
      paydayDate <= endDate &&
      paydayDate >= startDate &&
      paydayDate <= reservation.endDate
    ) {
      transactions.push({
        clientName,
        clientEmail,
        clientPhone,
        proyectName,
        lotIdentifier,
        payDate: paydayDate,
        amount,
      });
    }
  }

  return transactions;
};

const getTransactions = (
  reservations: fullReservation[],
  startDate: Date,
  endDate: Date,
) => {
  const transactions: {
    clientName: string;
    clientEmail: string | null;
    clientPhone: string;
    proyectName: string;
    lotIdentifier: string;
    payDate: Date;
    amount: number;
  }[] = [];
  reservations.forEach((reservation) => {
    transactions.push(
      ...getReservationTransactions(reservation, startDate, endDate),
      ...getDownPaymentTransactions(reservation, startDate, endDate),
      ...getNormalTransactions(reservation, startDate, endDate),
    );
  });
  return transactions.sort((a, b) => a.payDate.getDate() - b.payDate.getDate());
};

export const reservationRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        startDate: z.date(),
        endDate: z.date(),
        birthdate: z.date(),
        firstname: z.string().max(200),
        secondname: z.string().max(200),
        extraname: z.string().max(200).optional(),
        lastname: z.string().max(200),
        secondlastname: z.string().max(200),
        surname: z.string().max(200).optional(),
        profession: z.string().max(200),
        address: z.string().max(500),
        dpi: z.number(),
        citizenship: z.string().max(200),
        civilStatus: z.string().max(200),
        nit: z.number(),
        email: z.string().email().optional(),
        phone: z.number(),
        workaddress: z.string().max(200),
        workphone: z.number(),
        downpaymentNumber: z.number().optional(),
        downPaymentQuota: z.number().optional(),
        downpaymentComments: z.string().max(1000).optional(),
        downpaymentDate: z.date(),
        reservationPrice: z.number(),
        reservationNumber: z.number().optional(),
        reservationQuota: z.number().optional(),
        reservationComments: z.string().max(1000).optional(),
        interest: z.number(),
        payday: z.number(),
        comments: z.string().max(1000).optional(),
        frontDpiUrl: z.string(),
        backDpiUrl: z.string(),
        clientImageUrl: z.string(),
        signatureUrl: z.string(),
        lotId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;
      const {
        startDate,
        endDate,
        birthdate,
        firstname,
        secondname,
        extraname,
        lastname,
        secondlastname,
        surname,
        profession,
        address,
        dpi,
        citizenship,
        civilStatus,
        nit,
        email,
        phone,
        workaddress,
        workphone,
        downpaymentNumber,
        downPaymentQuota,
        downpaymentComments,
        downpaymentDate,
        reservationPrice,
        reservationNumber,
        reservationQuota,
        reservationComments,
        interest,
        payday,
        comments,
        lotId,
        frontDpiUrl,
        backDpiUrl,
        clientImageUrl,
        signatureUrl,
      } = input;

      const lot = await ctx.db.lot.findFirst({
        take: 1,
        where: { lotId: lotId },
      });

      if (!lot) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Lote no encontrado",
        });
      }
      if (!lot.availability) {
        throw new TRPCError({ code: "CONFLICT", message: "Lote ya reservado" });
      }

      const reservation = await ctx.db.reservation.create({
        data: {
          userId,
          startDate,
          endDate,
          birthdate,
          firstname,
          secondname,
          extraname,
          lastname,
          secondlastname,
          surname,
          profession,
          address,
          dpi,
          citizenship,
          civilStatus,
          nit,
          email,
          phone,
          workaddress,
          workphone,
          price: lot.price,
          downpaymentPrice: lot.downPayment,
          downpaymentNumber,
          downPaymentQuota,
          downpaymentComments,
          downpaymentDate,
          reservationPrice,
          reservationNumber,
          reservationQuota,
          reservationComments,
          interest,
          payday,
          comments,
          capital: 0,
          totalPaid: 0,
          lotId: lotId,
          frontDpiUrl,
          backDpiUrl,
          clientImageUrl,
          signatureUrl,
        },
      });
      await ctx.db.lot.update({
        where: {
          lotId: lot.lotId,
        },
        data: {
          availability: false,
        },
      });

      return reservation;
    }),

  getAll: publicProcedure
    .input(
      z.object({
        status: z.number().optional(),
        projectId: z.number().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { projectId, status } = input;

      const reservations = await ctx.db.reservation.findMany({
        take: 100,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          lot: {},
          user: {},
        },
        where: {
          lot: {
            projectId,
          },
          status,
        },
      });

      return reservations;
    }),

  get: publicProcedure
    .input(
      z.object({
        id: z.number().optional(),
        identifier: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const reservation = await ctx.db.reservation.findFirst({
        where: {
          id: input.id,
          lot: {
            identifier: input.identifier,
          },
        },
        include: {
          lot: {},
          user: {},
        },
      });

      return reservation;
    }),

  getCount: protectedProcedure
    .input(
      z
        .object({
          limit: z.number().min(1).max(100).nullish(),
          status: z.number().optional(),
          search: z.string().optional(),
        })
        .optional(),
    )
    .query(async ({ ctx, input }) => {
      const limit = input?.limit ?? 50;
      let where = {};
      if (input?.status) {
        where = {
          status: input.status,
        };
      }
      if (input?.search) {
        where = {
          ...where,
          OR: [
            {
              firstname: {
                contains: input.search,
              },
            },
            {
              lastname: {
                contains: input.search,
              },
            },
            {
              email: {
                contains: input.search,
              },
            },
            {
              dpi: {
                contains: input.search,
              },
            },
            {
              phone: {
                contains: input.search,
              },
            },
            {
              lot: {
                identifier: {
                  contains: input.search,
                },
              },
            },
          ],
        };
      }
      const reservations = await ctx.db.reservation.count({
        where,
      });

      return {
        count: reservations,
        pagesCount: Math.ceil(reservations / limit),
      };
    }),

  getInfinite: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.number().nullish(), // <-- "cursor" needs to exist, but can be any type
        status: z.number().optional(),
        search: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 50;
      const { cursor } = input;
      let where = {};
      if (input.status) {
        where = {
          status: input.status,
        };
      }
      if (input.search) {
        where = {
          ...where,
          OR: [
            {
              firstname: {
                contains: input.search,
              },
            },
            {
              lastname: {
                contains: input.search,
              },
            },
            {
              email: {
                contains: input.search,
              },
            },
            {
              dpi: {
                contains: input.search,
              },
            },
            {
              phone: {
                contains: input.search,
              },
            },
            {
              lot: {
                identifier: {
                  contains: input.search,
                },
              },
            },
          ],
        };
      }
      const totalItemsCount = await ctx.db.reservation.count({
        where,
      });
      const reservations = await ctx.db.reservation.findMany({
        take: limit + 1, // get an extra item at the end which we'll use as next cursor
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          lot: {},
          user: {},
        },
        where,
      });
      let nextCursor: typeof cursor | undefined = undefined;
      if (reservations.length > limit) {
        const nextItem = reservations.pop();
        nextCursor = nextItem!.id;
      }
      return {
        reservations,
        nextCursor,
        totalItemsCount,
      };
    }),

  getDataTable: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        skip: z.number().min(0).nullish(),
        cursor: z.number().nullish(), // <-- "cursor" needs to exist, but can be any type
        status: z.number().optional(),
        search: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 50;
      const skip = input.skip ?? 0;
      const { cursor } = input;
      let where = {};
      if (input.status) {
        where = {
          status: input.status,
        };
      }
      if (input.search) {
        where = {
          ...where,
          OR: [
            {
              firstname: {
                contains: input.search,
              },
            },
            {
              lastname: {
                contains: input.search,
              },
            },
            {
              email: {
                contains: input.search,
              },
            },
            {
              dpi: {
                contains: input.search,
              },
            },
            {
              phone: {
                contains: input.search,
              },
            },
            {
              lot: {
                identifier: {
                  contains: input.search,
                },
              },
            },
          ],
        };
      }
      const totalItemsCount = await ctx.db.reservation.count({
        where,
      });
      const reservations = await ctx.db.reservation.findMany({
        take: limit,
        skip,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          lot: {},
          user: {},
        },
        where,
      });
      return {
        reservations,
        totalItemsCount,
      };
    }),

  updateStatus: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        status: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, status } = input;
      const reservation = await ctx.db.reservation.findFirst({
        where: {
          id,
        },
      });
      if (!reservation) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Reservación no encontrada",
        });
      }
      await ctx.db.reservation.update({
        where: {
          id,
        },
        data: {
          status,
        },
      });
      await ctx.db.lot.update({
        where: {
          lotId: reservation.lotId,
        },
        data: {
          availability: status === 2 ? false : true,
        },
      });
      return true;
    }),

  countStatus: protectedProcedure.query(async ({ ctx }) => {
    const statuss = await ctx.db.reservation.groupBy({
      by: ["status"],
      _count: {
        status: true,
      },
    });
    statuss.push({
      status: 0,
      _count: {
        status: statuss.reduce((acc, status) => acc + status._count.status, 0),
      },
    });
    return statuss.map((status) => ({
      status: status.status,
      count: status._count.status,
    }));
  }),
});
