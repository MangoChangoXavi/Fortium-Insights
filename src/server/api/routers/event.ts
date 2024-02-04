import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
} from "~/server/api/trpc";


export const eventRouter = createTRPCRouter({
    create: protectedProcedure.input(
        z.object({
            title: z.string(),
            start: z.date(),
            end: z.date(),
            allDay: z.boolean(),
            desc: z.string(),
            userId: z.string(),
        })
    ).mutation(async ({ ctx, input }) => {
        const { title, start, end, allDay, desc, userId } = input;
        const event = await ctx.db.event.create({
            data: {
                userId,
                title,
                start,
                end,
                allDay,
                desc,
            },
        });
        return event;
    }),

    getEventsByUserId: protectedProcedure.input(
        z.object({
            userId: z.string().optional(),
        })
    ).query(async ({ ctx, input }) => {
        const { userId } = input;
        
        const events =  await ctx.db.event.findMany({
            where: {
                userId,
            },
            include: {
                User: {
                }
            },
        });

        return events;
    }),

});