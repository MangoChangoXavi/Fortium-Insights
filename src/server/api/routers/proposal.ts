import { customAlphabet } from "nanoid";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  7,
);

export const proposalRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        title: z.string(),
        client: z.string(),
        services: z.array(
          z.object({
            title: z.string(),
            description: z.string(),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const proposal = await ctx.db.proposal.create({
        data: {
          id: nanoid(),
          title: input.title,
          client: input.client,
          proposalServices: {
            create: input.services,
          },
        },
      });

      return proposal;
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
          status: input.status,
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
      const proposals = await ctx.db.proposal.count({
        where,
      });

      return {
        count: proposals,
        pagesCount: Math.ceil(proposals / limit),
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
      const proposals = await ctx.db.proposal.findMany({
        take: limit + 1, // get an extra item at the end which we'll use as next cursor
        cursor: cursor ? { id: cursor } : undefined,
        where,
      });

      const proposalsCount = await ctx.db.proposal.count({ where });

      let nextCursor: typeof cursor | undefined = undefined;
      if (proposals.length > limit) {
        const nextItem = proposals.pop();
        nextCursor = nextItem!.id;
      }
      return {
        proposals,
        nextCursor,
        pagesCount: Math.ceil(proposalsCount / limit),
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
      const proposals = await ctx.db.proposal.findMany({
        where,
      });

      return proposals;
    }),

  read: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const proposal = await ctx.db.proposal.findUnique({
        where: {
          id: input.id,
        },
      });

      return proposal;
    }),

  delete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const proposal = await ctx.db.proposal.delete({
        where: {
          id: input.id,
        },
      });

      return proposal;
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        links: z.string().optional(),
        intro: z.string().optional(),
        services: z.string().optional(),
        problems: z.string().optional(),
        success: z.string().optional(),
        budget: z.string().optional(),
        status: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const proposal = await ctx.db.proposal.update({
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
          status: input.status,
        },
      });

      return proposal;
    }),

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
      const totalItemsCount = await ctx.db.user.count({
        where,
      });
      const proposals = await ctx.db.proposal.findMany({
        take: limit,
        skip,
        orderBy: {
          createdAt: "desc",
        },
        where,
      });
      return {
        proposals,
        totalItemsCount,
      };
    }),

  countStatus: protectedProcedure.query(async ({ ctx }) => {
    const statuss = await ctx.db.proposal.groupBy({
      by: ["status"],
      _count: {
        status: true,
      },
    });
    statuss.push({
      status: "all",
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
