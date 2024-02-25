import { createTRPCRouter } from "~/server/api/trpc";
import { onboardRouter } from "~/server/api/routers/onboard";
import { userRouter } from "./routers/user";
import { clientRouter } from "./routers/client";
import { proposalRouter } from "./routers/proposal";
import { acmRouter } from "./routers/acm";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  onboard: onboardRouter,
  user: userRouter,
  clientRouter: clientRouter,
  proposal: proposalRouter,
  acm: acmRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
