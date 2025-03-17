import React from 'react'
import Link from "next/link";
import { signOut } from "next-auth/react";
import { toast } from "react-hot-toast";




const Navbar = () => {

    const handleSignOut = async () => {
        toast.success("Logging out...");
        await signOut({ callbackUrl: "/admin/login" });
      };

  return (
    <div>
         {/* navbar */}
         <div className="flex flex-row font-medium text-[18px] justify-between items-center px-10 bg-gray-950 text-white rounded p-5">
          <div className="flex flex-row gap-10">
            <div>
              <Link href="/admin/dashboard" className="text-2xl font-bold text-orange-500">InnoCollab</Link>
            </div>
            <Link href="/admin/dashboard/blogs">Blogs</Link>
            <Link href="/admin/dashboard/about">Why InnoCollab</Link>
          </div>
          <div>
            <button className="bg-green-600 p-2 rounded text-white" onClick={handleSignOut}>Sign Out</button>
          </div>
        </div>

    </div>
  )
}

export default Navbar