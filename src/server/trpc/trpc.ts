import { initTRPC, TRPCError } from "@trpc/server"
import superjson from "superjson"

import { type Context } from "./context"


const t = initTRPC.context<Context>().create({
    transformer: superjson,
    errorFormatter({ shape }) {
        return shape
    },
})

export const router = t.router


const isRegistered = t.middleware(({ ctx, next }) => {
    console.log(`isAuthed: ctx.session: ${JSON.stringify(ctx.session, null, 4)}`)

    if (!ctx.session || !ctx.session.user) {
        throw new TRPCError({ code: "UNAUTHORIZED" })
    }

    return next({
        ctx: {
            // infers the `session` as non-nullable
            session: { ...ctx.session, user: ctx.session.user },
        },
    })
})


const isPremium = t.middleware(({ ctx, next }) => {
    console.log(`isAuthed: ctx.session: ${JSON.stringify(ctx.session, null, 4)}`)

    if (!ctx.session || !ctx.session.user || !ctx.session.user.premium) {
        throw new TRPCError({ code: "UNAUTHORIZED" })
    }

    return next({
        ctx: {
            // infers the `session` as non-nullable
            session: { ...ctx.session, user: ctx.session.user },
        },
    })
})


const isPower = t.middleware(({ ctx, next }) => {
    console.log(`isAuthed: ctx.session: ${JSON.stringify(ctx.session, null, 4)}`)

    if (!ctx.session || !ctx.session.user || !ctx.session.user.power) {
        throw new TRPCError({ code: "UNAUTHORIZED" })
    }

    return next({
        ctx: {
            // infers the `session` as non-nullable
            session: { ...ctx.session, user: ctx.session.user },
        },
    })
})


const isAdmin = t.middleware(({ ctx, next }) => {
    console.log(`isAuthed: ctx.session: ${JSON.stringify(ctx.session, null, 4)}`)

    if (!ctx.session || !ctx.session.user || !ctx.session.user.admin) {
        throw new TRPCError({ code: "UNAUTHORIZED" })
    }

    return next({
        ctx: {
            // infers the `session` as non-nullable
            session: { ...ctx.session, user: ctx.session.user },
        },
    })
})



export const publicProcedure = t.procedure

export const protectedProcedure = t.procedure.use(isRegistered)

export const premiumProcedure = t.procedure.use(isPremium)

export const powerProcedure = t.procedure.use(isPower)

export const adminProcedure = t.procedure.use(isAdmin)

