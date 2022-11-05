'use client';

// TODO: 20221106 - causing runtime error, undefined 'call', use <a> for now
import Link from "next/link"
import { Fragment } from "react";

function HomePage() {

    const buttonList = [
        {
            "buttonText": "About",
            "buttonLink": "/about"
        },
        {
            "buttonText": "asdf",
            "buttonLink": "/asdf"
        },
        {
            "buttonText": "qwer",
            "buttonLink": "/qwer"
        },
        {
            "buttonText": "zxcv",
            "buttonLink": "/zxcv"
        },
    ]

    return (
        <main className="flex flex-col items-center justify-center mx-auto p-4">
            <img src={`/moonlogo_small.png`} alt="Blue Dwarf Space logo" className="w-full sm:w-1/3 md:w-2/3" />

            <div className="w-full grid gap-8 grid-cols-2 mt-12 mb-8">
                {buttonList.map((button) => (
                    <Fragment key={button.buttonText}>
                        <Link href={button.buttonLink} className="btn btn-primary bg-opacity-20 uppercase text-xl leading-5">{button.buttonText}</Link>
                    </Fragment>
                ))}
            </div>

        </main>
    )
}



export default HomePage