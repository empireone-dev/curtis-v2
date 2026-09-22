
import React, { useState } from 'react'
import HeaderSection from './../../_sections/header-section'
import { router } from '@inertiajs/react'
// import { useRouter } from 'next/navigation'

export default function Page() {
    const [selection, setSelection] = useState('')
    // const router = useRouter()

    const handleRouting = () => {
        router.visit("/resolution/safety_issue/blank")
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-start justify-center sm:p-8 font-sans">
            <div className="flex flex-col w-full bg-white overflow-hidden rounded-none shadow-none sm:max-w-xl sm:h-full sm:rounded-[2rem] sm:shadow-xl sm:border sm:border-gray-100">
                <HeaderSection />

                {/* Bottom Panel (White Form) */}
                <div className="w-full p-8 sm:p-10 flex flex-col justify-center bg-white z-10">

                    {/* Header Text */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            Welcome
                        </h2>
                        <p className="text-gray-500">
                            To help us route you correctly, please select your profile below.
                        </p>
                    </div>

                    {/* Radio Options - Card Style */}
                    <div className="space-y-4 mb-8">
                        <label
                            className={`group flex items-center p-5 border-2 rounded-2xl cursor-pointer transition-all duration-200 ease-in-out ${selection === 'insurance'
                                ? 'border-blue-600 bg-blue-50/50 shadow-sm'
                                : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                                }`}
                        >
                            <input
                                type="radio"
                                name="userType"
                                value="insurance"
                                checked={selection === 'insurance'}
                                onChange={(e) => setSelection(e.target.value)}
                                className="w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            {/* Building Icon */}
                            <div className={`ml-4 p-2 rounded-lg ${selection === 'insurance' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500 group-hover:text-blue-500'}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><path d="M9 22v-4h6v4"></path><path d="M8 6h.01"></path><path d="M16 6h.01"></path><path d="M12 6h.01"></path><path d="M12 10h.01"></path><path d="M12 14h.01"></path><path d="M16 10h.01"></path><path d="M16 14h.01"></path><path d="M8 10h.01"></path><path d="M8 14h.01"></path></svg>
                            </div>
                            <span className="ml-3 font-semibold text-gray-800 text-lg">
                                I am from an insurance company
                            </span>
                        </label>

                        <label
                            className={`group flex items-center p-5 border-2 rounded-2xl cursor-pointer transition-all duration-200 ease-in-out ${selection === 'individual'
                                ? 'border-blue-600 bg-blue-50/50 shadow-sm'
                                : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                                }`}
                        >
                            <input
                                type="radio"
                                name="userType"
                                value="individual"
                                checked={selection === 'individual'}
                                onChange={(e) => setSelection(e.target.value)}
                                className="w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            {/* User Icon */}
                            <div className={`ml-4 p-2 rounded-lg ${selection === 'individual' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500 group-hover:text-blue-500'}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                            </div>
                            <span className="ml-3 font-semibold text-gray-800 text-lg">
                                I am an individual / customer
                            </span>
                        </label>
                    </div>

                    {/* Dynamic Content Area */}
                    <div className="min-h-[120px]">
                        {/* Contact Card for Insurance */}
                        {selection === 'insurance' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 bg-gray-50 border border-gray-200 p-6 rounded-2xl">
                                <h3 className="text-sm font-bold tracking-wider text-gray-500 uppercase mb-4">Dedicated Representative</h3>
                                <div className="flex items-start gap-4">
                                    <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shadow-md">
                                        JW
                                    </div>
                                    <div className="flex flex-col space-y-1">
                                        <span className="text-lg font-bold text-gray-900">Jeff Wojcicki</span>

                                        {/* <a href="tel:416-674-2123" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                                            <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                            416-674-2123
                                        </a> */}

                                        <a href="mailto:jeffw@curtisint.com" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors pt-1">
                                            <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                            jeffw@curtisint.com
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Continue Button for Individual */}
                        {selection === 'individual' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <button
                                    onClick={handleRouting}
                                    className="w-full group flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white font-bold text-lg rounded-xl shadow-md hover:bg-blue-700 transition-all focus:outline-none focus:ring-4 focus:ring-blue-500/50"
                                >
                                    Continue to Form
                                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                                </button>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    )
}