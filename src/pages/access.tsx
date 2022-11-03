import Head from "next/head"
import React from 'react'
import { UserProfile, withPageAuthRequired } from '@auth0/nextjs-auth0'
import { useUser } from '@auth0/nextjs-auth0'
import { trpc } from "../utils/trpc"
import { NextPage } from "next"

// type ProfileProps = { user: UserProfile }

const successOutcome = <span className="text-success">yep</span>
const failOutcome = <span className="text-warning">nope</span>

const ImportPage: NextPage = () => {
    const { user, error, isLoading } = useUser()

    if (error) {
        console.log(`error: ${error}`)

        return <div>{error.message}</div>
    }

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

            <h2>Front-end UI access</h2>

            <ul>
                <li>Guest: {successOutcome}</li>
                <li><>
                    Registered: {isLoading ? 'loading...' : (user ? <>{successOutcome}</> : <>{failOutcome}</>)}
                </></li>
                <li><>
                    Applicant: {isLoading ? 'loading...' : (user?.applicant ? <>{successOutcome}</> : <>{failOutcome}</>)}
                </></li>
                <li><>
                    Admin: {isLoading ? 'loading...' : (user?.admin ? <>{successOutcome}</> : <>{failOutcome}</>)}
                </></li>
            </ul>


            <h2>Back-end DATA access:</h2>

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


            <h2>Current user:</h2>
            <pre>
                {JSON.stringify(user, null, 4)}
            </pre>

        </>
    )

}

export default ImportPage
// export const getServerSideProps = withPageAuthRequired()
