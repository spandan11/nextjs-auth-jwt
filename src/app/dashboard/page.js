"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

const Dashboard = () => {
    const router = useRouter()
    const [data, setData] = useState([]);

    const LogOut = async () => {
        try {
            const res = await fetch("/api/user/logout", {
                method: "GET",
            })
            router.push("/login")
        } catch (error) {
            console.log(error)
        }
    }

    const getUserDetails = async () => {
        const res = await fetch("/api/user/me", {
            method: "GET",
        });
        const jsonData = await res.json();
        setData(jsonData.data);
    }

    return (
        <div className='text-center'>
            <h1>Hello</h1>
            <button onClick={LogOut} className='p-2 m-2 bg-red-500 text-white'>Logout</button>
            <button onClick={getUserDetails} className='p-2 m-2 bg-blue-500'>Getdata</button>
            <div className="py-5 ">
                <h1>Id: {data._id}</h1>
                <h1>Role: {data.role}</h1>
                <h1>Email: {data.email}</h1>
            </div>
        </div>
    )
}

export default Dashboard