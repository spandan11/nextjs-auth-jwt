import React from 'react'
import Link from 'next/link';

const Navbar = () => {
    return (
        <div className='bg-gray-400 py-5 px-10 gap-4 text-white text-center'>
            <Link href="/" className='px-2 '>Home</Link>
            <Link href="/register" className='px-2 '>Register</Link>
            <Link href="/login" className='px-2 '>Login</Link>
        </div>
    )
}

export default Navbar;