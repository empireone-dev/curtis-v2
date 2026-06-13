import React from 'react'
import HeaderSection from './_sections/header-section'

export default function Layout({ children }) {
    return (
        <>
            <div className="min-h-screen flex items-start justify-center sm:p-8 font-sans">
                <div className="flex flex-col w-full bg-white overflow-hidden rounded-none shadow-none sm:max-w-xl sm:h-full sm:rounded-[2rem] sm:shadow-2xl">
                    <HeaderSection title="RESOLUTION PORTAL" />
                    <div className="w-full p-8 sm:p-10 flex flex-col justify-center bg-white z-10">
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}
