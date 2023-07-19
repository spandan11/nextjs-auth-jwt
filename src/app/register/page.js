"use client"

import React from 'react'
import { useRouter } from 'next/navigation'

const Register = () => {
    const router = new useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const username = e.target[0].value
        const role = e.target[1].value
        const email = e.target[2].value
        const password = e.target[3].value

        try {
            const res = await fetch('/api/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    role,
                    email,
                    password,
                })
            });
            router.push("/login?success=Account has been created")
        } catch (error) {
            console.log(error)
        }

        e.target.reset()
    }
    return (
        <div>
            <form onSubmit={handleSubmit} className='flex flex-col p-5'>
                <input className='border-black border-2 p-5 my-1' type="text" name='username' placeholder='username' required />
                <input className='border-black border-2 p-5 my-1' type="text" name='role' placeholder='admin,seller,user' required />
                <input className='border-black border-2 p-5 my-1' type="email" name='email' placeholder='email' required />
                <input className='border-black border-2 p-5 my-1' type="password" name='password' placeholder='password' required />
                <button type="submit" className='border-black border-2 p-5 bg-indigo-600 text-white hover:bg-indigo-700'>Register</button>
            </form>
        </div>
    )
}

export default Register;