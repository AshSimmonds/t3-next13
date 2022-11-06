'use client';

import { useUser } from '@auth0/nextjs-auth0'
import Image from 'next/image'
import Link from 'next/link';

function HeaderBar() {

    // TODO: appDir not ready for prod yet, does not do TRPC, so only good for static pages
    console.log(`EXPERIMENTAL NextJS appDir: HeaderBar()`)

    const { user, error, isLoading } = useUser()

    if (error) {
        console.log(`HeaderBar Error: ${JSON.stringify(error, null, 4)}`)
        return <div>Error... {error.message}</div>
    }

    return (
        <div className="navbar bg-base-100 bg-gradient-to-b from-base-100 via-base-100 to-base-200 shadow-xl border-b-2 border-primary border-opacity-10 mb-4">
            <div className="navbar-start">
                <Link href="/" ><img src={`/blue_dwarf_space_long_logo-undefined.png`} alt="Blue Dwarf Space logo" className="max-h-12 max-w-36 cursor-pointer" /></Link>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    <li><Link href="/asdf">EXPERIMENTAL</Link></li>
                    {/* <li tabIndex={0}>
                        <Link href="/linktwo">
                            Parent
                        </Link>
                        <ul className="p-2 bg-base-100">
                            <li><Link href="/linktwosubone">Submenu 1</Link></li>
                            <li><Link href="/linktwosubtwo">Submenu 2</Link></li>
                        </ul>
                    </li> */}
                    {/* <li><Link href="/users">Users</Link></li> */}
                    {/* <li><Link href="/typography">Typography</Link></li> */}
                </ul>
            </div>

            <div className="navbar-end">
                {/* <div className="mr-4 mt-2"><ThemeChanger /></div> */}


                {!isLoading && user?.picture ? (<Link href="/profile" className="btn btn-circle border-1 border-neutral-content"><Image src={user.picture} className="w-full rounded-full" width={100} height={100}alt='avatar' /></Link>) : (<Link href="/api/auth/login" prefetch={false} className="btn btn-circle btn-accent">Login</Link>)}
            </div>


        </div>



    )
}


export default HeaderBar
