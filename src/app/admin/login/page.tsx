"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import {toast} from 'react-hot-toast'

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
     const response= await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (response?.error) {
        throw new Error(response.error);
      }
    
      router.push("/admin/dashboard")
      toast.success("Login Successfull")
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        toast.error('Login failed. Please check your credentials.');
      } else {
        setError('An unknown error occurred');
        toast.error('Login failed. Please try again.');
      }
    }
    setLoading(false);
  };
  return (
    <div className="justify-center items-center h-screen flex bg-gradient-to-r from-white to-white">
      <div className="bg-gray-950 p-14 flex flex-col justify-center items-center gap-10 rounded-2xl">
        <h1 className="text-white text-2xl font-bold">Admin Login</h1>
        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-7 justify-center items-center w-96"
        >
          <div className="flex flex-col gap-1">
            <label className="text-[18px] text-white font-medium">Email</label>
            <input
              className="border-1 border-gray-600 w-90 p-2  text-white rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => { setEmail(e.target.value);}}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[18px] text-white font-medium">Password</label>
            <input
              value={password}
              onChange={(e) => {setPassword(e.target.value);}}
              className="border-1 border-gray-600 w-90 p-2  text-white rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
              type="password"
              placeholder="Enter Password"
            />
          </div>

          {error && <p className="text-red-600">{error}</p>}

          <div className="flex flex-col gap-1">
            {loading ? (
              <button className="bg-green-600 text-white rounded-2xl p-2 cursor-not-allowed hover:cursor-progress w-40 text-gray">
                Loading...
              </button>
            ) : (
              <button className="bg-green-600 text-white hover:bg-green-800 hover:cursor-pointer rounded-2xl p-2 w-40 text-gray">
                Log in
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
