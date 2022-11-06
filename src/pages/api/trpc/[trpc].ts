import { createNextApiHandler } from "@trpc/server/adapters/next";

import { env } from "../../../env/server.mjs";
import { createContext } from "../../../server/trpc/context";
import { appRouter } from "../../../server/trpc/router/_app";

const showUnauthorized = false

// export API handler
export default createNextApiHandler({
    router: appRouter,
    createContext,
    onError:
        env.NODE_ENV === "development"
            ? ({ path, error }) => {

                if (error.code === "UNAUTHORIZED" && !showUnauthorized) {
                    return 
                }

                console.error(`❌ ERROR: tRPC '${path}': ${error.code}`);
            }
            : undefined,
});
