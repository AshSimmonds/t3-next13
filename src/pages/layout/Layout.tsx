import Head from 'next/head'
import { type ScriptProps } from 'next/script'
import { type PropsWithChildren } from 'react'
import HeaderBar from './HeaderBar'
import FooterBar from './FooterBar'
import { ThemeProvider } from 'next-themes'



function Layout({ children }: PropsWithChildren<ScriptProps>) {

    return (
        <>
            <Head>
                <title>Recombobulator | Blue Dwarf Space</title>
            </Head>

            <ThemeProvider defaultTheme="ashdark">

                <div className="flex flex-col bg-base-100" data-theme="system" >

                    <HeaderBar />

                    <div className="prose mx-0 sm:mx-auto sm:w-full md:w-11/12 lg:w-10/12 xl:w-9/12 sm:p-0 md:p-4 border-0 bg-base-200 shadow-xl">
                        {children}
                    </div>

                    <FooterBar />
                </div>

            </ThemeProvider>
        </>
    )
}


export default Layout
