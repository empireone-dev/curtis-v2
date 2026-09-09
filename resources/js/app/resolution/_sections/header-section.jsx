import React, { useState, useRef, useEffect } from "react";
import { languages } from "@/app/_json/languages.json";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedLang } from "@/app/_redux/app-slice";

export default function HeaderSection({ title = '' }) {
    const call_type = typeof window !== 'undefined' ? window.location.pathname?.split('/')[2]?.replace('_', ' ') : '';
    const dispatch = useDispatch();
    const { selectedLang } = useSelector((store) => store.app);

    const [isLangOpen, setIsLangOpen] = useState(false);
    const dropdownRef = useRef(null);

    // 1. LOAD FROM LOCAL STORAGE ON MOUNT
    useEffect(() => {
        const savedLang = localStorage.getItem("selectedLang");
        if (savedLang) {
            try {
                dispatch(setSelectedLang(JSON.parse(savedLang)));
            } catch (error) {
                console.warn("Failed to parse saved language", error);
            }
        }
    }, [dispatch]);

    // Close dropdown when clicking outside of it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsLangOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLanguageSelect = (lang) => {
        // 2. UPDATE REDUX
        dispatch(setSelectedLang(lang));

        // 3. SAVE TO LOCAL STORAGE
        localStorage.setItem("selectedLang", JSON.stringify(lang));

        setIsLangOpen(false);
        console.log(`Language changed to: ${lang.code}`);
    };

    return (
        <div className="relative w-full bg-gradient-to-b from-blue-700 to-blue-500 text-white p-10 flex flex-col items-center justify-between text-center min-h-[300px] overflow-visible">

            {/* --- Interactive Language Selector (Top Right) --- */}
            <div className="absolute top-6 right-6 z-50" ref={dropdownRef}>
                <button
                    onClick={() => setIsLangOpen(!isLangOpen)}
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full backdrop-blur-sm transition-all duration-300 text-white text-sm font-medium shadow-sm"
                >
                    {/* Globe Icon */}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
                    </svg>
                    {selectedLang.label}
                    {/* Chevron Icon */}
                    <svg className={`w-4 h-4 transition-transform duration-300 ${isLangOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </button>

                {/* Dropdown Menu */}
                <div
                    className={`absolute right-0 mt-3 w-40 bg-white rounded-xl shadow-2xl py-2 transform origin-top-right transition-all duration-200 border border-gray-100 ${isLangOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'
                        }`}
                >
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => handleLanguageSelect(lang)}
                            className={`w-full text-left px-4 py-2.5 text-sm transition-colors duration-150 flex items-center justify-between ${selectedLang.code === lang.code
                                ? 'bg-blue-50 text-blue-700 font-semibold'
                                : 'text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            {lang.label}
                            {/* Checkmark for active language */}
                            {selectedLang.code === lang.code && (
                                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                            )}
                        </button>
                    ))}
                </div>
            </div>
            {/* ----------------------------------------------- */}

            {/* Existing Header Content */}
            <div className="z-10 mt-4">
                <div className="w-72 px-3 h-24 bg-white rounded-tr-3xl rounded-bl-3xl flex items-center justify-center mx-auto mb-4 shadow-lg animate-fade-in-down">
                    <img src="/images/logo.png" alt="Logo" className="max-h-full" />
                </div>
                <h1 className="text-2xl font-bold tracking-wide animate-fade-in [animation-delay:200ms]">
                    {title}
                </h1>
            </div>

            <div className="text-[16px] tracking-widest text-blue-200 uppercase flex space-x-3 z-10 mb-8 animate-fade-in-up [animation-delay:400ms]">
                <span>Customer {call_type === "safety issue" ? "Safety Concern" : call_type ?? ''}</span>
            </div>

            {/* Wave SVG Background */}
            <div className="absolute bottom-0 left-0 w-full h-16 animate-wave-rise z-0">
                <svg
                    viewBox="0 0 800 100"
                    preserveAspectRatio="none"
                    className="h-full w-full fill-white"
                >
                    <path
                        d="M0,100 L800,100 L800,20 C750,40 700,90 650,60 C600,30 550,80 500,50 C450,20 400,70 350,40 C300,10 250,60 200,40 C150,20 100,70 50,40 C0,10 0,100 0,100 Z"
                        opacity="0.4"
                    />
                    <path
                        d="M0,100 L800,100 L800,40 C750,60 700,110 650,80 C600,50 550,100 500,70 C450,40 400,90 350,60 C300,30 250,80 200,60 C150,40 100,90 50,60 C0,30 0,100 0,100 Z"
                        opacity="0.7"
                    />
                    <path d="M0,100 L800,100 L800,60 C750,80 700,130 650,100 C600,70 550,120 500,90 C450,60 400,110 350,80 C300,50 250,100 200,80 C150,60 100,110 50,80 C0,50 0,100 0,100 Z" />
                </svg>
            </div>
        </div>
    );
}