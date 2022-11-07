import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { overseasPayloadPermitRouter } from "./overseas-payload-permit";

export const appRouter = router({
    example: exampleRouter,
    auth: authRouter,
    overseasPayloadPermit: overseasPayloadPermitRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
