import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { getRequirementsFromMongo } from "../mongodb";
export const maxDuration = 200; // This function can run for a maximum of 5 seconds
export const requirementsRouter = createTRPCRouter({
  get: publicProcedure
    .input(
      z.object({
        lat: z.number().optional(),
        lng: z.number().optional(),
        buildingType: z.string().optional(),
        operationType: z.string().optional(),
        minNumberOfRooms: z.number().optional(),
        maxNumberOfRooms: z.number().optional(),
        minNumberOfBathrooms: z.number().optional(),
        maxNumberOfBathrooms: z.number().optional(),
        minNumberOfParkingLots: z.number().optional(),
        maxNumberOfParkingLots: z.number().optional(),
        minTotalArea: z.number().optional(),
        maxTotalArea: z.number().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      // if not location return empty array
      if (!input.lat || !input.lng) return [];

      const data = {
        operationType: input.operationType,
        buildingType: input.buildingType,
        minNumberOfRooms: input.minNumberOfRooms,
        maxNumberOfRooms: input.maxNumberOfRooms,
        minNumberOfBathrooms: input.minNumberOfBathrooms,
        maxNumberOfBathrooms: input.maxNumberOfBathrooms,
        minNumberOfParkingLots: input.minNumberOfParkingLots,
        maxNumberOfParkingLots: input.maxNumberOfParkingLots,
        minTotalArea: input.minTotalArea,
        maxTotalArea: input.maxTotalArea,
        lat: input.lat,
        lng: input.lng,
        radius: 2,
        userId: ctx.userId,
      };

      // from the table scrapedProperty locate all the properties that are close to the new property
      // based on the coordinates lat and lng
      // get all the properties that are close to the new property in a 5km radiu
      return await getRequirementsFromMongo({ ...data });
    }),
});
