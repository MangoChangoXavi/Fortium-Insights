import { createServerSideHelpers } from "@trpc/react-query/server";
import { db } from "../db";
import { appRouter } from "../api/root";
import SuperJSON from "superjson";

// Fetch data before the page loads
export const generateSSGHelper = () => {
    return createServerSideHelpers({
      router: appRouter,
      ctx: {
        userId: null,
        db,
      },
      transformer: SuperJSON, // optional - adds superjson serialization
    });
  };
  