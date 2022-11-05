'use client';

// TODO: 20221106 - causing runtime error, undefined 'call', use <a> for now
import Link from "next/link"

function HomePage() {
    return (
        <div>
            <h1>Home Page</h1>
            <p>Some content</p>
            <p>
                <a href="/about">
                    a link
                </a>
                <Link href="/about">
                    Link link
                </Link>

            </p>
        </div>
    )
}



export default HomePage