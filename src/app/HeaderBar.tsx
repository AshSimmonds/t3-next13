'use client';

import { useUser } from '@auth0/nextjs-auth0'


function HeaderBar() {

    const { user, error, isLoading } = useUser()

    return (
        <div className="navbar bg-base-100 bg-gradient-to-b from-base-100 via-base-100 to-base-200 shadow-xl border-b-2 border-primary border-opacity-10 mb-4">
            <div className="navbar-start">
                <a href="/" ><img src={`/blue_dwarf_space_long_logo-undefined.png`} alt="Blue Dwarf Space logo" className="max-h-12 max-w-36 cursor-pointer" /></a>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    <li><a href="/asdf">asdf</a></li>
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


                {!isLoading && user?.picture ? (<a href="/profile" className="btn btn-circle border-1 border-neutral-content"><img src={user.picture} className="w-full rounded-full" alt='avatar' /></a>) : (<a href="/api/auth/login" className="btn btn-circle btn-accent">Login</a>)}
            </div>


        </div>



    )
}


export default HeaderBar
