import { type Lot } from "@prisma/client";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { addConditionToWhere } from "~/utils/functions";

export const lotRouter = createTRPCRouter({
  // This route include pagination
  getAll: publicProcedure
    .input(
      z.object({
        project: z.number().optional(),
        minimumArea: z.number().optional(),
        maximumArea: z.number().optional(),
        minimumPrice: z.number().optional(),
        maximumPrice: z.number().optional(),
        availability: z.boolean().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      let where = {};

      if (input.project) {
        where = addConditionToWhere(where, "projectId", input.project);
      }

      if (input.minimumArea) {
        where = addConditionToWhere(where, "totalArea", {
          gte: input.minimumArea,
        });
      }

      if (input.maximumArea) {
        where = addConditionToWhere(where, "totalArea", {
          lte: input.maximumArea,
        });
      }

      if (input.minimumPrice) {
        where = addConditionToWhere(where, "price", {
          gte: input.minimumPrice,
        });
      }

      if (input.maximumPrice) {
        where = addConditionToWhere(where, "price", {
          lte: input.maximumPrice,
        });
      }

      if (input.availability) {
        where = addConditionToWhere(where, "availability", input.availability);
      }

      const lots = await ctx.db.lot.findMany({
        include: {
          reservations: true,
        },
        where,
      });

      return lots;
    }),

  getLot: publicProcedure
    .input(
      z.object({
        id: z.number().optional(),
        identifier: z.string().optional(),
        projectId: z.number().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { id, identifier, projectId } = input;
      let where = {};

      if (id) {
        where = addConditionToWhere(where, "lotId", id);
      }
      if (identifier) {
        where = addConditionToWhere(where, "identifier", identifier);
      }
      if (projectId) {
        where = addConditionToWhere(where, "projectId", projectId);
      }

      const lot = await ctx.db.lot.findFirst({
        where,
        include: {
          reservations: true,
        },
      });

      return lot;
    }),

  createLot: protectedProcedure
    .input(
      z.object({
        projectId: z.number(),
        identifier: z.string(),
        price: z.number(),
        downPayment: z.number(),
        measures: z.string(),
        totalArea: z.number(),
        estateNumber: z.number(),
        folioNumber: z.number(),
        bookNumber: z.number(),
        location: z.string(),
        boundaries: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const {
        projectId,
        identifier,
        price,
        downPayment,
        measures,
        totalArea,
        estateNumber,
        folioNumber,
        bookNumber,
        location,
        boundaries,
      } = input;
      const lot = await ctx.db.lot.create({
        data: {
          projectId,
          identifier,
          price,
          downPayment,
          boundaries,
          measures,
          totalArea,
          estateNumber,
          folioNumber,
          bookNumber,
          location,
        },
      });
      return lot;
    }),

  infiniteLots: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.number().nullish(), // <-- "cursor" needs to exist, but can be any type
        availability: z.boolean().optional(),
        project: z.number().optional(),
        minimumArea: z.number().optional(),
        maximumArea: z.number().optional(),
        minimumPrice: z.number().optional(),
        maximumPrice: z.number().optional(),
        projects: z.array(z.number()).optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 50;
      const {
        cursor,
        project,
        projects,
        availability,
        minimumArea,
        maximumArea,
        minimumPrice,
        maximumPrice,
      } = input;

      interface WhereType {
        availability?: boolean; // Adjust the type according to your actual data type
        totalArea?: {
          gte?: number;
          lte?: number;
        };
        price?: {
          gte?: number;
          lte?: number;
        };
        projectId?: {
          in?: number[]; // Adjust the type according to your actual data type
          equals?: number; // Adjust the type according to your actual data type
        };
      }

      let where: WhereType = {
        availability,
      };

      if (minimumArea) {
        where = {
          ...where,
          totalArea: {
            gte: minimumArea,
          },
        };
      }

      if (maximumArea) {
        where = {
          ...where,
          totalArea: {
            lte: maximumArea,
          },
        };
      }

      if (minimumPrice) {
        where = {
          ...where,
          price: {
            gte: minimumPrice,
          },
        };
      }

      if (maximumPrice) {
        where = {
          ...where,
          price: {
            lte: maximumPrice,
          },
        };
      }

      if (projects) {
        where = {
          ...where,
          projectId: {
            in: input.projects,
          },
        };
      }

      if (project) {
        where = {
          ...where,
          projectId: {
            equals: project,
          },
        };
      }

      const items = await ctx.db.lot.findMany({
        take: limit + 1, // get an extra item at the end which we'll use as next cursor
        cursor: cursor ? { lotId: cursor } : undefined,
        orderBy: {
          lotId: "asc",
        },
        where,
      });

      let nextCursor: typeof cursor | undefined = undefined;
      if (items.length > limit) {
        const nextItem = items.pop();
        nextCursor = nextItem!.lotId;
      }
      return {
        items,
        nextCursor,
      };
    }),

  countLots: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        project: z.number().optional(),
        projects: z.array(z.number()).optional(),
        availability: z.boolean().optional(),
        minimumArea: z.number().optional(),
        maximumArea: z.number().optional(),
        minimumPrice: z.number().optional(),
        maximumPrice: z.number().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 50;
      const {
        project,
        projects,
        availability,
        minimumArea,
        maximumArea,
        minimumPrice,
        maximumPrice,
      } = input;
      let count = 0;

      let where = {};

      if (projects) {
        where = {
          availability,
          projectId: {
            in: input.projects,
          },
          totalArea: {
            gte: minimumArea,
            lte: maximumArea,
          },
          price: {
            gte: minimumPrice,
            lte: maximumPrice,
          },
        };
      }

      if (project) {
        where = {
          availability,
          projectId: project,
          totalArea: {
            gte: minimumArea,
            lte: maximumArea,
          },
          price: {
            gte: minimumPrice,
            lte: maximumPrice,
          },
        };
      }
      count = await ctx.db.lot.count({
        where,
      });
      return {
        count,
        pages: Math.ceil(count / limit),
      };
    }),

  deleteLot: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const { id } = input;

      const lot = await ctx.db.lot.delete({
        where: { lotId: id },
      });

      return lot;
    }),
});
