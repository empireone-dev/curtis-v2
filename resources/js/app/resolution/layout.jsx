import React from 'react'
import HeaderSection from './_sections/header-section'

export default function Layout({ children }) {
    return (
        <>
            <div className="min-h-screen bg-gray-200 flex items-center justify-center sm:p-8 font-sans">
                {/* Main Card Container (Forced Vertical) */}
                <div className="flex flex-col w-full bg-white h-[100dvh] overflow-hidden rounded-none shadow-none sm:max-w-[450px] sm:h-full sm:rounded-[2rem] sm:shadow-2xl">
                    <HeaderSection title="RESOLUTION PORTAL"/>
                    {/* Bottom Panel (White Form) */}
                    <div className="w-full p-8 sm:p-10 flex flex-col justify-center bg-white z-10">
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}
