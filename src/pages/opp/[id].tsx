import { useUser } from "@auth0/nextjs-auth0"
import { NextPage } from "next"
// import NextError from "next/error"
import Head from "next/head"
import { useRouter } from "next/router"





const OverseasPayloadPermitPage: NextPage = () => {
    const { user, error, isLoading } = useUser()

    if (error) {
        console.log(`OverseasPayloadPermitPage error: ${error}`)

        return <div>{error.message}</div>
    }   

    const permitId = useRouter().query.id as string
    const userId = user?.sub




    return (
        <>
            <Head>
                <title>asdf</title>
            </Head>


        </>
    )



}

export default OverseasPayloadPermitPage
