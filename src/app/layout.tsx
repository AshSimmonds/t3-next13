'use client';

// import Head from 'next/head'
import "../styles/globals.css"
import HeaderBar from "./HeaderBar"
import FooterBar from "./FooterBar";
import { UserProvider } from '@auth0/nextjs-auth0';

// TODO: appDir not ready for prod yet, does not do TRPC, so only good for static pages
console.log(`EXPERIMENTAL NextJS appDir: Layout()`)

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html>
            <head>
                <title>Recombobulator | Blue Dwarf Space</title>
            </head>
            <body>
                <UserProvider>

                    <div className="flex flex-col bg-base-100" data-theme="system" >

                        <HeaderBar />

                        <div className="prose mx-0 sm:mx-auto sm:w-full md:w-11/12 lg:w-10/12 xl:w-9/12 sm:p-0 md:p-4 border-0 bg-base-200 shadow-xl">

                            {children}

                        </div>

                        <FooterBar />

                    </div>

                </UserProvider>
            </body>
        </html>
    )
}
