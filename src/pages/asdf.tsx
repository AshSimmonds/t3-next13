import type { NextPage } from "next"
import Head from "next/head"
import Link from "next/link"

const asdfPage: NextPage = () => {

    return (
        <>
            <Head>
                <title>asdf</title>
            </Head>

            <h1>quick access resources</h1>

            <h2>random stuff maybe useful during development</h2>

            <div className="mt-12">
                <h3>Local links</h3>
                <div className="w-full grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 mt-4 mb-8">
                    {linkListLocal.map((link) => (
                        <LinkRender key={link.title} title={link.title} url={link.url} description={link.description} />
                    ))}
                </div>
            </div>

            <div className="mt-12">
                <h3>External links</h3>
                <div className="w-full grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 mt-4 mb-8">
                    {linkListExternal.map((link) => (
                        <LinkRender key={link.title} title={link.title} url={link.url} description={link.description} />
                    ))}
                </div>
            </div>
        </>
    )

}

export default asdfPage



const linkListLocal = [
    {
        "title": "user access",
        "url": "/access",
        "description": "displays the different levels of access of current user"
    },
    {
        "title": "empty page",
        "url": "/empty",
        "description": "basic boilerplate page with no stuff"
    },
    {
        "title": "protected",
        "url": "/protected",
        "description": "will redirect to login if not logged in"
    },
    {
        "title": "typography",
        "url": "/typography",
        "description": "examples of all the different styles and colours"
    },
    {
        "title": "asdf",
        "url": "/asdf",
        "description": "asdf qwer zxcv uiop hjkl fghj erty xcvb asdf zxcv"
    },
]


const linkListExternal = [
    {
        "title": "airtable base",
        "url": "https://airtable.com/appvvqr9kvHiSFbfT",
        "description": "base of airtable project"
    },
    {
        "title": "auth user management",
        "url": "https://manage.auth0.com/dashboard/au/bluedwarf/activity",
        "description": "Auth0 - authentication and authorization provider"
    },
    {
        "title": "user roles",
        "url": "https://manage.auth0.com/dashboard/au/bluedwarf/roles",
        "description": "Auth0 - roles and permissions"
    },
    {
        "title": "login customisation",
        "url": "https://manage.auth0.com/dashboard/au/bluedwarf/universal-login/customizations",
        "description": "modify the look and feel of the registration / login page"
    },
    {
        "title": "website hosting",
        "url": "https://vercel.com/blue-dwarf/recombobulator",
        "description": "Vercel: where the site is built and hosted"
    },
    {
        "title": "git source code",
        "url": "https://github.com/AshSimmonds/t3-next13",
        "description": "GitHub: where the source code is stored"
    },
    {
        "title": "asdf",
        "url": "/asdf",
        "description": "asdf qwer zxcv uiop hjkl fghj erty xcvb asdf zxcv"
    },
]



function LinkRender(theLink: any) {
    return (
        <Link href={theLink.url} className="no-underline">
            <div style={{

            }}
                className="flex 
            flex-col 
            p-0 
            w-full
            md:w-64 
            cursor-pointer 
            bg-base-200
            rounded-lg
            shadow-lg
            hover:bg-base-300 
            hover:bg-opacity-50
            border border-base-100
            hover:border-secondary
            hover:scale-110
            hover:shadow-2xl
            transition-all
            ">

                <div className="text-2xl font-extrabold m-2 text-secondary">
                    {theLink.title}
                </div>

                <div className="m-2 ">
                    {theLink.description}
                </div>

            </div>
        </Link>
    )
}


