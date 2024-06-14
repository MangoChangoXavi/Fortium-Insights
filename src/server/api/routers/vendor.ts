import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getCount: protectedProcedure
    .input(
      z
        .object({
          limit: z.number().min(1).max(100).nullish(),
          role: z.string().optional(),
          search: z.string().optional(),
        })
        .optional(),
    )
    .query(async ({ ctx, input }) => {
      const limit = input?.limit ?? 50;
      let where = {};
      if (input?.role) {
        where = {
          role: input.role,
        };
      }
      if (input?.search) {
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
      const users = await ctx.db.user.count({
        where,
      });

      return {
        count: users,
        pagesCount: Math.ceil(users / limit),
      };
    }),

  getInfinite: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(), // <-- "cursor" needs to exist, but can be any type
        role: z.string().optional(),
        search: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 50;
      const { cursor } = input;
      let where = {};
      if (input.role) {
        where = {
          role: input.role,
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
      const users = await ctx.db.user.findMany({
        take: limit + 1, // get an extra item at the end which we'll use as next cursor
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          createdAt: "desc",
        },
        where,
      });
      let nextCursor: typeof cursor | undefined = undefined;
      if (users.length > limit) {
        const nextItem = users.pop();
        nextCursor = nextItem!.id;
      }
      return {
        users,
        nextCursor,
      };
    }),

  getDataTable: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        skip: z.number().min(0).nullish(),
        role: z.string().optional(),
        search: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 50;
      const skip = input.skip ?? 0;
      let where = {};
      if (input.role) {
        where = {
          role: input.role,
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
      const totalItemsCount = await ctx.db.user.count({
        where,
      });
      const users = await ctx.db.user.findMany({
        take: limit,
        skip,
        orderBy: {
          createdAt: "desc",
        },
        where,
      });
      return {
        users,
        totalItemsCount,
      };
    }),

  updateRole: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        role: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.update({
        where: {
          id: input.id,
        },
        data: {
          role: input.role,
        },
      });
      return user;
    }),

  countRoles: protectedProcedure.query(async ({ ctx }) => {
    const roles = await ctx.db.user.groupBy({
      by: ["role"],
      _count: {
        role: true,
      },
    });
    roles.push({
      role: "all",
      _count: {
        role: roles.reduce((acc, role) => acc + role._count.role, 0),
      },
    });
    return roles.map((role) => ({
      role: role.role,
      count: role._count.role,
    }));
  }),
});
