import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

// model Category {
//   id        String   @id @default(cuid())
//   name      String
//   createdAt DateTime @default(now()) @map("created_at")
//   updatedAt DateTime @default(now()) @updatedAt @map("updated_at")
//   vendors   Vendor[]
// }

export const categoryRouter = createTRPCRouter({
  getDataTable: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        skip: z.number().min(0).nullish(),
        status: z.string().optional(),
        search: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 50;
      const skip = input.skip ?? 0;
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
              name: {
                contains: input.search,
              },
            },
          ],
        };
      }
      const totalItemsCount = await ctx.db.category.count({
        where,
      });
      const categories = await ctx.db.category.findMany({
        take: limit,
        skip,
        orderBy: {
          createdAt: "desc",
        },
        // number of vendors count
        include: {
          _count: {
            select: {
              vendors: true,
            },
          },
        },
        where,
      });
      return {
        categories,
        totalItemsCount,
      };
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.category.findMany({
      include: {
        _count: {
          select: {
            vendors: true,
          },
        },
      },
      where: {
        // the status is active and at least one vendor is active
        status: "active",
      },
    });
  }),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.category.create({
        data: {
          name: input.name,
        },
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.category.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.category.delete({
        where: {
          id: input.id,
        },
      });
    }),

  get: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.category.findUnique({
        where: {
          id: input.id,
        },
      });
    }),

  updateStatus: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        status: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.category.update({
        where: {
          id: input.id,
        },
        data: {
          status: input.status,
        },
      });
    }),

  getInfinite: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(), // <-- "cursor" needs to exist, but can be any type
        status: z.string().optional(),
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
              name: {
                contains: input.search,
              },
            },
          ],
        };
      }
      const categories = await ctx.db.category.findMany({
        take: limit + 1, // get an extra item at the end which we'll use as next cursor
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          createdAt: "desc",
        },
        where,
      });
      let nextCursor: typeof cursor | undefined = undefined;
      if (categories.length > limit) {
        const nextItem = categories.pop();
        nextCursor = nextItem!.id;
      }
      return {
        categories,
        nextCursor,
      };
    }),

  countStatus: protectedProcedure.query(async ({ ctx }) => {
    const status = await ctx.db.category.groupBy({
      by: ["status"],
      _count: {
        status: true,
      },
    });
    status.push({
      status: "all",
      _count: {
        status: status.reduce((acc, status) => acc + status._count.status, 0),
      },
    });
    return status.map((status) => ({
      status: status.status,
      count: status._count.status,
    }));
  }),
});
