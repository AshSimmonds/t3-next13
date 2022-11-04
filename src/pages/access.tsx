import Head from "next/head"
import React from 'react'
import { UserProfile, withPageAuthRequired } from '@auth0/nextjs-auth0'
import { useUser } from '@auth0/nextjs-auth0'
import { trpc } from "../utils/trpc"
import { NextPage } from "next"

// type ProfileProps = { user: UserProfile }

const successOutcome = <span className="text-success">yep</span>
const failOutcome = <span className="text-warning">nope</span>

const AccessPage: NextPage = () => {
    const { user, error, isLoading } = useUser()

    if (error) {
        console.log(`error: ${error}`)

        return <div>{error.message}</div>
    }

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

    // const accessLevelDataPublic = trpc.video.asdfPsuedoRandom.useQuery('public')
    // const accessLevelDataRegistered = trpc.video.asdfPsuedoRandom.useQuery('registered')
    // const accessLevelDataApplicant = trpc.video.asdfPsuedoRandom.useQuery('applicant')
    // const accessLevelDataAdmin = trpc.video.asdfPsuedoRandom.useQuery('admin')

    return (
        <>
            <Head>
                <title>Testing different levels of access</title>
            </Head>

            <h1>Testing different levels of access</h1>

            <div className="w-full grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-12 mb-8">

                <AccessCard title="Front-end UI" >
                    <ul>
                        <li>Guest: {successOutcome}</li>
                        <li><>
                            Registered: {isLoading ? 'loading...' : (user ? <>{successOutcome}</> : <>{failOutcome}</>)}
                        </></li>
                        <li><>
                            Premium: {isLoading ? 'loading...' : (user?.premium ? <>{successOutcome}</> : <>{failOutcome}</>)}
                        </></li>
                        <li><>
                            Power: {isLoading ? 'loading...' : (user?.power ? <>{successOutcome}</> : <>{failOutcome}</>)}
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

                <AccessCard title="Back-end DATA" >

                    {/* <ul>
                <li><>
                    Guest: {accessLevelDataPublic.isFetching ? 'fetching...' : (accessLevelDataPublic.data ? <>{successOutcome}</> : <>{failOutcome}</>)}
                </></li>
                <li><>
                    Registered: {accessLevelDataRegistered.isFetching ? 'fetching...' : (accessLevelDataRegistered.data ? <>{successOutcome}</> : <>{failOutcome}</>)}
                </></li>
                <li><>
                    Applicant: {accessLevelDataApplicant.isFetching ? 'fetching...' : (accessLevelDataApplicant.data ? <>{successOutcome}</> : <>{failOutcome}</>)}
                </></li>
                <li><>
                    Admin: {accessLevelDataAdmin.isFetching ? 'fetching...' : (accessLevelDataAdmin.data ? <>{successOutcome}</> : <>{failOutcome}</>)}
                </></li>
            </ul> */}

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
