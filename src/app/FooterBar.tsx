import Link from "next/link";

function FooterBar() {

    // TODO: appDir not ready for prod yet, does not do TRPC, so only good for static pages
    console.log(`EXPERIMENTAL NextJS appDir: FooterBar()`)

    return (

        <footer className="footer footer-center p-4 mt-4 text-base-content
        bg-base-100 bg-gradient-to-b from-base-200 via-base-200 to-base-100         
        
        ">
            <div >
                <Link href={"/asdf"}>asdf</Link>
                <Link href={"/"}>Home</Link>
            </div>
        </footer>

    )

}

export default FooterBar
