import { z } from "zod";
import { router, publicProcedure, protectedProcedure, premiumProcedure, powerProcedure, adminProcedure } from "../trpc";


const airtableBaseId = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID
const airtableApiKey = process.env.NEXT_PRIVATE_AIRTABLE_API_KEY
const airtableBaseUrl = "https://api.airtable.com/v0/" + airtableBaseId + "/"
const airtableAsdfTable = "asdf"



export const exampleRouter = router({
    hello: publicProcedure
        .input(z.object({ text: z.string().nullish() }).nullish())
        .query(({ input }) => {
            return {
                greeting: `Hello ${input?.text ?? "world"}`,
            };
        }),
    // getAll: publicProcedure.query(({ ctx }) => {
    //     return ctx.prisma.example.findMany();
    // }),


    canAccessBackendPublic: publicProcedure.query(({ ctx }) => {
        return true;
    }),

    canAccessBackendRegistered: protectedProcedure.query(({ ctx }) => {
        return true;
    }),

    canAccessBackendPremium: premiumProcedure.query(({ ctx }) => {
        return true;
    }),

    canAccessBackendPower: powerProcedure.query(({ ctx }) => {
        return true;
    }),

    canAccessBackendAdmin: adminProcedure.query(({ ctx }) => {
        return true;
    }),





    canAccessDatabasePublic: publicProcedure.query(({ ctx }) => {






    }),



    

});
