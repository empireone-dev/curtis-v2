import React from "react";
import HeaderSection from "./_sections/header-section";
import FormSection from "./_sections/form-section";

const Page = () => {
    return (
        <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4 sm:p-8 font-sans">
            {/* Main Card Container (Forced Vertical) */}
            <div className="flex flex-col w-full max-w-[450px] bg-white rounded-[2rem] shadow-2xl overflow-hidden">
                {/* Top Panel (Blue Gradient) */}
                <HeaderSection />

                {/* Bottom Panel (White Form) */}
                <div className="w-full p-8 sm:p-10 flex flex-col justify-center bg-white z-10">
                    <FormSection />
                </div>
            </div>
        </div>
    );
};

export default Page;
