import { useUser } from "@auth0/nextjs-auth0"
import { NextPage } from "next"
// import NextError from "next/error"
import Head from "next/head"
import { useRouter } from "next/router"
import { trpc } from "../../utils/trpc"
import { compress, decompress } from "compress-json"



const OverseasPayloadPermitPage: NextPage = () => {
    const { user, error, isLoading } = useUser()

    if (error) {
        console.log(`OverseasPayloadPermitPage error: ${error}`)

        return <div>{error.message}</div>
    }

    const permitId = useRouter().query.id as string
    const userId = user?.sub

    const parameterObject = {
        "permitId": permitId,
    }

    const thePermit = trpc.overseasPayloadPermit.getOne.useQuery(parameterObject)

    if (thePermit.status !== 'success') {
        return (
            <>
                <Head>
                    <title>{permitId ? permitId : 'Loading...'}</title>
                </Head>

                <div className="w-full items-center justify-center p-0 md:p-4 mx-auto">

                    <div className="w-full flex justify-center items-center h-56 sm:h-[28rem] md:h-[28rem] lg:h-[32rem] xl:h-[44rem] bg-black text-neutral-content"
                        style={{
                            backgroundImage: `url('/AshSimmonds.png')`,
                            backgroundSize: "100%",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                        }}
                    >
                        <div className="animate-spin inline-block w-16 h-16 border-0 rounded-full" role="status">
                            <span className="visually-hidden"><img src="/cricket-ball.svg" alt='' /></span>
                        </div>

                    </div>


                    <h1>
                        Loading: {permitId}
                    </h1>
                </div>

            </>
        )
    }



    // console.log(`OverseasPayloadPermitPage thePermit: ${JSON.stringify(thePermit, null, 4)}`)





    const startSectionIndex = thePermit.data.content.match("Information about applicants")?.index
    console.log(`OverseasPayloadPermitPage startSectionIndex: ${startSectionIndex}`)

    const endSectionIndex = thePermit.data.content.match("Organisational structure")?.index
    console.log(`OverseasPayloadPermitPage endSectionIndex: ${endSectionIndex}`)

    const commaPreEndSection = thePermit.data.content.substring(0, endSectionIndex).lastIndexOf(",")
    console.log(`OverseasPayloadPermitPage commaPreEndSection: ${commaPreEndSection}`)

    const section01 = "{ " + thePermit.data.content.substring(startSectionIndex - 1, commaPreEndSection) + " }"
    // console.log(`OverseasPayloadPermitPage section01: ${section01}`)

















    return (
        <>
            <Head>
                <title>{thePermit.data.title} | {thePermit.data.record_id} | Overseas Payload Permit | Blue Dwarf Space</title>
            </Head>

            <h1>{thePermit.data.title}</h1>


            <pre>
                {section01}
            </pre>


            <hr />


            <div>
                asdf
            </div>





            <hr />
            <pre>
                {thePermit.data.content}
            </pre>


        </>
    )



}




function JsonCracked(props: any) {


    let compressed = compress(props)

    const encodedStuff = encodeURI(JSON.stringify(compressed))

    const jsonCrackUrl = `https://jsoncrack.com/widget?json=${encodedStuff}`

    return (
        <iframe
            src={props}
            width="100%"
            height="640"
            className="border-2"></iframe>
    )
}




export default OverseasPayloadPermitPage
