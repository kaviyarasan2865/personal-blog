'use client'
import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { signIn } from 'next-auth'

const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

const handleLogin = async(e: React.FormEvent) =>{
    e.preventDefault()
    setLoading(true)
    try{
        const res = await axios.post('/api/admin/login',
        {email,password})

        if(res.data.error){
            setError(res.data.error)
        }
        if(res.data.token){
            await signIn('credentials', {
                email,
                password,
                token: res.data.token
            })
        }

    }catch(err:any){
        setError(err.message)
    }
    setLoading(false)
}
  return (
    <div className='justify-center items-center h-screen flex bg-blue-900'>
        <div className='bg-white p-14 flex flex-col justify-center items-center gap-10 rounded-2xl'>
            <h1 className='text-blue-900 text-2xl font-bold'>Admin Login</h1>
            <form onSubmit={handleLogin} className='flex flex-col gap-7 justify-center items-center w-96'>
                <div className='flex flex-col gap-1'>
                <label className='text-[18px] font-medium'>Email</label>
                <input className='border-1 border-blue-600 w-90 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600'
                 type="email"
                 placeholder="Enter Email"
                    value={email}
                 onChange={(e)=>{setEmail(e.target.value)}}
                  />
                </div>
                <div className='flex flex-col gap-1'>
                <label className='text-[18px] font-medium'>Password</label>
                <input className='border-1 border-blue-600 w-90 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600'type="password" placeholder="Enter Password" />
                </div>

                    {error && <p className='text-red-600'>{error}</p>}

                <div className='flex flex-col gap-1'>
                    {loading ? 
                    <button className='bg-amber-600 rounded-2xl p-2 cursor-not-allowed hover:cursor-progress w-40 text-white'>Loading...</button> 
                    : <button className='bg-amber-600 rounded-2xl p-2 w-40 text-white'>Log in</button>
                    }
                </div>
            </form>
        </div>
    </div>
  )
}

export default LoginPage