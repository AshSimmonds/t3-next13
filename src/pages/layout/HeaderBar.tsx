import Link from "next/link"

import 'tailwindcss/tailwind.css'
import { useTheme } from 'next-themes'

import { useUser } from '@auth0/nextjs-auth0'

const ThemeChanger = () => {
    const { theme, setTheme } = useTheme()

    if (!theme) {
        // TODO: who cares? NextJS 13 changed stuff, not sure how to deal with it yet
    }

    return (
        <>
            <label className="swap swap-rotate">

                <input title="whatever" type="checkbox" />

                <svg className='swap-on fill-current w-8 h-8 ${theme}' onClick={() => setTheme('ashlight')} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>

                <svg className='swap-off fill-current w-8 h-8 ${theme}' onClick={() => setTheme('ashdark')} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>

            </label>

        </>
    )
}


function HeaderBar() {
    const { user, error, isLoading } = useUser()
    // const { theme, setTheme } = useTheme()

    // const fallbackTheme = !theme ? 'ashlight' : theme

    if(error) {
        console.log(`HeaderBar error: ${error}`)
        
        return <div>Error: {error.message}</div>
    }

    return (
        <div className="navbar bg-base-100 bg-gradient-to-b from-base-100 via-base-100 to-base-200 shadow-xl border-b-2 border-primary border-opacity-10 mb-4">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <li><Link href="/asdf" >asdf</Link></li>
                        {/* <li tabIndex={0}>
                            <Link href="/linktwo" className="justify-between">
                                Parent
                            </Link>
                            <ul className="p-2 bg-base-100">
                                <li><Link href="/linktwosubone">Submenu 1</Link></li>
                                <li><Link href="/linktwosubtwo">Submenu 2</Link></li>
                            </ul>
                        </li> */}
                        <li><Link href="/users">Users</Link></li>
                        <li><Link href="/typography">Typography</Link></li>
                    </ul>
                </div>
                <Link href="/index-old" ><img src={`/blue_dwarf_space_long_logo-undefined.png`} alt="Blue Dwarf Space logo" className="max-h-12 max-w-36 cursor-pointer" /></Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    {/* <li><Link href="/playlist">Playlists</Link></li> */}
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
                <div className="mr-4 mt-2"><ThemeChanger /></div>


                {!isLoading && user?.picture ? (<Link href="/profile" className="btn btn-circle border-1 border-neutral-content"><img src={user.picture} className="w-full rounded-full" alt='avatar' /></Link>) : (<Link href="/api/auth/login" className="btn btn-circle btn-accent">Login</Link>)}
            </div>
        </div>

    )
}


export default HeaderBar
