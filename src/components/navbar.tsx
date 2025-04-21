'use client'

import Link from "next/link"
import { Button } from "./ui/button"

const Navbar = () => {
    const handleLogin = () => {
        console.log('login')
    }

    return (
        <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="font-bold text-xl">
                    <Link href="/">Ravnica Library</Link>
                </div>
                <nav className={`flex items-center justify-between h-16`}>
                    {/*Enter NavLink*/}
                    {/* Login Button*/}
                    <Button onClick={handleLogin}>
                        LogIn
                    </Button>
                </nav>
            </div>
        </header>
    )
}

export default Navbar