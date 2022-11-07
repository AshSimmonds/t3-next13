import { useUser } from "@auth0/nextjs-auth0"
import type { NextPage } from "next"
import Head from "next/head"
import { trpc } from "../utils/trpc"

const OverseasPayloadPermitPage: NextPage = () => {
    const { user, error, isLoading } = useUser()

    if (error) {
        console.log(`OverseasPayloadPermitPage error: ${error}`)

        return <div>{error.message}</div>
    }

    const { overseasPayloadPermit } = trpc.useContext()


    // const trpcHelloTestUseContext = overseasPayloadPermit.hello.fetch().then((useContextData) => {
    //     console.log (`OverseasPayloadPermitPage useContextData: ${JSON.stringify(useContextData, null, 4)}`)

    //     return useContextData.greeting
    // })

    // const h1Heading = trpcHelloTestUseContext

    // console.log (`OverseasPayloadPermitPage h1Heading: ${JSON.stringify(h1Heading, null, 4)}`)


    // useQuery({ text: "from tRPC" });
    const trpcHelloTestUseTrpc = trpc.overseasPayloadPermit.hello.useQuery({ text: "zxcv" })

    const h2Heading = trpcHelloTestUseTrpc.data?.greeting

    console.log(`OverseasPayloadPermitPage h2Heading: ${JSON.stringify(h2Heading, null, 4)}`)


    const allPermitsObject = trpc.overseasPayloadPermit.getAll.useQuery()


    // console.log(`OverseasPayloadPermitPage allPermitsObject.data: ${JSON.stringify(allPermitsObject.data, null, 4)}`)


    if (allPermitsObject.error) {
        return (
            <>
                <h2>
                    {allPermitsObject.error.data?.httpStatus} | {allPermitsObject.error.message}
                </h2>
                <pre>
                    {JSON.stringify(allPermitsObject.error, null, 4)}
                </pre>
            </>
        )
    }



    return (
        <>
            <Head>
                <title>Overseas Payload Permit</title>
            </Head>

            <h1>{ }</h1>

            <h2>{h2Heading}</h2>

            {allPermitsObject?.data ? <AllPermitsDisplay {...allPermitsObject.data} /> : <p>Loading...</p>}

        </>
    )

}




function AllPermitsDisplay(allPermitsObject: any) {

    // allPermitsObject?.records ? console.log(`AllPermitsDisplay allPermitsObject?.records: ${JSON.stringify(allPermitsObject?.records, null, 4)}`) : ''

    return (
        <>

            <div>
                {allPermitsObject.records?.map((permit: any) => (
                    <div key={permit.id}>
                        <h3>{permit.fields.title}</h3>
                        <p>{permit.fields.content}</p>
                    </div>
                ))}
            </div>

            <hr />
            <pre>
                {JSON.stringify(allPermitsObject, null, 4)}
            </pre>
        </>
    )
}




export default OverseasPayloadPermitPage
