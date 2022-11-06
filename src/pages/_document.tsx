import Document, {
    type DocumentContext,
    type DocumentInitialProps,
    Html,
    Head,
    Main,
    NextScript
} from 'next/document'


class TheDocument extends Document {
    static async getInitialProps(
        ctx: DocumentContext
    ): Promise<DocumentInitialProps> {
        const initialProps = await Document.getInitialProps(ctx)

        return initialProps
    }
    render() {
        return (
            <Html lang="en">

                <Head>
                    <meta name="description" content="asdf" />
                    <link rel="icon" href="/favicon.ico" />

                    {/* PUT YOUR FONT IMPORTS HERE */}

                    <link rel="preconnect" href="https://api.fonts.coollabs.io" />
                    <link href="https://api.fonts.coollabs.io/css2?family=Montserrat&family=Rajdhani:wght@600&display=swap" rel="stylesheet"></link>

                </Head>

                <body>
                    <Main />
                    <NextScript />
                </body>

            </Html>
        )
    }
}

export default TheDocument
