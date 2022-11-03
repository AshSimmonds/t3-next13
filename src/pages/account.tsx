import type { NextPage } from "next"
import Head from "next/head"
import React from 'react'
import { useUser } from '@auth0/nextjs-auth0'
import Link from "next/link"
import NextError from "next/error"

const AccountPage: NextPage = () => {
    const { user, error, isLoading } = useUser()

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>{error.message}</div>

    if (!user) {
        return (
            <NextError
                title="Not authorized - must be logged in"
                statusCode={401}
            />
        );
    }


    return (
        <>
            <Head>
                <title>Account</title>
            </Head>
            <div className="w-3/4 items-center justify-center p-4 mx-auto">

                <h1>Account</h1>

                <h2>{user.name}</h2>

                {!user!.paid && (
                // {user && (
                    <>
                        <div>
                            <Link href="https://buy.stripe.com/test_fZe8x24tTh2k37O3cg"><button className="btn btn-primary m-4">Solo - $0.53</button></Link>
                        </div>

                        <div>
                            <Link href="https://buy.stripe.com/test_28ocNi0dD13m37OcMO"><button className="btn btn-secondary m-4">Teamwork - $0.69</button></Link>
                        </div>
                    </>
                )}
            </div>
        </>
    )

}

export default AccountPage
