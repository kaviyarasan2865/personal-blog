"use client";
import React from "react";

const Page = () => {
  return (
      <div className="bg-gray-50 min-h-screen">
       
        {/* main content */}
        <div className="mx-60 p-10">
          <h1 className="text-4xl font-bold">Dashboard</h1>
          
          <div className="grid grid-cols-3 gap-10 mt-10">
            <div className="bg-green-100 rounded p-2 h-36">Total blogs</div>
            <div  className="bg-green-100 rounded p-2 h-36">No. of visitors</div>
            <div className="bg-green-100 rounded p-2 h-36">Contacts</div>
            
          </div>
        </div>

      </div>
  );
};

export default Page;
