// import { postRouter } from "~/server/api/routers/post";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
// import { chunkRouter } from "./routers/chunk";
import { fileRouter } from "./routers/file";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  file: fileRouter
  // chunk: chunkRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
