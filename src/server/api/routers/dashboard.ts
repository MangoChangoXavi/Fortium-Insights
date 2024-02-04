import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { projects } from "~/data/json/projects";
import { z } from "zod";
import { type PrismaClient, type Prisma } from "@prisma/client";
import { type DefaultArgs } from "@prisma/client/runtime/library";

interface ComplementaryFunctionsI {
  ctx: {
    userId: string;
    db: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;
  };
  startDate?: Date;
  endDate?: Date;
}

const getSellsBetweenDates = async ({
  ctx,
  startDate,
  endDate,
}: ComplementaryFunctionsI) => {
  return await ctx.db.reservation.findMany({
    take: 100,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      lot: {
        select: {
          identifier: true,
        },
      },
      user: {
        select: {
          name: true,
        },
      },
    },
    where: {
      updatedAt: {
        gt: startDate,
        lt: endDate,
      },
      status: 2,
    },
  });
};

const getConversionRate = async ({
  ctx,
  startDate,
  endDate,
}: ComplementaryFunctionsI) => {
  // created reservations / selled lots
  const createdReservations = await ctx.db.reservation.count({
    where: {
      updatedAt: {
        gt: startDate,
        lt: endDate,
      },
    },
  });
  const selledlots = await ctx.db.reservation.count({
    where: {
      status: 2,
      updatedAt: {
        gt: startDate,
        lt: endDate,
      },
    },
  });
  return selledlots / createdReservations;
};

const getAverageSell = async ({
  ctx,
  startDate,
  endDate,
}: ComplementaryFunctionsI) => {
  const sells = await ctx.db.reservation.findMany({
    where: {
      status: 2,
      updatedAt: {
        gt: startDate,
        lt: endDate,
      },
    },
  });
  const sumPrice = sells.reduce((acc, reservation) => {
    return acc + reservation.price.toNumber();
  }, 0);
  const sellsNumber = sells.length;

  return sumPrice / sellsNumber;
};

const getAverageSellTime = async ({
  ctx,
  startDate,
  endDate,
}: ComplementaryFunctionsI) => {
  const sells = await ctx.db.reservation.findMany({
    where: {
      status: 2,
      updatedAt: {
        gt: startDate,
        lt: endDate,
      },
    },
  });
  const sumTime = sells.reduce((acc, reservation) => {
    return (
      acc + (reservation.updatedAt.getDate() - reservation.createdAt.getDate())
    );
  }, 0);
  const sellsNumber = sells.length;

  const avgDays = sumTime / sellsNumber;

  // Calculate days and hours
  const days = Math.floor(avgDays);
  const hours = Math.round((avgDays - days) * 24);

  // Create a string representation
  return `${days} days ${hours} hours`;
};

export const dashboardRouter = createTRPCRouter({
  getProjectTableStats: protectedProcedure.query(async ({ ctx }) => {
    const getLots = async (projectId: number, status?: number) => {
      const lots = await ctx.db.lot.findMany({
        where: {
          projectId,
          reservations: {
            some: {
              status,
            },
          },
        },
        include: {
          reservations: {
            where: {
              status,
            },
          },
        },
      });
      return lots;
    };

    const totalSells = await Promise.all(
      projects.map(async (project) => {
        const lots = await getLots(project.id, 2);
        return lots.reduce((acc, lot) => {
          return (
            acc +
            lot.reservations.reduce((acc, reservation) => {
              return acc + reservation.price.toNumber();
            }, 0)
          );
        }, 0);
      }),
    );

    const totalReservations = await Promise.all(
      projects.map(async (project) => {
        const lots = await getLots(project.id);
        return lots.reduce((acc, lot) => {
          return acc + lot.reservations.length;
        }, 0);
      }),
    );

    const totalSelledLots = await Promise.all(
      projects.map(async (project) => {
        const lots = await getLots(project.id, 2);
        return lots.length;
      }),
    );

    return {
      totalSells: totalSells.reduce((acc, total) => acc + total, 0),
      totalReservations: totalReservations.reduce(
        (acc, total) => acc + total,
        0,
      ),
      totalSelledLots: totalSelledLots.reduce((acc, total) => acc + total, 0),
    };
  }),

  getProjectTableData: protectedProcedure.query(async ({ ctx }) => {
    const getLots = async (projectId: number, status?: number) => {
      const lots = await ctx.db.lot.findMany({
        where: {
          projectId,
          reservations: {
            some: {
              status,
            },
          },
        },
        include: {
          reservations: {
            where: {
              status,
            },
          },
        },
      });
      return lots;
    };

    return await Promise.all(
      projects.map(async (project) => {
        const lots = await getLots(project.id, 2);
        const totalRegistered = (await getLots(project.id)).length;

        const totalSelled = lots.length;

        const projectName = project.name;

        const totalSells = lots.reduce((acc, lot) => {
          return (
            acc +
            lot.reservations.reduce((acc, reservation) => {
              return acc + reservation.price.toNumber();
            }, 0)
          );
        }, 0);

        const totalReserved = lots.reduce((acc, lot) => {
          return acc + lot.reservations.length;
        }, 0);

        const totalAvailable = lots.filter(
          (lot) => lot.reservations.length === 0,
        ).length;

        const progress = (totalReserved / totalRegistered) * 100;

        return {
          // name
          projectName,
          // total sells
          totalSells,
          // registered
          totalRegistered,
          // total selled lots
          totalSelled,
          // total reserved lots
          totalReserved,
          // total available lots
          totalAvailable,
          // progress
          progress,
        };
      }),
    );
  }),

  getDataTable: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        skip: z.number().min(0).nullish(),
        cursor: z.number().nullish(), // <-- "cursor" needs to exist, but can be any type
      }),
    )
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 50;
      const skip = input.skip ?? 0;

      const getLots = async (projectId: number, status?: number) => {
        const lots = await ctx.db.lot.findMany({
          take: limit,
          skip,
          where: {
            projectId,
            reservations: {
              some: {
                status,
              },
            },
          },
          include: {
            reservations: {
              where: {
                status,
              },
            },
          },
        });
        return lots;
      };

      return await Promise.all(
        projects.map(async (project) => {
          const lots = await getLots(project.id, 2);
          const totalRegistered = (await getLots(project.id)).length;

          const totalSelled = lots.length;

          const projectName = project.name;

          const totalSells = lots.reduce((acc, lot) => {
            return (
              acc +
              lot.reservations.reduce((acc, reservation) => {
                return acc + reservation.price.toNumber();
              }, 0)
            );
          }, 0);

          const totalReserved = lots.reduce((acc, lot) => {
            return acc + lot.reservations.length;
          }, 0);

          const totalAvailable = lots.filter(
            (lot) => lot.reservations.length === 0,
          ).length;

          const progress = (totalReserved / totalRegistered) * 100;

          return {
            // name
            projectName,
            // total sells
            totalSells,
            // registered
            totalRegistered,
            // total selled lots
            totalSelled,
            // total reserved lots
            totalReserved,
            // total available lots
            totalAvailable,
            // progress
            progress,
          };
        }),
      );
    }),

  getTotalSellsThisMonthStat: protectedProcedure
    .input(
      z.object({
        startDate: z.date(),
        endDate: z.date(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { startDate, endDate } = input;
      const sellsThisMonth = await getSellsBetweenDates({
        ctx,
        startDate,
        endDate,
      });
      const sellsLastMonth = await getSellsBetweenDates({
        ctx,
        startDate: new Date(
          startDate.getFullYear(),
          startDate.getMonth() - 1,
          1,
        ),
        endDate: new Date(
          input.endDate.getFullYear(),
          input.endDate.getMonth(),
          1,
        ),
      });

      const totalSellsThisMonth = sellsThisMonth.reduce((acc, reservation) => {
        return acc + reservation.price.toNumber();
      }, 0);

      const totalSellsLastMonth = sellsLastMonth.reduce((acc, reservation) => {
        return acc + reservation.price.toNumber();
      }, 0);

      if (totalSellsThisMonth === 0 && totalSellsLastMonth === 0) {
        return {
          totalSellsThisMonth,
          differencePercentage: 0,
          down: false,
        };
      }

      if (totalSellsThisMonth === 0) {
        return {
          totalSellsThisMonth,
          differencePercentage: 100,
          down: true,
        };
      }

      if (totalSellsLastMonth === 0) {
        return {
          totalSellsThisMonth,
          differencePercentage: 100,
          down: false,
        };
      }

      return {
        totalSellsThisMonth,
        differencePercentage:
          totalSellsThisMonth > totalSellsLastMonth
            ? ((totalSellsThisMonth - totalSellsLastMonth) /
                totalSellsLastMonth) *
              100
            : ((totalSellsLastMonth - totalSellsThisMonth) /
                totalSellsLastMonth) *
              100,
        down: totalSellsThisMonth < totalSellsLastMonth,
      };
    }),

  getTopSellers: protectedProcedure
    .input(
      z.object({
        startDate: z.date(),
        endDate: z.date(),
      }),
    )
    .query(async ({ ctx, input }) => {
      // I need to get the top 5 sellers
      // including name, email, image and total sales prices
      const users = await ctx.db.user.findMany({
        take: 100,
        include: {
          reservations: {
            where: {
              updatedAt: {
                gt: input.startDate,
                lt: input.endDate,
              },
              status: 2,
            },
          },
        },
      });

      return users
        .map((user) => {
          const totalPrices = user.reservations.reduce((acc, reservation) => {
            return acc + reservation.price.toNumber();
          }, 0);

          return {
            userId: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            totalPrices,
          };
        })
        .sort((a, b) => b.totalPrices - a.totalPrices)
        .slice(0, 5);
    }),

  getStatisticsStats: protectedProcedure.query(async ({ ctx }) => {
    const conversionRate = await getConversionRate({ ctx });
    const averageSell = await getAverageSell({ ctx });
    const averageSellTime = await getAverageSellTime({ ctx });

    return {
      conversionRate,
      averageSell,
      averageSellTime,
    };
  }),

  getStatisticsGraph: protectedProcedure.query(async ({ ctx }) => {
    const months = [];
    const date = new Date();

    // 6 months
    const numberOfMonths = 6;
    for (let i = 0; i < numberOfMonths; i++) {
      months.unshift(new Date(date.getTime()));
      date.setMonth(date.getMonth() - 1);
    }

    console.log(months);

    const totalSells = await Promise.all(
      months.map(async (month) => {
        // First day of the month
        const firstDay = new Date(month.getFullYear(), month.getMonth(), 1);

        // Last day of the month
        const lastDay = new Date(month.getFullYear(), month.getMonth() + 1, 0);

        return ctx.db.reservation.count({
          where: {
            status: 2,
            createdAt: {
              gt: firstDay,
              lt: lastDay,
            },
          },
        });
      }),
    );

    const totalReservations = await Promise.all(
      months.map(async (month) => {
        // First day of the month
        const firstDay = new Date(month.getFullYear(), month.getMonth(), 1);

        // Last day of the month
        const lastDay = new Date(month.getFullYear(), month.getMonth() + 1, 0);

        return ctx.db.reservation.count({
          where: {
            createdAt: {
              gt: firstDay,
              lt: lastDay,
            },
          },
        });
      }),
    );

    const labels = months.map((m) =>
      m.toLocaleString("default", { month: "short" }),
    );
    const datasets = [
      {
        label: "Ventas",
        data: totalSells,
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
      {
        label: "Reservas",
        data: totalReservations,
        fill: false,
        borderColor: "#742774",
      },
    ];

    return {
      labels,
      datasets,
    };
  }),
});
