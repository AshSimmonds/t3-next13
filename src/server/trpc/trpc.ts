import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { useUser } from "@auth0/nextjs-auth0";

import { type Context } from "./context";


const t = initTRPC.context<Context>().create({
    transformer: superjson,
    errorFormatter({ shape }) {
        return shape;
    },
});

export const router = t.router;

/**
 * Unprotected procedure
 **/
export const publicProcedure = t.procedure;

/**
 * Reusable middleware to ensure
 * users are logged in
 */
const isAuthed = t.middleware(({ ctx, next }) => {
    // const { user, error, isLoading } = useUser()

    console.log(`isAuthed: ctx.session: ${JSON.stringify(ctx.session, null, 4)}`);

    // console.log(`isAuthed: user: ${JSON.stringify(user, null, 4)}`);

    if (!ctx.session || !ctx.session.user) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return next({
        ctx: {
            // infers the `session` as non-nullable
            session: { ...ctx.session, user: ctx.session.user },
        },
    });
});

/**
 * Protected procedure
 **/
export const protectedProcedure = t.procedure.use(isAuthed);
