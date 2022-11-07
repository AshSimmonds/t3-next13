import Head from "next/head"
import { useUser } from '@auth0/nextjs-auth0'
import { trpc } from "../utils/trpc"
import { type NextPage } from "next"
import { useState } from "react"
import { createMachine, interpret } from 'xstate'
import { useMachine } from '@xstate/react'

const successOutcome = <span className="text-success">yep</span>
const failOutcome = <span className="text-warning">nope</span>






const AccessPage: NextPage = () => {
    const { user, error, isLoading } = useUser()
    // const [isFavourite, setIsFavourite] = useState(false)

    if (error) {
        console.log(`AccessPage error: ${error}`)

        return <div>{error.message}</div>
    }








    // if (!isLoading && user?.sub) {
    //     setIsFavourite(trpc.example.getFavourite.useQuery().data)
    // }

    // const accessLevelBackendPublic = trpc.example.hello.useQuery({ text: "from tRPC" });
    const accessLevelBackendPublic = trpc.example.canAccessBackendPublic.useQuery()
    // const { data: accessLevelBackendRegistered } = trpc.auth.getSecretMessage.useQuery();
    const accessLevelBackendRegistered = trpc.example.canAccessBackendRegistered.useQuery()

    const accessLevelBackendPremium = trpc.example.canAccessBackendPremium.useQuery()

    const accessLevelBackendPower = trpc.example.canAccessBackendPower.useQuery()

    const accessLevelBackendAdmin = trpc.example.canAccessBackendAdmin.useQuery()

    // console.log(`AccessPage accessLevelBackendRegistered: ${JSON.stringify(accessLevelBackendRegistered, null, 4)}`)

    // console.log(`AccessPage accessLevelBackendRegistered.data: ${JSON.stringify(accessLevelBackendRegistered.data, null, 4)}`)

    // const accessLevelBackendPublic = trpc.example

    const accessLevelDataPublic = trpc.example.canAccessDatabasePublic.useQuery()
    // console.log(`AccessPage accessLevelDataPublic: ${JSON.stringify(accessLevelDataPublic, null, 4)}`)
    const accessLevelDataRegistered = trpc.example.canAccessDatabaseRegistered.useQuery()
    const accessLevelDataPremium = trpc.example.canAccessDatabasePremium.useQuery()
    const accessLevelDataPower = trpc.example.canAccessDatabasePower.useQuery()
    const accessLevelDataAdmin = trpc.example.canAccessDatabaseAdmin.useQuery()


    const accessLevelDataWritePublic = trpc.example.canAccessDatabaseWritePublic.useQuery()
    const accessLevelDataWriteRegistered = trpc.example.canAccessDatabaseWriteRegistered.useQuery()
    const accessLevelDataWritePremium = trpc.example.canAccessDatabaseWritePremium.useQuery()
    const accessLevelDataWritePower = trpc.example.canAccessDatabaseWritePower.useQuery()
    const accessLevelDataWriteAdmin = trpc.example.canAccessDatabaseWriteAdmin.useQuery()







    const { example } = trpc.useContext()

    const initialIsFavourite = trpc.example.getFavourite.useQuery().data


    const favouriteMachine =
        /** @xstate-layout N4IgpgJg5mDOIC5QDMCGA3A9gVwE4EsAXMAOnwgBswBiAFQHkBxRgGQFEBtABgF1FQADplhF8mAHb8QAD0QAmAMxySADgCcANgAsCrXLkB2LgrUGVAGhABPRAEY5XEhqUauWg1uMaArN60Bff0s0LDwiUgpMVAh8cShqbj4kECERQjFJZNkEA2U9A20VBTM9OTU1SxsEe2UyjQNdOVsuNQUNDRVAoJBxTAg4KRCcAmIySjApVNEJKWzDZWMjT1tvBV9db0rEbw0SNVLvOW83FVOVA0DgjGHwkkjo2KhJ4WnM0GyV2xIuORUtV3U+2MXA0WwQikcakOSmaChUzn0lxAQzCxGeaQys3kWhI+UKxT++jU5zBAFolN8Cd4Cs4dipbBouv4gA */
        createMachine(
            {
                context: { isFavourite: initialIsFavourite ? true : false },
                tsTypes: {} as import("./access.typegen").Typegen0,
                predictableActionArguments: true,
                id: "favourite",
                initial: "idle",
                states: {
                    idle: {
                        on: {
                            TOGGLE: {
                                target: "loading",
                                actions: "toggleFavourite",
                            },
                        },
                    },
                    loading: {
                        always: {
                            target: "idle",
                            actions: "delayASecond",
                        },
                    },
                },
            }, {
            actions: {
                toggleFavourite: (context, event) => {
                    console.log(`toggleFavourite: ${context.isFavourite}`)
                },
                delayASecond: (context, event) => {
                    console.log(`delayASecond BEFORE: ${context.isFavourite}`)

                    context.isFavourite = !context.isFavourite

                    example.toggleFavourite.fetch().then((isNowFavourite) => {
                        context.isFavourite = isNowFavourite
                    })

                    console.log(`delayASecond AFTER: ${context.isFavourite}`)
                }
            },

        })



    function ComponentToggleSwitch() {
        const [current, send] = useMachine(favouriteMachine)

        return (
            <div>
                <div className="checkbox-wrapper-55">
                    <label className="rocker rocker-small" >
                        <input type="checkbox"
                            onChange={() => { send('TOGGLE') }} checked={current.context.isFavourite}
                            disabled={current.value !== 'idle'}
                        />
                        <span className="switch-left">Yes</span>
                        <span className="switch-right">No</span>
                    </label>
                </div>
                <div>
                    State: {current.value}
                </div>
            </div>
        );
    }










    return (
        <>
            <Head>
                <title>Testing different levels of access</title>
            </Head>

            <h1>Testing different levels of access</h1>

            {/* <h2>{JSON.stringify(favouriteState.context, null, 4)}</h2> */}

            <div className="w-full grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-12 mb-8">

                <AccessCard title="Front-end UI" >
                    <ul>
                        <li>Guest: {successOutcome}</li>
                        <li><>
                            Registered: {isLoading ? 'loading...' : (user ? <>{successOutcome}</> : <>{failOutcome}</>)}
                        </></li>
                        <li><>
                            Premium: {isLoading ? 'loading...' : (user?.premium || user?.admin ? <>{successOutcome}</> : <>{failOutcome}</>)}
                        </></li>
                        <li><>
                            Power: {isLoading ? 'loading...' : (user?.power || user?.admin ? <>{successOutcome}</> : <>{failOutcome}</>)}
                        </></li>
                        <li><>
                            Admin: {isLoading ? 'loading...' : (user?.admin ? <>{successOutcome}</> : <>{failOutcome}</>)}
                        </></li>
                    </ul>
                </AccessCard>


                <AccessCard title="Back-end SERVER" >

                    <ul>
                        <li><>
                            Guest: {accessLevelBackendPublic.isFetching ? 'fetching...' : (accessLevelBackendPublic.data ? <>{successOutcome}</> : <>{failOutcome}</>)}
                        </></li>
                        <li><>
                            Registered: {accessLevelBackendRegistered.isLoading ? 'trying...' : (accessLevelBackendRegistered.data ? <>{successOutcome}</> : <>{failOutcome}</>)}
                        </></li>
                        <li><>
                            Premium: {accessLevelBackendPremium.isFetching ? 'fetching...' : (accessLevelBackendPremium.data ? <>{successOutcome}</> : <>{failOutcome}</>)}
                        </></li>
                        <li><>
                            Power: {accessLevelBackendPower.isFetching ? 'fetching...' : (accessLevelBackendPower.data ? <>{successOutcome}</> : <>{failOutcome}</>)}
                        </></li>
                        <li><>
                            Admin: {accessLevelBackendAdmin.isFetching ? 'fetching...' : (accessLevelBackendAdmin.data ? <>{successOutcome}</> : <>{failOutcome}</>)}
                        </></li>
                    </ul>

                </AccessCard>

                <AccessCard title="Back-end DATA read" >

                    <ul>
                        <li><>
                            Guest: {accessLevelDataPublic.isFetching ? 'fetching...' : (accessLevelDataPublic.data ? <>{successOutcome}</> : <>{failOutcome}</>)}
                        </></li>
                        <li><>
                            Registered: {accessLevelDataRegistered.isFetching ? 'fetching...' : (accessLevelDataRegistered.data ? <>{successOutcome}</> : <>{failOutcome}</>)}
                        </></li>
                        <li><>
                            Premium: {accessLevelDataPremium.isFetching ? 'fetching...' : (accessLevelDataPremium.data ? <>{successOutcome}</> : <>{failOutcome}</>)}
                        </></li>
                        <li><>
                            Power: {accessLevelDataPower.isFetching ? 'fetching...' : (accessLevelDataPower.data ? <>{successOutcome}</> : <>{failOutcome}</>)}
                        </></li>
                        <li><>
                            Admin: {accessLevelDataAdmin.isFetching ? 'fetching...' : (accessLevelDataAdmin.data ? <>{successOutcome}</> : <>{failOutcome}</>)}
                        </></li>
                    </ul>

                </AccessCard>


                <AccessCard title="Back-end DATA write" >

                    <ul>
                        <li><>
                            Guest: {accessLevelDataWritePublic.isFetching ? 'writing...' : (accessLevelDataWritePublic.data ? <>{successOutcome}</> : <>{failOutcome}</>)}
                        </></li>
                        <li><>
                            Registered: {accessLevelDataWriteRegistered.isFetching ? 'writing...' : (accessLevelDataRegistered.data ? <>{successOutcome}</> : <>{failOutcome}</>)}
                        </></li>
                        <li><>
                            Premium: {accessLevelDataWritePremium.isFetching ? 'fetching...' : (accessLevelDataWritePremium.data ? <>{successOutcome}</> : <>{failOutcome}</>)}
                        </></li>
                        <li><>
                            Power: {accessLevelDataWritePower.isFetching ? 'fetching...' : (accessLevelDataWritePower.data ? <>{successOutcome}</> : <>{failOutcome}</>)}
                        </></li>
                        <li><>
                            Admin: {accessLevelDataWriteAdmin.isFetching ? 'fetching...' : (accessLevelDataWriteAdmin.data ? <>{successOutcome}</> : <>{failOutcome}</>)}
                        </></li>
                    </ul>

                </AccessCard>




                <AccessCard title="Toggle DATA" >
                    <ComponentToggleSwitch />
                </AccessCard>




            </div>


            <hr />

            <h2>Current user:</h2>
            <pre>
                {JSON.stringify(user, null, 4)}
            </pre>

        </>
    )

}





function AccessCard(props: any) {
    return (
        <div
            className="flex 
            flex-col 
            p-4 
            w-full
            md:w-64 
            bg-base-200
            rounded-lg
            shadow-lg
            border border-base-100
            hover:scale-105
            hover:shadow-xl
            transition-all

            ">

            <h2>{props.title}</h2>

            {props.children}

        </div>
    )
}








export default AccessPage
