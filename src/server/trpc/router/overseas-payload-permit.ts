import { z } from "zod";
import { router, publicProcedure, protectedProcedure, premiumProcedure, powerProcedure, adminProcedure } from "../trpc";


const airtableBaseId = process.env.NEXT_PRIVATE_AIRTABLE_BASE_ID
const airtableApiKey = process.env.NEXT_PRIVATE_AIRTABLE_API_KEY
const airtableBaseUrl = "https://api.airtable.com/v0/" + airtableBaseId + "/"


export const overseasPayloadPermitRouter = router({
    hello: publicProcedure
        .input(z.object({ text: z.string().nullish() }).nullish())
        .query(({ input }) => {
            return {
                greeting: `Greetings ${input?.text ?? "it works"}`,
            };
        }),




    // getAll: publicProcedure.query(({ ctx }) => {
    //     return ctx.prisma.example.findMany();
    // }),
})

