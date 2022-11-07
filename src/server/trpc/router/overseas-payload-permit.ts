import { z } from "zod";
import { router, publicProcedure, protectedProcedure, premiumProcedure, powerProcedure, adminProcedure } from "../trpc";


const airtableBaseId = process.env.NEXT_PRIVATE_AIRTABLE_BASE_ID
const airtableApiKey = process.env.NEXT_PRIVATE_AIRTABLE_API_KEY
const overseasPayloadPermitTable = "overseas-payload-permit"
const airtableBaseUrl = "https://api.airtable.com/v0/" + airtableBaseId + "/"

const defaultFetchUrl = airtableBaseUrl + overseasPayloadPermitTable


export const overseasPayloadPermitRouter = router({
    hello: publicProcedure
        .input(z.object({ text: z.string().nullish() }).nullish())
        .query(({ input }) => {
            return {
                greeting: `Greetings ${input?.text ?? "it works"}`,
            };
        }),




    getAll: protectedProcedure.query(({ ctx }) => {
        return _fetchFromAirtable()
    }),


})






// TODO: move these to a separate file

async function _fetchFromAirtable() {

    const filterFormula = ''
    // const filterFormula = encodeURI(`?filterByFormula={user_id}="${userId ? userId : 'asdf'}"`)

    const fetchUrl = defaultFetchUrl + filterFormula

    const fetchResult = await fetch(fetchUrl, {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + airtableApiKey,
            "Content-Type": "application/json"
        }
    }).then(airtableResult => airtableResult.json())
        .then(async airtableJson => {
            if (airtableJson.records.length > 0) {
                return airtableJson
            } else {
                // TODO: dunno
            }
        }).catch((error: Error) => {
            console.error(`overseas-payload-permit.ts _fetchFromAirtable error: ${error}`)
            return false
        })



    // Airtable doesn't return false booleans, so it comes through as undefined, real fucking helpful
    // if (!fetchResult.records[0].fields.MISSING_FIELD) {
    //     fetchResult.records[0].fields.MISSING_FIELD = false
    // }

    // console.log(`fetchFromAirtable fetchResult: ${JSON.stringify(fetchResult, null, 4)}`)

    return fetchResult
}


