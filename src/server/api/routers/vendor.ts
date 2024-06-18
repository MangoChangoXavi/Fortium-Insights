import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

// model Vendor {
//   id              String   @id @default(cuid())
//   name            String
//   description     String
//   createdAt       DateTime @default(now()) @map("created_at")
//   updatedAt       DateTime @default(now()) @updatedAt @map("updated_at")
//   category        Category @relation(fields: [categoryId], references: [id])
//   categoryId      String
// }

export const vendorRouter = createTRPCRouter({
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
      if (input.search) {
        where = {
          ...where,
          OR: [
            {
              name: {
                contains: input.search,
              },
            },
            {
              description: {
                contains: input.search,
              },
            },
          ],
        };
      }
      const totalItemsCount = await ctx.db.vendor.count({
        where,
      });
      const vendors = await ctx.db.vendor.findMany({
        take: limit,
        skip,
        orderBy: {
          createdAt: "desc",
        },
        where,
      });
      return {
        vendors,
        totalItemsCount,
      };
    }),

  getAll: protectedProcedure
    .input(
      z.object({
        categoryId: z.string().optional(),
        rating: z.number().optional(),
        search: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      let where = {};
      if (input.categoryId) {
        where = {
          categoryId: input.categoryId,
        };
      }
      if (input.rating) {
        where = {
          ...where,
          rating: {
            gte: input.rating,
          },
        };
      }
      if (input.search) {
        where = {
          ...where,
          OR: [
            {
              name: {
                contains: input.search,
                mode: "insensitive", // Default value: default
              },
            },
            {
              description: {
                contains: input.search,
                mode: "insensitive", // Default value: default
              },
            },
          ],
        };
      }
      return await ctx.db.vendor.findMany({
        include: {
          category: true,
        },
        where,
      });
    }),

  getRatingCounts: protectedProcedure.query(async ({ ctx }) => {
    const vendors = await ctx.db.vendor.findMany({
      select: {
        rating: true,
      },
    });
    const rankingCounts = vendors.reduce(
      (acc, curr) => {
        if (curr.rating === 1) {
          acc.oneStar++;
        } else if (curr.rating === 2) {
          acc.twoStars++;
        } else if (curr.rating === 3) {
          acc.threeStars++;
        } else if (curr.rating === 4) {
          acc.fourStars++;
        } else if (curr.rating === 5) {
          acc.fiveStars++;
        }
        return acc;
      },
      {
        oneStar: 0,
        twoStars: 0,
        threeStars: 0,
        fourStars: 0,
        fiveStars: 0,
      },
    );
    return rankingCounts;
  }),

  createWithCategory: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        category: z.string(),
        vendorImgUrl: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.category.create({
        data: {
          name: input.category,
          vendors: {
            create: {
              name: input.name,
              description: input.description,
              vendorImgUrl: input.vendorImgUrl,
            },
          },
        },
      });
    }),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        categoryId: z.string(),
        vendorImgUrl: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.vendor.create({
        data: {
          name: input.name,
          description: input.description,
          categoryId: input.categoryId,
          vendorImgUrl: input.vendorImgUrl,
        },
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        description: z.string(),
        categoryId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.vendor.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          description: input.description,
          categoryId: input.categoryId,
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.vendor.delete({
        where: {
          id: input.id,
        },
      });
    }),

  get: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.vendor.findUnique({
        where: {
          id: input.id,
        },
        include: {
          category: true,
          reviews: {
            include: {
              user: {
                include: {
                  _count: {
                    select: {
                      reviews: true,
                    },
                  },
                },
              },
            },
          },
        },
      });
    }),
});
