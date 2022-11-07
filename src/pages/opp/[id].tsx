import { useUser } from "@auth0/nextjs-auth0"
import { NextPage } from "next"
// import NextError from "next/error"
import Head from "next/head"
import { useRouter } from "next/router"
import { trpc } from "../../utils/trpc"
import { compress, decompress } from "compress-json"
import { Fragment } from "react"
import Link from "next/link"



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
                    // style={{
                    //     backgroundImage: `url('/AshSimmonds.png')`,
                    //     backgroundSize: "100%",
                    //     backgroundRepeat: "no-repeat",
                    //     backgroundPosition: "center",
                    // }}
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





    // const startSectionIndex = thePermit.data.content.match("Information about applicants")?.index
    // console.log(`OverseasPayloadPermitPage startSectionIndex: ${startSectionIndex}`)

    // const endSectionIndex = thePermit.data.content.match("Organisational structure")?.index
    // console.log(`OverseasPayloadPermitPage endSectionIndex: ${endSectionIndex}`)

    // const commaPreEndSection = thePermit.data.content.substring(0, endSectionIndex).lastIndexOf(",")
    // console.log(`OverseasPayloadPermitPage commaPreEndSection: ${commaPreEndSection}`)

    // const section01 = "{ " + thePermit.data.content.substring(startSectionIndex - 1, commaPreEndSection) + " }"
    // console.log(`OverseasPayloadPermitPage section01: ${section01}`)





    const sectionList = [
        {
            "startText": "Information about applicants",
            "endText": "Organisational structure",
            "description": "Bacon ipsum dolor amet doner tail chuck fatback tenderloin sirloin filet mignon ham flank beef. Shank doner sirloin pork chop",
        },
        {
            "startText": "Organisational structure",
            "endText": "Launch and payload",
            "description": "andouille brisket strip steak spare ribs boudin",
        },
        {
            "startText": "Launch and payload",
            "endText": "Launch safety",
            "description": "capicola alcatra tail boudin pig. Pig capicola buffalo tenderloin swine jowl",
        },
        {
            "startText": "Launch safety",
            "endText": "Debris mitigation",
            "description": "sausage pastrami burgdoggen filet mignon. Burgdoggen pork chop spare ribs leberkas kielbasa. Pork chop hamburger",
        },
        {
            "startText": "Debris mitigation",
            "endText": "Contracts",
            "description": "corned beef turkey short loin. Prosciutto",
        },
        {
            "startText": "Contracts",
            "endText": "Additional information",
            "description": "sirloin ground round turkey short loin. Beef",
        },
        {
            "startText": "Additional information",
            "endText": "Applicant declaration",
            "description": "ribs chislic strip steak. Pork short ribs",
        },
        {
            "startText": "Applicant declaration",
            "endText": "zxcv",
            "description": "picanha short loin biltong. ",
        },
    ]












    return (
        <>
            <Head>
                <title>{thePermit.data.title} | {thePermit.data.record_id} | Overseas Payload Permit | Blue Dwarf Space</title>
            </Head>

            <h1>{thePermit.data.title}</h1>

            <div className="w-full grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-12 mb-8">
                {sectionList.map((theSection) => (
                    <JsonSection theJson={thePermit.data.content} theStart={theSection.startText} theEnd={theSection.endText} theDescription={theSection.description} />
                ))}
            </div>

            <hr />



            <hr />
            <h3>Full source <span className="badge">(thePermit.data.content)</span></h3>
            <pre>
                {thePermit.data.content as string}
            </pre>


        </>
    )



}




// function JsonSection(theJson: any, theStart: string, theEnd: string) {
function JsonSection(props: any) {

    // const theText = " " + JSON.stringify(props.theJson) + " " as string

    // console.log(`JsonSection props.theJson: ${props.theJson}`)
    // console.log(`JsonSection theStart: ${props.theStart}`)

    const startSectionIndex = props.theJson.match(props.theStart)?.index
    console.log(`JsonSection startSectionIndex: ${startSectionIndex}`)

    const endSectionIndex = props.theJson.match(props.theEnd)?.index ?? 0
    console.log(`JsonSection endSectionIndex: ${endSectionIndex}`)

    const commaPreEndSection = props.theJson.substring(0, endSectionIndex).lastIndexOf(",")
    console.log(`JsonSection commaPreEndSection: ${commaPreEndSection}`)

    const theSection = "{ " + props.theJson.substring(startSectionIndex - 1, commaPreEndSection) + " }"
    // console.log(`JsonSection theSection: ${theSection}`)

    return (
        <div
            className="flex 
        flex-col 
        p-2 
        w-full
        md:w-64 
        cursor-pointer 
        bg-base-200
        rounded-lg
        shadow-md
        border:default
        hover:bg-base-300 
        hover:bg-opacity-50
        hover:border-secondary
        hover:scale-105
        hover:shadow-2xl
        transition-all
        ">

            <h2>{props.theStart}</h2>

            <p className="text-sm">
                {props.theDescription}
            </p>

            {/* {theSection} */}

            {props.children}

        </div>
    )

}






















function JsonCrackedLink(props: any) {

    let compressed = compress(props.jsonPart)

    // console.log(`JsonCrackedLink compressed: ${compressed}`)

    const encodedStuff = encodeURI(JSON.stringify(compressed))

    console.log(`JsonCrackedLink encodedStuff: ${encodedStuff}`)

    const jsonCrackLinkUrl = 'https://jsoncrack.com/editor?json=' + encodedStuff


    return (
        <a href={jsonCrackLinkUrl} target="_blank" rel="noreferrer">asdf</a>
    )

}



function JsonCrackedEmbed(props: any) {


    let compressed = compress(props.jsonPart)

    const encodedStuff = encodeURI(JSON.stringify(compressed))

    // https://jsoncrack.com/widget?t=1
    const jsonCrackEmbedUrl = `https://jsoncrack.com/widget?t=1`//&json=${encodedStuff}`


    // const embedScript = '<script>function sendToEmbed() { console.log("asdf"); const jsonCrackEmbed = document.getElementById("jsoncrackEmbed"); const json = document.getElementById("jsoncrackInput").value; jsonCrackEmbed.contentWindow.postMessage({ json: json }, "*");}</script>'

    const embedScript = '<script> var jsonCrackEmbed = document.getElementById("jsoncrackEmbed"); jsonCrackEmbed.contentWindow.postMessage({ json: json }, "*"); </script>'


    return (
        <section>
            <div>



                {/* {embedScript} */}



                <textarea id="jsoncrackInput">
                    {props.jsonPart}
                </textarea>
                {/* <button onclick="sendToEmbed()">Send JSON to Embed</button> */}
            </div>

            <iframe id="jsoncrackEmbed"
                src={jsonCrackEmbedUrl} width="100%" height="100%" className="border-2">
            </iframe>

            {embedScript}
        </section>


    )
}




export default OverseasPayloadPermitPage
