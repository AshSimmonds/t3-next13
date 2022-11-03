// src/pages/_app.tsx
import "../styles/globals.css"
import type { AppType } from "next/dist/shared/lib/utils"
import { trpc } from "../utils/trpc"
import Layout from "./layout/Layout"
import { UserProvider } from '@auth0/nextjs-auth0';

const MyApp: AppType = ({ Component, pageProps }) => {

    return (

        <UserProvider>
            <Layout>

                <Component {...pageProps} />

            </Layout>
        </UserProvider>

    )
}

export default trpc.withTRPC(MyApp)
