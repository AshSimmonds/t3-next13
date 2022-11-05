'use client';

import "../styles/globals.css"
import HeaderBar from "./HeaderBar"
import FooterBar from "./FooterBar";
import { UserProvider } from '@auth0/nextjs-auth0';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html>
            <head></head>
            <body>
                <UserProvider>

                    <HeaderBar />

                    {children}

                    <FooterBar />

                </UserProvider>
            </body>
        </html>
    )
}
