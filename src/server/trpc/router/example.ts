import { z } from "zod";
import { router, publicProcedure, protectedProcedure, premiumProcedure, powerProcedure, adminProcedure } from "../trpc";


const airtableBaseId = process.env.NEXT_PRIVATE_AIRTABLE_BASE_ID
const airtableApiKey = process.env.NEXT_PRIVATE_AIRTABLE_API_KEY
const airtableBaseUrl = "https://api.airtable.com/v0/" + airtableBaseId + "/"
const airtableAsdfTable = "asdf"

const asdfFetchUrl = airtableBaseUrl + airtableAsdfTable

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
        return _fetchFromAirtableAsBoolean()
    }),

    canAccessDatabaseRegistered: protectedProcedure.query(({ ctx }) => {
        return _fetchFromAirtableAsBoolean(ctx.session.user.sub)
    }),

    canAccessDatabasePremium: premiumProcedure.query(({ ctx }) => {
        return _fetchFromAirtableAsBoolean(ctx.session.user.sub)
    }),

    canAccessDatabasePower: powerProcedure.query(({ ctx }) => {
        return _fetchFromAirtableAsBoolean(ctx.session.user.sub)
    }),

    canAccessDatabaseAdmin: adminProcedure.query(({ ctx }) => {
        return _fetchFromAirtableAsBoolean(ctx.session.user.sub)
    }),




    canAccessDatabaseWritePublic: publicProcedure.query(() => {
        return _postToAirtableFetchAsBoolean(undefined, undefined, "example.ts | canAccessDatabaseWritePublic")
    }),

    canAccessDatabaseWriteRegistered: protectedProcedure.query(({ ctx }) => {
        return _postToAirtableFetchAsBoolean(ctx.session.user.sub, undefined, "example.ts | canAccessDatabaseWriteRegistered")
    }),

    canAccessDatabaseWritePremium: premiumProcedure.query(({ ctx }) => {
        return _postToAirtableFetchAsBoolean(ctx.session.user.sub, undefined, "example.ts | canAccessDatabaseWritePremium")
    }),

    canAccessDatabaseWritePower: powerProcedure.query(({ ctx }) => {
        return _postToAirtableFetchAsBoolean(ctx.session.user.sub, undefined, "example.ts | canAccessDatabaseWritePower")
    }),

    canAccessDatabaseWriteAdmin: adminProcedure.query(({ ctx }) => {
        return _postToAirtableFetchAsBoolean(ctx.session.user.sub, undefined, "example.ts | canAccessDatabaseWriteAdmin")
    }),



    getFavourite: protectedProcedure.query(async ({ ctx }) => {

        // console.log(`example.ts | getFavourite | ctx.session.user.sub: ${ctx.session.user.sub}`)

        const theFavourite = await _getFavourite(ctx.session.user.sub)

        // console.log(`example.ts | getFavourite | theFavourite: ${theFavourite}`)

        return theFavourite
    }),

    toggleFavourite: protectedProcedure.query(({ ctx }) => {
        const isFavourite = _postToAirtableFetchAsBoolean(ctx.session.user.sub, 1, "example.ts | favouriteToggle")
            .then(() => {
                return _getFavourite(ctx.session.user.sub)
            })

        return isFavourite
    }),


});










// TODO: move these to a separate file

async function _fetchFromAirtable(userId: string | undefined = undefined) {

    const filterFormula = encodeURI(`?filterByFormula={user_id}="${userId ? userId : 'asdf'}"`)

    const fetchUrl = asdfFetchUrl + filterFormula

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
                const newAirtableData = await _createUserAsdfData(userId ? userId : 'asdf')

                // console.log(`fetchFromAirtable newAirtableData: ${JSON.stringify(newAirtableData, null, 4)}`)

                return newAirtableData
            }
        }).catch((error: Error) => {
            console.error(`fetchFromAirtable error: ${error}`)
            return false
        })


    // console.log(`fetchFromAirtable fetchResult: ${JSON.stringify(fetchResult, null, 4)}`)

    // Airtable doesn't return false booleans, so it comes through as undefined, real fucking helpful
    if (!fetchResult.records[0].fields.favourite) {
        fetchResult.records[0].fields.favourite = false
    }

    // console.log(`fetchFromAirtable fetchResult: ${JSON.stringify(fetchResult, null, 4)}`)

    return fetchResult
}







async function _fetchFromAirtableAsBoolean(userId: string | undefined = undefined) {

    const airtableResult = await _fetchFromAirtable(userId)
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




async function _postToAirtableFetchAsBoolean(userId: string | undefined = undefined, toggleFavourite: number | undefined, extraModifiedContext: string | undefined = undefined) {

    // const filterFormula = encodeURI(`?filterByFormula={user_id}="${userId ? userId : 'asdf'}"`)
    const rightMeow = new Date().toLocaleString()

    const airtableCurrentResult = await _fetchFromAirtable(userId)
        .then((resultJson) => {

            // console.log(`postToAirtableAsBoolean resultJson: ${JSON.stringify(resultJson, null, 4)}`)

            if (resultJson.error) {
                console.log(`postToAirtableAsBoolean resultJson.error: ${JSON.stringify(resultJson.error, null, 4)}`)
                throw new Error(resultJson.error.message)
            }

            if (resultJson.records.length > 0) {

                // console.log(`postToAirtableAsBoolean resultJson.records: ${JSON.stringify(resultJson.records, null, 4)}`)

                let isNowFavourite = resultJson.records[0].fields.favourite

                isNowFavourite = toggleFavourite ? !isNowFavourite : isNowFavourite

                const userMetaData = {
                    "records": [
                        {
                            "id": resultJson.records[0].fields.record_id,
                            "fields": {
                                "favourite": isNowFavourite,
                                "modified_context": rightMeow + " | " + extraModifiedContext + " | postToAirtableAsBoolean"
                            }
                        }
                    ]
                }

                // console.log(`postToAirtableAsBoolean userMetaData: ${JSON.stringify(userMetaData, null, 4)}`)



                return fetch(asdfFetchUrl, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${airtableApiKey}`,
                    },
                    body: JSON.stringify(userMetaData)

                }).then(response => response.json()).then(theData => {

                    // console.log(`postToAirtableAsBoolean theData: ${JSON.stringify(theData, null, 4)}`)
                    return theData.records.length > 0
                })


                // return true
            }

            return false
        }).catch((error: Error) => {
            console.log(`postToAirtableAsBoolean error: ${error}`)
            return false
        })


    return airtableCurrentResult

}







function _createUserAsdfData(userId: string) {

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




function _getFavourite(userId: string) {

    const isFavourite = _fetchFromAirtable(userId)
        .then((resultJson) => {
            // console.log(`_getFavourite resultJson.records[0].fields.favourite: ${JSON.stringify(resultJson.records[0].fields.favourite, null, 4)}`)
            return resultJson.records[0].fields.favourite ? true : false
        }).catch((error: Error) => {
            console.error(`getFavourite error: ${error}`)
            return false
        })

    return isFavourite

}
