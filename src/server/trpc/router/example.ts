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


    // TODO: figure out whether ctx is ever needed this high up, removing now to not clog up linter with unused vars

    // canAccessBackendPublic: publicProcedure.query(({ ctx }) => {
    canAccessBackendPublic: publicProcedure.query(() => {
        return true;
    }),

    canAccessBackendRegistered: protectedProcedure.query(() => {
        return true;
    }),

    canAccessBackendPremium: premiumProcedure.query(() => {
        return true;
    }),

    canAccessBackendPower: powerProcedure.query(() => {
        return true;
    }),

    canAccessBackendAdmin: adminProcedure.query(() => {
        return true;
    }),





    canAccessDatabasePublic: publicProcedure.query(async () => {
        return fetchFromAirtableAsBoolean()
    }),

    canAccessDatabaseRegistered: protectedProcedure.query( ({ ctx }) => {
        return fetchFromAirtableAsBoolean(ctx.session.user.sub)
    }),

    canAccessDatabasePremium: premiumProcedure.query( ({ ctx }) => {
        return fetchFromAirtableAsBoolean(ctx.session.user.sub)
    }),

    canAccessDatabasePower: powerProcedure.query( ({ ctx }) => {
        return fetchFromAirtableAsBoolean(ctx.session.user.sub)
    }),

    canAccessDatabaseAdmin: adminProcedure.query( ({ ctx }) => {
        return fetchFromAirtableAsBoolean(ctx.session.user.sub)
    }),




    canAccessDatabaseWritePublic: publicProcedure.query( () => {
        return postToAirtableAsBoolean()
    }),


    canAccessDatabaseWriteRegistered: protectedProcedure.query( ({ ctx }) => {
        return postToAirtableAsBoolean(ctx.session.user.sub)
    }),


});







async function fetchFromAirtable(userId: string | undefined = undefined) {

    const filterFormula = encodeURI(`?filterByFormula={user_id}="${userId ? userId : 'asdf'}"`)

    const fetchUrl = airtableBaseUrl + airtableAsdfTable + filterFormula

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
                const newAirtableData = await createUserAsdfData(userId ? userId : 'asdf')

                // console.log(`fetchFromAirtable newAirtableData: ${JSON.stringify(newAirtableData, null, 4)}`)

                return newAirtableData
            }
        }).catch((error: Error) => {
            console.error(`fetchFromAirtable error: ${error}`)
            return false
        })

    return fetchResult
}







async function fetchFromAirtableAsBoolean(userId: string | undefined = undefined) {

    const airtableResult = await fetchFromAirtable(userId)
        .then((resultJson: { error: { message: string | undefined; }; records: []; }) => {

            // console.log(`fetchFromAirtableAsBoolean resultJson: ${JSON.stringify(resultJson, null, 4)}`)

            if (resultJson.error) {
                console.error(`fetchFromAirtableAsBoolean resultJson.error: ${JSON.stringify(resultJson.error, null, 4)}`)
                throw new Error(resultJson.error.message)
            }

            if (resultJson.records) {
                return true
            }

            return false
        }).catch((error: Error) => {
            console.error(`fetchFromAirtableAsBoolean error: ${JSON.stringify(error, null, 4)}`)
            return false
        })


    return airtableResult

}




async function postToAirtableAsBoolean(userId: string | undefined = undefined) {

    const airtableCurrentResult = await fetchFromAirtable(userId)
        .then((resultJson: { error: { message: string | undefined; }; records: []; }) => {

            // console.log(`fetchFromAirtableAsBoolean resultJson: ${JSON.stringify(resultJson, null, 4)}`)

            if (resultJson.error) {
                console.log(`fetchFromAirtableAsBoolean resultJson.error: ${JSON.stringify(resultJson.error, null, 4)}`)
                throw new Error(resultJson.error.message)
            }

            if (resultJson.records) {
                return true
            }

            return false
        }).catch((error: Error) => {
            console.log(`fetchFromAirtableAsBoolean error: ${JSON.stringify(error, null, 4)}`)
            return false
        })


    return airtableCurrentResult

}







function createUserAsdfData(userId: string) {

    const fetchUrl = airtableBaseUrl + airtableAsdfTable

    const asdfUserMetaData = {
        "records": [
            {
                "fields": {
                    "user_id": userId,
                    "title": "new title",
                    "content": "new content",
                }
            }]
    }

    return fetch(fetchUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${airtableApiKey}`,
        },
        body: JSON.stringify(asdfUserMetaData)

    }).then(response => response.json()).then(theData => {

        return theData
    })

}
