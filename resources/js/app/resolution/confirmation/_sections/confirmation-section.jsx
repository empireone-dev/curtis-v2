import { router } from '@inertiajs/react';
import React, { useState } from 'react';

export default function ConfirmationSection() {
    return (
        <div>
            <div className="text-center mb-8">
                <span className="text-sm font-bold tracking-wider text-blue-800 uppercase mb-2 block drop-shadow-sm">
                    Customer Intake
                </span>
                <h2 className="text-2xl font-semibold text-blue-800">
                    "Have you already registered your unit?"
                </h2>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full">
                <button
                    type="button"
                    onClick={() => router.visit('/resolution/verification')}
                    className={`
            flex-1 py-4 px-6 rounded-xl border-2 text-lg font-semibold tracking-wide 
            transition-all duration-300 ease-in-out outline-none shadow-md scale-[1.02]
            border-blue-400 bg-gradient-to-b from-blue-50 to-blue-100 text-blue-700 
            hover:from-blue-100 hover:to-blue-200 hover:border-blue-500 hover:shadow-lg hover:scale-105
        `}
                >
                    YES
                </button>

                <button
                    onClick={() => router.visit('/resolution/warranty/blank')}
                    type="button"
                    className={`
            flex-1 py-4 px-6 rounded-xl border-2 text-lg font-semibold tracking-wide 
            transition-all duration-300 ease-in-out outline-none shadow-md scale-[1.02]
            border-gray-400 bg-gradient-to-b from-gray-50 to-gray-100 text-blue-700 
            hover:from-gray-100 hover:to-gray-200 hover:border-gray-500 hover:shadow-lg hover:scale-105
        `}
                >
                    NO
                </button>
            </div>


        </div>
    );
}