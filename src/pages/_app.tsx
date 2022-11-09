// src/pages/_app.tsx
import "../styles/globals.css"
import "../styles/fancy.css"

import type { AppType } from "next/dist/shared/lib/utils"
import { trpc } from "../utils/trpc"
import LayoutOld from "./layout/Layout-old"
import { UserProvider } from '@auth0/nextjs-auth0';

const VIVID_ENABLED = false

if (
    VIVID_ENABLED &&
    typeof window !== "undefined" &&
    process.env.NODE_ENV === "development"
    // && /VIVID_ENABLED=true/.test(document.cookie)
) {
    import("vivid-studio").then((v) => v.run());
    import("vivid-studio/style.css");
}

const MyApp: AppType = ({ Component, pageProps }) => {

    return (

        <UserProvider>
            <LayoutOld>

                <Component {...pageProps} />

            </LayoutOld>
        </UserProvider>

    )
}

export default trpc.withTRPC(MyApp)
