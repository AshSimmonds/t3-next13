import { z } from "zod";
import { router, publicProcedure, protectedProcedure, premiumProcedure, powerProcedure, adminProcedure } from "../trpc";


const airtableBaseId = process.env.NEXT_PRIVATE_AIRTABLE_BASE_ID
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





    canAccessDatabasePublic: publicProcedure.query(async ({ ctx }) => {
        return fetchFromAirtableAsBoolean()
    }),





});




async function fetchFromAirtable() {

    const fetchUrl = airtableBaseUrl + airtableAsdfTable

    // console.log(`canAccessDatabasePublic fetchUrl: ${fetchUrl}`)

    const fetchResult = await fetch(fetchUrl, {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + airtableApiKey,
            "Content-Type": "application/json"
        }
    }).then(airtableResult => airtableResult.json())

    return fetchResult
}


async function fetchFromAirtableAsBoolean() {

    const airtableResult = await fetchFromAirtable()
        .then((resultJson: { error: { message: string | undefined; }; records: any; }) => {

            console.log(`fetchFromAirtableAsBoolean resultJson: ${JSON.stringify(resultJson, null, 4)}`)

            if (resultJson.error) {
                console.log(`fetchFromAirtableAsBoolean resultJson.error: ${JSON.stringify(resultJson.error, null, 4)}`)
                throw new Error(resultJson.error.message)
            }

            if (resultJson.records) {
                return true
            }

            return false
        }).catch((error: any) => {
            // console.log(`canAccessDatabasePublic error: ${JSON.stringify(error, null, 4)}`)
            return false
        })


    return airtableResult


}
