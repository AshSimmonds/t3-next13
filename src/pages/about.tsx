import type { NextPage } from "next"
import Head from "next/head"
// import { trpc } from "../utils/trpc"
// import MarkdownIt from 'markdown-it'

const AboutPage: NextPage = () => {

    // const pageContentTop = trpc.video.contentFromAirtable.useQuery({ pageName: "about", sectionName: "top" })
    // const pageContentBottom = trpc.video.contentFromAirtable.useQuery({ pageName: "about", sectionName: "bottom" })

    // let markdownTopToRender = pageContentTop.data
    // let markdownBottomToRender = pageContentBottom.data

    // if (markdownTopToRender) {
    //     console.log(`AboutPage pageContentTop`, JSON.stringify(pageContentTop, null, 4))
    //     console.log(`AboutPage markdownTopToRender`, JSON.stringify(markdownTopToRender, null, 4))

    //     if (markdownTopToRender?.error) {
    //         markdownTopToRender = `## Error: ${markdownTopToRender.error.message}`
    //     } else if (typeof markdownTopToRender === "string") {
    //         markdownTopToRender = MarkdownIt().render(markdownTopToRender)
    //     }
    // }


    // if (markdownBottomToRender) {
    //     console.log(`AboutPage pageContentBottom`, JSON.stringify(pageContentBottom, null, 4))
    //     console.log(`AboutPage markdownBottomToRender`, JSON.stringify(markdownBottomToRender, null, 4))

    //     if (markdownBottomToRender?.error) {
    //         markdownBottomToRender = `## Error: ${markdownBottomToRender.error.message}`
    //     } else if (typeof markdownBottomToRender === "string") {
    //         markdownBottomToRender = MarkdownIt().render(markdownBottomToRender)
    //     }

    // }


    return (
        <>
            <Head>
                <title>About</title>
            </Head>

            <h1>About</h1>

            <div className="indicator w-full mt-4">
                {/* {markdownTopToRender && (
                    <p dangerouslySetInnerHTML={{ __html: markdownTopToRender }}></p>
                )} */}
                <a href="https://airtable.com/appvvqr9kvHiSFbfT/" target="_blank" rel="noopener noreferrer" className="btn btn-xs btn-outline btn-accent top-0 right-0">edit <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-2"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg></a>
            </div>

            {/* <div>
                {markdownBottomToRender && (
                    <p dangerouslySetInnerHTML={{ __html: markdownBottomToRender }}></p>
                )}
            </div> */}
        </>
    )

}

export default AboutPage
