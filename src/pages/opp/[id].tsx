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

    const permitId = useRouter().query.id as string

    if (error) {
        console.log(`OverseasPayloadPermitPage error: ${error}`)

        return <div>{error.message}</div>
    }

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

                    <div className="w-full flex justify-center items-center h-8 bg-black text-neutral-content"
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
                    <JsonSection key={thePermit.data.record_id} theJson={thePermit.data.content} {...theSection} />
                ))}
            </div>

            <hr />

            <VerticalTimelineFlowbite />


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

    const randomProgress = Math.floor(Math.random() * 100) + 1


    return (
        <div
            className="flex 
        flex-col 
        p-2 
        w-full
        md:w-64 
        cursor-pointer 
        bg-base-200
        rounded-sm
        shadow-md
        border-2
        border-primary
        border-opacity-20
        hover:bg-base-300 
        hover:bg-opacity-50
        hover:border-opacity-80
        hover:scale-105
        hover:shadow-2xl
        hover:w-full
        hover:flex-grow
        transition-all
        ">

            <h2>{props.startText}</h2>

            <progress className="progress progress-info w-56" value={randomProgress} max="100"></progress>

            <p className="text-sm">
                {props.description}
            </p>

            <pre className="h-24 overflow-hidden hover:overflow-auto hover:h-auto hover:transition-all ease-in-out delay-1000">
                {theSection}
            </pre>

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





            {/* The button to open modal */}
            {/* <label htmlFor="my-modal-5" className="btn">open modal</label> */}


        </div>




    )
}






















function JsonCrackedLink(props: any) {

    const compressed = compress(props.jsonPart)

    // console.log(`JsonCrackedLink compressed: ${compressed}`)

    const encodedStuff = encodeURI(JSON.stringify(compressed))

    console.log(`JsonCrackedLink encodedStuff: ${encodedStuff}`)

    const jsonCrackLinkUrl = 'https://jsoncrack.com/editor?json=' + encodedStuff


    return (
        <a href={jsonCrackLinkUrl} target="_blank" rel="noreferrer">asdf</a>
    )

}



function JsonCrackedEmbed(props: any) {


    const compressed = compress(props.jsonPart)

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









function VerticalTimelineFlowbite(props: any) {
    return (
        <div>
            <h2>Timeline</h2>

            <ol className="relative border-l border-gray-200 dark:border-gray-700">
                <li className="mb-10 ml-6">
                    <span className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                        <svg aria-hidden="true" className="w-3 h-3 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
                    </span>
                    <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">Launch vehicle assessment v0.1.4 <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">Latest</span></h3>
                    <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Released on January 13th, 2022</time>
                    <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">sausage pastrami burgdoggen filet mignon. Burgdoggen pork chop spare ribs leberkas kielbasa. Pork chop hamburger.</p>
                    <a href="#" className="inline-flex items-center py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"><svg className="mr-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clip-rule="evenodd"></path></svg> Download ZIP</a>
                </li>
                <li className="mb-10 ml-6">
                    <span className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                        <svg aria-hidden="true" className="w-3 h-3 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
                    </span>
                    <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">Payload scrutineering</h3>
                    <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Released on December 7th, 2021</time>
                    <p className="text-base font-normal text-gray-500 dark:text-gray-400"><span className="alert alert-warn">Stop bringing nukes, Dave.</span></p>
                </li>
                <li className="ml-6">
                    <span className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                        <svg aria-hidden="true" className="w-3 h-3 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
                    </span>
                    <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">Excess documentation</h3>
                    <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Released on December 2nd, 2021</time>
                    <p className="text-base font-normal text-gray-500 dark:text-gray-400">Just run it through an AI discombobulator.</p>
                </li>
            </ol>
        </div>
    )
}








export default OverseasPayloadPermitPage
