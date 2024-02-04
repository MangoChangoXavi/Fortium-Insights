import { createTRPCRouter } from "~/server/api/trpc";
import { reservationRouter } from "./routers/reservation";
import { eventRouter } from "./routers/event";
import { lotRouter } from "./routers/lot";
import { userRouter } from "./routers/user";
import { dashboardRouter } from "./routers/dashboard";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  reservation: reservationRouter,
  event: eventRouter,
  lot: lotRouter,
  user: userRouter,
  dashboard: dashboardRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
