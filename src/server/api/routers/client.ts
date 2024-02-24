import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const clientRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        company: z.string(),
        role: z.string(),
        location: z.string(),
        phone: z.string().optional(),
        linkedIn: z.string().optional(),
        notes: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const client = await ctx.db.client.create({
        data: {
          name: input.name,
          company: input.company,
          role: input.role,
          location: input.location,
          phone: input.phone,
          linkedIn: input.linkedIn,
          notes: input.notes,
        },
      });

      return client;
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
      const clients = await ctx.db.client.count({
        where,
      });

      return {
        count: clients,
        pagesCount: Math.ceil(clients / limit),
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
      const clients = await ctx.db.client.findMany({
        take: limit + 1, // get an extra item at the end which we'll use as next cursor
        cursor: cursor ? { id: cursor } : undefined,
        where,
      });

      const clientsCount = await ctx.db.client.count({ where });

      let nextCursor: typeof cursor | undefined = undefined;
      if (clients.length > limit) {
        const nextItem = clients.pop();
        nextCursor = nextItem!.id;
      }
      return {
        clients,
        nextCursor,
        pagesCount: Math.ceil(clientsCount / limit),
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
      const clients = await ctx.db.client.findMany({
        where,
      });

      return clients;
    }),

  read: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const client = await ctx.db.client.findUnique({
        where: {
          id: input.id,
        },
      });

      return client;
    }),

  delete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const client = await ctx.db.client.delete({
        where: {
          id: input.id,
        },
      });

      return client;
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
      const client = await ctx.db.client.update({
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

      return client;
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
      const totalItemsCount = await ctx.db.client.count({
        where,
      });
      const clients = await ctx.db.client.findMany({
        take: limit,
        skip,
        orderBy: {
          createdAt: "desc",
        },
        where,
      });
      return {
        clients,
        totalItemsCount,
      };
    }),

  countStatus: protectedProcedure.query(async ({ ctx }) => {
    const statuss = await ctx.db.client.groupBy({
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
