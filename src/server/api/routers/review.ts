import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

// model Review {
//   id        String   @id @default(cuid())
//   rating    Int
//   title     String
//   comment   String
//   createdAt DateTime @default(now()) @map("created_at")
//   updatedAt DateTime @default(now()) @updatedAt @map("updated_at")
//   user      User     @relation(fields: [userId], references: [id])
//   userId    String
//   vendor    Vendor   @relation(fields: [vendorId], references: [id])
//   vendorId  String
// }

export const reviewRouter = createTRPCRouter({
  getDataTable: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        skip: z.number().min(0).nullish(),
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
          ],
        };
      }
      const totalItemsCount = await ctx.db.review.count({
        where,
      });
      const reviews = await ctx.db.review.findMany({
        take: limit,
        skip,
        orderBy: {
          createdAt: "desc",
        },
        where,
      });
      return {
        reviews,
        totalItemsCount,
      };
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.review.findMany({});
  }),

  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        rating: z.number(),
        comment: z.string(),
        vendorId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;
      // updates vendor rating
      const reviews = await ctx.db.review.findMany({
        where: {
          vendorId: input.vendorId,
        },
      });
      const rating = reviews.reduce((acc, review) => acc + review.rating, 0);
      const averageRating = (rating + input.rating) / (reviews.length + 1);
      await ctx.db.vendor.update({
        where: {
          id: input.vendorId,
        },
        data: {
          rating: averageRating,
        },
      });

      // create review
      return await ctx.db.review.create({
        data: {
          title: input.title,
          rating: input.rating,
          comment: input.comment,
          userId,
          vendorId: input.vendorId,
        },
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        rating: z.number(),
        comment: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.review.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
          rating: input.rating,
          comment: input.comment,
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.review.delete({
        where: {
          id: input.id,
        },
      });
    }),

  get: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.review.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
});
