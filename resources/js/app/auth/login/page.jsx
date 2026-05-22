import React from "react";
import HeaderSection from "./_sections/header-section";
import FormSection from "./_sections/form-section";


export default function Page() {
    return (
        <div className="min-h-screen bg-gray-200 flex items-center justify-center sm:p-8 font-sans">
            {/* Main Card Container (Forced Vertical) */}
            <div className="flex flex-col w-full bg-white h-[100dvh] overflow-hidden rounded-none shadow-none sm:max-w-[450px] sm:h-full sm:rounded-[2rem] sm:shadow-2xl">
                <HeaderSection />
                {/* Bottom Panel (White Form) */}
                <div className="w-full p-8 sm:p-10 flex flex-col justify-center bg-white z-10">
                    <FormSection />
                </div>
            </div>
        </div>
    )
}