import React, { useState } from 'react'
import Link from "next/link";
import { signOut } from "next-auth/react";
import { toast } from "react-hot-toast";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSignOut = async () => {
        toast.success("Logging out...");
        await signOut({ callbackUrl: "/admin/login" });
    };

    return (
        <div>
            {/* navbar */}
            <div className="relative bg-gray-950 text-white rounded p-5">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/admin/dashboard" className="text-xl md:text-2xl font-bold text-yellow-500">
                        Kaviyarasan G
                    </Link>

                    {/* Mobile menu button */}
                    <button 
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2"
                    >
                        {isOpen ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/admin/dashboard/blogs" className="font-medium text-[18px]">
                            Blogs
                        </Link>
                        <button 
                            className="bg-green-600 px-4 py-2 rounded text-white font-medium text-[18px]" 
                            onClick={handleSignOut}
                        >
                            Sign Out
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <div className="md:hidden mt-4 space-y-4">
                        <Link 
                            href="/admin/dashboard/blogs" 
                            className="block font-medium text-[18px]"
                            onClick={() => setIsOpen(false)}
                        >
                            Blogs
                        </Link>
                        <button 
                            className="w-full bg-green-600 px-4 py-2 rounded text-white font-medium text-[18px]" 
                            onClick={handleSignOut}
                        >
                            Sign Out
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Navbar