"use client"

import React from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

const Login = () => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const success = searchParams.get('success')

    const handleSubmit = async (e) => {
        e.preventDefault()

        const email = e.target[0].value
        const password = e.target[1].value

        console.log(email, password)

        try {

            const res = await fetch('/api/user/login', {
                method: 'POST',
                headers: {
                    "content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password,
                })
            });

            router.push('/dashboard')

        } catch (error) {
            console.log(error)
        }

    }
    return (
        <div>
            <form onSubmit={handleSubmit} className='flex flex-col p-5'>
                <input className='border-black border-2 p-5 my-1' type="email" name='email' placeholder='email' required />
                <input className='border-black border-2 p-5 my-1' type="password" name='password' placeholder='password' required />
                <button type="submit" className='border-black border-2 p-5 bg-indigo-600 text-white hover:bg-indigo-700'>Login</button>
            </form>
        </div>
    )
}

export default Login;