import type { NextPage } from "next"
import Head from "next/head"
import React from 'react'
import { useUser } from '@auth0/nextjs-auth0'
import Link from "next/link"

const ProfilePage: NextPage = () => {
    const { user, error, isLoading } = useUser()

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>{error.message}</div>

    const accountType = user?.paid ? 'Paid' : "Free"


    return (
        <>
            <Head>
                <title>Profile</title>
            </Head>
            <div className="w-3/4 items-center justify-center p-4 mx-auto">

                <h1>Profile</h1>

                {user && (

                    <div>
                        {/* <img src={user.picture ? user.picture : ''} alt={user.name ? user.name : ''} /> */}
                        <h2>{user.name}</h2>
                        <p>
                            <Link href="/account"><button className="btn btn-accent">Account (type: {accountType})</button></Link>
                        </p>
                        <p>{user.email}</p>
                        <p>
                            <Link href="/api/auth/logout"><button className="btn btn-warning">Logout</button></Link>
                        </p>

                        <pre>{JSON.stringify(user, null, 4)}</pre>
                    </div>


                )}

                <p>
                    <Link href="/api/auth/login"><button className="btn btn-secondary">Login</button></Link>
                </p>

                <p>
                    <Link href="/api/auth/logout"><button className="btn btn-warning btn-outline">Logout</button></Link>
                </p>
            </div>
        </>
    )

}

export default ProfilePage
