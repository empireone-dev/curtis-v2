import React, { useState } from 'react';

export default function HeaderSection() {
    return (
           <div className="text-center">
                <span className="text-sm font-bold tracking-wider text-blue-600 uppercase mb-2 block drop-shadow-sm">
                    Unit Lookup
                </span>
                <h2 className="text-2xl font-semibold text-gray-800">
                    Enter Serial Number
                </h2>
                <p className="text-gray-500 mt-2 text-sm leading-relaxed">
                    Please provide the serial number to retrieve the customer's active registration details.
                </p>
                
                    <span className="text-gray-400 text-xs mt-2 ml-1">
                        Note: Must be 16 characters total, starting with the letter 'A'.
                    </span>
            </div>
    );
}