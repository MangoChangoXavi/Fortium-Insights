import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { uploadFile } from "~/utils/functions";
import { getCoordinates, getSatelliteImage } from "~/utils/googleMaps";
import { getScrappedPostFromMongo } from "../mongodb";

export const acmRouter = createTRPCRouter({
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

      const satellitalImageBlob = await getSatelliteImage(
        coordinates.lat as unknown as number,
        coordinates.lng as unknown as number,
      );

      // convert the blob to a file with png type
      const file = new File([satellitalImageBlob], "satellitalImage.png", {
        type: "image/png",
      });

      // const satellitalImageUrl = await uploadFile(file);

      const data = {
        address: input.address,
        operationType: input.operationType,
        buildingType: input.buildingType,
        numberOfRooms: input.numberOfRooms,
        numberOfBathrooms: input.numberOfBathrooms,
        numberOfParkingLots: input.numberOfParkingLots,
        totalArea: input.totalArea,
        lat: coordinates.lat,
        lng: coordinates.lng,
        // satellitalImageUrl: satellitalImageUrl,
        radius: 5,
      };

      // from the table scrapedProperty locate all the properties that are close to the new property
      // based on the coordinates lat and lng
      // get all the properties that are close to the new property in a 5km radiu
      const properties = await getScrappedPostFromMongo({ ...data });
      await ctx.db.acm.create({
        data: {
          ...data,
          acmResultDetail: {
            create: properties.map((property) => ({
              lat: property.location.coordinates[1],
              lng: property.location.coordinates[0],
              price: property.price,
              currency: property.currency,
              address: property.address,
              numberOfBathrooms: property.numberOfBathrooms ?? 0,
              numberOfRooms: property.numberOfRooms ?? 0,
              buildingType: property.buildingType ?? 0,
              numberOfParkingLots: property.numberOfParkingLots ?? 0,
              totalArea: property.totalArea ?? 0,
            })),
          },
        },
      });
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
          acmResultSummary: true,
        },
      });
      return {
        acms,
        totalItemsCount,
      };
    }),

  // mutation to the route /result to update the result
  updateResult: publicProcedure
    .input(
      z.object({
        id: z.string(),
        expectedPrice: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const acm = await ctx.db.acm.update({
        where: {
          id: input.id,
        },
        data: {
          expectedPrice: input.expectedPrice,
        },
      });
      return acm;
    }),
});
