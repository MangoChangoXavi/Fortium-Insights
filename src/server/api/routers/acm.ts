import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { getCoordinates } from "~/utils/googleMaps";
import { getScrappedPostFromMongo } from "../mongodb";
export const maxDuration = 200; // This function can run for a maximum of 5 seconds
export const acmRouter = createTRPCRouter({
  getFromModel: publicProcedure
    .input(
      z.object({
        lat: z.number(),
        lng: z.number(),
        buildingType: z.string(),
        operationType: z.string(),
        numberOfRooms: z.number().optional(),
        numberOfBathrooms: z.number().optional(),
        numberOfParkingLots: z.number().optional(),
        totalArea: z.number().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      // fetch prediction from the model
      const response = await fetch(
        "https://wfdues1rme.execute-api.us-east-1.amazonaws.com/main/api/prediction/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            longitude: input.lng,
            latitude: input.lat,
            minNumberOfRooms: input.numberOfRooms,
            maxNumberOfRooms: input.numberOfRooms,
            minNumberOfBathrooms: input.numberOfBathrooms,
            maxNumberOfBathrooms: input.numberOfBathrooms,
            minNumberOfParkingLots: input.numberOfParkingLots,
            maxNumberOfParkingLots: input.numberOfParkingLots,
            minTotalArea: input.totalArea,
            maxTotalArea: input.totalArea,
            buildingType: input.buildingType,
            operationType: input.operationType,
          }),
        },
      );

      const prediction = await response.json();

      return { prediction };
    }),

  create: publicProcedure
    .input(
      z.object({
        address: z.string(),
        buildingType: z.string(),
        operationType: z.string(),
        numberOfRooms: z.number().optional(),
        numberOfBathrooms: z.number().optional(),
        numberOfParkingLots: z.number().optional(),
        totalArea: z.number().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const coordinates = await getCoordinates(input.address);

      if (!coordinates.lat || !coordinates.lng) {
        throw new Error("Invalid address");
      }

      const data = {
        address: input.address,
        buildingType: input.buildingType,
        numberOfRooms: input.numberOfRooms,
        numberOfBathrooms: input.numberOfBathrooms,
        numberOfParkingLots: input.numberOfParkingLots,
        totalArea: input.totalArea,
        lat: coordinates.lat,
        lng: coordinates.lng,
        operationType: input.operationType,
      };

      try {
        return await ctx.db.acm.create({
          data: {
            ...data,
          },
        });
      } catch (e) {
        console.log("ERROR", e);
      }
    }),

  countFilters: protectedProcedure
    .input(
      z.object({
        filter: z.string().optional(),
        search: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const lessThan1Month = await ctx.db.acm.count({
        where: {
          createdAt: {
            gt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
          },
        },
      });
      const lessThan6Months = await ctx.db.acm.count({
        where: {
          createdAt: {
            gt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30 * 6),
            lt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
          },
        },
      });
      const lessThan1Year = await ctx.db.acm.count({
        where: {
          createdAt: {
            gt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30 * 12),
            lt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30 * 6),
          },
        },
      });
      const moreThan1Year = await ctx.db.acm.count({
        where: {
          createdAt: {
            lt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30 * 12),
          },
        },
      });

      return {
        lessThan1Month,
        lessThan6Months,
        lessThan1Year,
        moreThan1Year,
      };
    }),

  get: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const acm = await ctx.db.acm.findUnique({
        where: {
          id: input.id,
        },
      });

      if (!acm) {
        return null;
      }

      const operationTypes = ["sell", "rent"];

      // fetch predictions from the model
      const predictions = await Promise.all(
        operationTypes.map(async (operationType) => {
          const response = await fetch(
            "https://wfdues1rme.execute-api.us-east-1.amazonaws.com/main/api/prediction/",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                longitude: acm.lng,
                latitude: acm.lat,
                minNumberOfRooms: acm.numberOfRooms,
                maxNumberOfRooms: acm.numberOfRooms,
                minNumberOfBathrooms: acm.numberOfBathrooms,
                maxNumberOfBathrooms: acm.numberOfBathrooms,
                minNumberOfParkingLots: acm.numberOfParkingLots,
                maxNumberOfParkingLots: acm.numberOfParkingLots,
                minTotalArea: acm.totalArea,
                maxTotalArea: acm.totalArea,
                buildingType: acm.buildingType,
                operationType,
              }),
            },
          );

          const linearRegression = await response.json();

          return {
            operationType,
            linearRegression,
          };
        }),
      );

      //  get scrapped posts from mongo
      const scrappedPosts = await getScrappedPostFromMongo({
        lat: acm.lat.toNumber(),
        lng: acm.lng.toNumber(),
        radius: 2,
        numberOfRooms: acm.numberOfRooms,
        numberOfBathrooms: acm.numberOfBathrooms,
        numberOfParkingLots: acm.numberOfParkingLots,
        totalArea: acm.totalArea,
        buildingType: acm.buildingType,
      });

      return { ...acm, predictions, scrappedPosts };
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
      const acms = await ctx.db.acm.count({
        where,
      });

      return {
        count: acms,
        pagesCount: Math.ceil(acms / limit),
      };
    }),

  readInfinite: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(), // <-- "cursor" needs to exist, but can be any type
        id: z.string().optional(),
        mostRecent: z.boolean().optional(),
        status: z.string().optional(),
        search: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 50;
      const { cursor } = input;
      let where = {};
      if (input.id) {
        where = {
          id: input.id,
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
      const acms = await ctx.db.acm.findMany({
        take: limit + 1, // get an extra item at the end which we'll use as next cursor
        cursor: cursor ? { id: cursor } : undefined,
        where,
      });

      const acmsCount = await ctx.db.acm.count({ where });

      let nextCursor: typeof cursor | undefined = undefined;
      if (acms.length > limit) {
        const nextItem = acms.pop();
        nextCursor = nextItem!.id;
      }
      return {
        acms,
        nextCursor,
        pagesCount: Math.ceil(acmsCount / limit),
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
      const acms = await ctx.db.acm.findMany({
        where,
      });

      return acms;
    }),

  read: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const acm = await ctx.db.acm.findUnique({
        where: {
          id: input.id,
        },
      });

      return acm;
    }),

  delete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const acm = await ctx.db.acm.delete({
        where: {
          id: input.id,
        },
      });

      return acm;
    }),

  deleteResultDetail: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const acm = await ctx.db.acmResultDetail.delete({
        where: {
          id: input.id,
        },
      });

      return acm;
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        address: z.string(),
        operationType: z.string(),
        buildingType: z.string(),
        numberOfRooms: z.number(),
        numberOfBathrooms: z.number(),
        numberOfParkingLots: z.number(),
        totalArea: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const acm = await ctx.db.acm.update({
        where: {
          id: input.id,
        },
        data: {
          address: input.address,
          operationType: input.operationType,
          buildingType: input.buildingType,
          numberOfRooms: input.numberOfRooms,
          numberOfBathrooms: input.numberOfBathrooms,
          numberOfParkingLots: input.numberOfParkingLots,
          totalArea: input.totalArea,
        },
      });

      return acm;
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
      let where = {
        userId: ctx.userId,
      };
      if (input.status) {
        where = {
          ...where,
          status: input.status,
        };
      }

      if (input.search) {
        where = {
          ...where,
          OR: [
            {
              address: {
                contains: input.search,
              },
              operationType: {
                contains: input.search,
              },
              buildingType: {
                contains: input.search,
              },
            },
          ],
        };
      }
      const totalItemsCount = await ctx.db.acm.count({
        where,
      });
      const acms = await ctx.db.acm.findMany({
        take: limit,
        skip,
        orderBy: {
          createdAt: "desc",
        },
        where,
        include: {
          acmResultDetail: true,
        },
      });
      return {
        acms,
        totalItemsCount,
      };
    }),
});
