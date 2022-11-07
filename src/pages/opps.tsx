import { useUser } from "@auth0/nextjs-auth0"
import type { NextPage } from "next"
import Head from "next/head"
import Link from "next/link"
import { trpc } from "../utils/trpc"

const OverseasPayloadPermitListPage: NextPage = () => {
    const { user, error, isLoading } = useUser()

    if (error) {
        console.log(`OverseasPayloadPermitListPage error: ${error}`)

        return <div>{error.message}</div>
    }

    const { overseasPayloadPermit } = trpc.useContext()


    // const trpcHelloTestUseContext = overseasPayloadPermit.hello.fetch().then((useContextData) => {
    //     console.log (`OverseasPayloadPermitListPage useContextData: ${JSON.stringify(useContextData, null, 4)}`)

    //     return useContextData.greeting
    // })

    // const h1Heading = trpcHelloTestUseContext

    // console.log (`OverseasPayloadPermitListPage h1Heading: ${JSON.stringify(h1Heading, null, 4)}`)


    // useQuery({ text: "from tRPC" });
    // const trpcHelloTestUseTrpc = trpc.overseasPayloadPermit.hello.useQuery({ text: "zxcv" })

    // const h2Heading = trpcHelloTestUseTrpc.data?.greeting

    const h1Heading = "Overseas Payload Permits"
    const h2Heading = ''

    console.log(`OverseasPayloadPermitListPage h2Heading: ${JSON.stringify(h2Heading, null, 4)}`)


    const allPermitsObject = trpc.overseasPayloadPermit.getAll.useQuery()


    // console.log(`OverseasPayloadPermitListPage allPermitsObject.data: ${JSON.stringify(allPermitsObject.data, null, 4)}`)


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

            <h1>{h1Heading}</h1>

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
                    <div key={permit.id} className="mt-16">
                        <h3><Link href={`/opp/${permit.id}`}>{permit.fields.title}</Link></h3>
                        <pre className="h-24 overflow-hidden hover:overflow-auto hover:h-auto hover:transition-all ease-in-out delay-1000">
                            {permit.fields.content}
                        </pre>
                    </div>
                ))}
            </div>

            <hr />
            <h2>All applications</h2>
            <pre className="h-24 overflow-hidden hover:overflow-auto hover:h-auto hover:transition-all ease-in-out delay-1000">
                {JSON.stringify(allPermitsObject, null, 4)}
            </pre>
        </>
    )
}




export default OverseasPayloadPermitListPage
