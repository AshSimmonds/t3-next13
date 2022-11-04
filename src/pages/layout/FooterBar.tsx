import Link from "next/link";

function FooterBar() {

    return (

        <footer className="footer footer-center p-4 text-base-content
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
