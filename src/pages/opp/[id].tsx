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
            "alertInfo": "Mostly good, waiting on approval",
            "alertSuccess": "",
            "alertWarning": "",
            "alertError": "",
        },
        {
            "startText": "Organisational structure",
            "endText": "Launch and payload",
            "description": "andouille brisket strip steak spare ribs boudin",
            "alertInfo": "",
            "alertSuccess": "",
            "alertWarning": "",
            "alertError": "",
        },
        {
            "startText": "Launch and payload",
            "endText": "Launch safety",
            "description": "capicola alcatra tail boudin pig. Pig capicola buffalo tenderloin swine jowl",
            "alertInfo": "",
            "alertSuccess": "",
            "alertWarning": "May require relocation",
            "alertError": "",
        },
        {
            "startText": "Launch safety",
            "endText": "Debris mitigation",
            "description": "sausage pastrami burgdoggen filet mignon. Burgdoggen pork chop spare ribs leberkas kielbasa. Pork chop hamburger",
            "alertInfo": "",
            "alertSuccess": "",
            "alertWarning": "",
            "alertError": "",
        },
        {
            "startText": "Debris mitigation",
            "endText": "Contracts",
            "description": "corned beef turkey short loin. Prosciutto",
            "alertInfo": "",
            "alertSuccess": "",
            "alertWarning": "",
            "alertError": "",
        },
        {
            "startText": "Contracts",
            "endText": "Additional information",
            "description": "sirloin ground round turkey short loin. Beef",
            "alertInfo": "",
            "alertSuccess": "Completed",
            "alertWarning": "",
            "alertError": "",
        },
        {
            "startText": "Additional information",
            "endText": "Applicant declaration",
            "description": "ribs chislic strip steak. Pork short ribs",
            "alertInfo": "",
            "alertSuccess": "",
            "alertWarning": "",
            "alertError": "",
        },
        {
            "startText": "Applicant declaration",
            "endText": "zxcv",
            "description": "picanha short loin biltong. ",
            "alertInfo": "",
            "alertSuccess": "",
            "alertWarning": "",
            "alertError": "Might have nukes",
        },
    ]












    return (
        <>
            <Head>
                <title>{thePermit.data.title} | {thePermit.data.record_id} | Overseas Payload Permit | Blue Dwarf Space</title>
            </Head>

            <h3 className="text-secondary" >Overseas Payload Permit Application</h3>
            <h1>{thePermit.data.title}</h1>

            <div className="w-full grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-12 mb-8">
                {sectionList.map((theSection) => (
                    <JsonSection theJson={thePermit.data.content} {...theSection} />
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

    const startSectionIndex = props.theJson.match(props.startText)?.index
    console.log(`JsonSection startSectionIndex: ${startSectionIndex}`)

    const endSectionIndex = props.theJson.match(props.endText)?.index ?? 0
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

            <h2>{props.startText}</h2>

            <p className="text-sm">
                {props.description}
            </p>

            {/* {theSection} */}

            {props.children}


            <div className={`alert alert-info shadow-lg ${props.alertInfo ? '' : 'hidden'}`}>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span>{props.alertInfo}</span>
                </div>
            </div>

            <div className={`alert alert-success shadow-lg ${props.alertSuccess ? '' : 'hidden'}`}>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>{props.alertSuccess}</span>
                </div>
            </div>

            <div className={`alert alert-warning shadow-lg ${props.alertWarning ? '' : 'hidden'}`}>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    <span>{props.alertWarning}</span>
                </div>
            </div>

            <div className={`alert alert-error shadow-lg ${props.alertError ? '' : 'hidden'}`}>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>{props.alertError}</span>
                </div>
            </div>


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


    // const embedScript = '<script>function sendToEmbed() {console.log("asdf"); const jsonCrackEmbed = document.getElementById("jsoncrackEmbed"); const json = document.getElementById("jsoncrackInput").value; jsonCrackEmbed.contentWindow.postMessage({json: json }, "*");}</script>'

    const embedScript = '<script> var jsonCrackEmbed = document.getElementById("jsoncrackEmbed"); jsonCrackEmbed.contentWindow.postMessage({json: json }, "*"); </script>'


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
