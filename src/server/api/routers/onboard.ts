import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const onboardRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        links: z.string(),
        intro: z.string(),
        services: z.string(),
        problems: z.string(),
        success: z.string(),
        budget: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const onboard = await ctx.db.onboard.create({
        data: {
          links: input.links,
          intro: input.intro,
          services: input.services,
          problems: input.problems,
          success: input.success,
          budget: input.budget,
        },
      });

      return onboard;
    }),

  countInfinite: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        status: z.string().optional(),
        search: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const limit = input?.limit ?? 50;
      let where = {};
      if (input?.status) {
        where = {
          role: input.status,
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
      const onboards = await ctx.db.onboard.count({
        where,
      });

      return {
        count: onboards,
        pagesCount: Math.ceil(onboards / limit),
      };
    }),

  readInfinite: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(), // <-- "cursor" needs to exist, but can be any type
        userId: z.string().optional(),
        mostRecent: z.boolean().optional(),
        status: z.string().optional(),
        search: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 50;
      const { cursor } = input;
      let where = {};
      if (input.userId) {
        where = {
          userId: input.userId,
        };
      }
      if (input.search) {
        where = {
          ...where,
          OR: [
            {
              title: {
                contains: input.search,
              },
            },
            {
              description: {
                contains: input.search,
              },
            },
            {
              skills: {
                contains: input.search,
              },
            },
          ],
        };
      }
      if (input.status) {
        where = {
          ...where,
          status: input.status,
        };
      }
      if (input.mostRecent) {
        where = {
          ...where,
          createdAt: {
            gt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
          },
        };
      }
      const onboards = await ctx.db.onboard.findMany({
        take: limit + 1, // get an extra item at the end which we'll use as next cursor
        cursor: cursor ? { id: cursor } : undefined,
        where,
      });

      const onboardsCount = await ctx.db.onboard.count({ where });

      let nextCursor: typeof cursor | undefined = undefined;
      if (onboards.length > limit) {
        const nextItem = onboards.pop();
        nextCursor = nextItem!.id;
      }
      return {
        onboards,
        nextCursor,
        pagesCount: Math.ceil(onboardsCount / limit),
      };
    }),

  readAll: protectedProcedure
    .input(
      z.object({
        userId: z.string().optional(),
        mostRecent: z.boolean().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      let where = {};
      if (input.userId) {
        where = {
          userId: input.userId,
        };
      }
      if (input.mostRecent) {
        where = {
          ...where,
          createdAt: {
            gt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
          },
        };
      }
      const onboards = await ctx.db.onboard.findMany({
        where,
      });

      return onboards;
    }),

  read: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const onboard = await ctx.db.onboard.findUnique({
        where: {
          id: input.id,
        },
      });

      return onboard;
    }),

  delete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const onboard = await ctx.db.onboard.delete({
        where: {
          id: input.id,
        },
      });

      return onboard;
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        links: z.string(),
        intro: z.string(),
        services: z.string(),
        problems: z.string(),
        success: z.string(),
        budget: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const onboard = await ctx.db.onboard.update({
        where: {
          id: input.id,
        },
        data: {
          links: input.links,
          intro: input.intro,
          services: input.services,
          problems: input.problems,
          success: input.success,
          budget: input.budget,
        },
      });

      return onboard;
    }),
});
