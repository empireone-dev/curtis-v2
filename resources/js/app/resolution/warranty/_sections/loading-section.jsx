import React, { useState, useEffect } from 'react';

export default function LoadingSection() {


    // THE LOADED CONTENT STATE
    return (

        <div  className='flex items-center justify-center h-screen'>
            <div className="relative w-24 h-24 animate-[spin_1.5s_linear_infinite]">
                <div className="absolute inset-0 rounded-full border-[5px] border-transparent border-t-blue-500 rotate-0"></div>
                <div className="absolute inset-0 rounded-full border-[5px] border-transparent border-t-gray-300 rotate-90"></div>
                <div className="absolute inset-0 rounded-full border-[5px] border-transparent border-t-blue-500 rotate-180"></div>
                <div className="absolute inset-0 rounded-full border-[5px] border-transparent border-t-gray-300 -rotate-90"></div>
            </div>
        </div>

    );
}