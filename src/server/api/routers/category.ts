import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const CategoryRouter = createTRPCRouter({
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
});
