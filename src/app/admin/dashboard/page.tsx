"use client";
import React from "react";
import { signOut } from "next-auth/react";
import { toast } from "react-hot-toast";

const handleSignOut = async () => {
  toast.success("Logging out...");
  await signOut({ callbackUrl: "/admin/login" });
};

const Page = () => {
  return (
    <>
      <div>Admin Dashboard</div>
      <button onClick={handleSignOut}>Sign Out</button>
    </>
  );
};

export default Page;
