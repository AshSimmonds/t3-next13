import { z } from "zod";
import { router, publicProcedure, protectedProcedure, premiumProcedure, powerProcedure, adminProcedure } from "../trpc";


const airtableBaseId = process.env.NEXT_PRIVATE_AIRTABLE_BASE_ID
const airtableApiKey = process.env.NEXT_PRIVATE_AIRTABLE_API_KEY
const overseasPayloadPermitTable = "overseas_payload_permit"
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

    

    getOne: protectedProcedure
        .input(z.object({
            permitId: z.string()
        }))
        .query(({ ctx, input }) => {

            // console.log(`getOne input: ${input}`)

            const permitObject = _fetchFromAirtable(input.permitId)
                .then((permitObject: any) => {

                    // console.log(`getOne permitObject: ${JSON.stringify(permitObject, null, 4)}`)

                    return permitObject.records[0].fields
                })
                .catch((error: any) => {
                    console.log(`getOne error: ${error}`)
                })

            return permitObject
        }),

})








// TODO: move these to a separate file

async function _fetchFromAirtable(permitId: string | undefined = undefined) {

    let filterFormula = ''
    if (permitId) {
        // filterFormula = encodeURI(`?filterByFormula={user_id}="${userId ? userId : 'asdf'}"`)
        filterFormula = encodeURI(`?filterByFormula={record_id}="${permitId}"`)
    }

    const fetchUrl = defaultFetchUrl + filterFormula

    // console.log(`_fetchFromAirtable fetchUrl ${fetchUrl}`)

    const fetchResult = await fetch(fetchUrl, {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + airtableApiKey,
            "Content-Type": "application/json"
        }
    }).then(airtableResult => airtableResult.json())
        .then(async airtableJson => {
            if (airtableJson.records.length > 0) {

                // console.log(`_fetchFromAirtable airtableJson: ${JSON.stringify(airtableJson, null, 4)}`)

                return airtableJson

            } else {
                // TODO: dunno
            }
        }).catch((error: Error) => {
            console.error(`overseas-payload-permit.ts _fetchFromAirtable error: ${error}`)
            return error
        })






    // Airtable doesn't return false booleans, so it comes through as undefined, real fucking helpful
    // if (!fetchResult.records[0].fields.MISSING_FIELD) {
    //     fetchResult.records[0].fields.MISSING_FIELD = false
    // }

    console.log(`fetchFromAirtable fetchResult: ${JSON.stringify(fetchResult, null, 4)}`)

    return fetchResult
}


