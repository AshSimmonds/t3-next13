import Head from "next/head"
import React from 'react'
import { UserProfile, withPageAuthRequired } from '@auth0/nextjs-auth0'

type ProfileProps = { user: UserProfile }

export default function ProtectedPage({ user }: ProfileProps): React.ReactElement {
    return (
        <>
            <Head>
                <title>Protected</title>
            </Head>

            <h1>Protected</h1>

            <p>
                Should only be able to land here if logged in.
            </p>
        </>
    )

}

export const getServerSideProps = withPageAuthRequired()
