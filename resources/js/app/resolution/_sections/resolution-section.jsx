import { Link } from '@inertiajs/react';
import React from 'react';

export default function ResolutionSection() {
    const sections = [
        {
            id: 'registration',
            label: 'Product Registration',
            description: 'Register your new product to activate your warranty and receive important updates.',
            icon: '📝',
            link: "/resolution/registration",
            is_disabled: true // Currently disabled
        },
        {
            id: 'warranty',
            label: 'Warranty Claim',
            description: 'File a claim for defective or broken items under active warranty coverage.',
            icon: '📋',
            link: "/resolution/warranty/confirmation",
            is_disabled: false
        },
        {
            id: 'parts',
            label: 'Parts Request',
            description: 'Request or replace missing components, hardware, or structural elements.',
            icon: '⚙️',
            link: "/resolution/parts/confirmation",
            is_disabled: false
        },
        {
            id: 'safety_issue',
            label: 'Safety Issue',
            description: 'Report immediate hazards, malfunctions, or critical product design vulnerabilities.',
            icon: '⚠️',
            link: "/resolution/safety_issue/confirmation",
            is_disabled: false
        }
    ];

    return (
        <div className="flex flex-col gap-3 w-full h-full items-center">
            {sections.map((res) => {
                return (
                    <Link
                        key={res.id}
                        as="button" // Forces the Link to render as a button so 'disabled' works
                        type="button"
                        href={res.link}
                        disabled={res.is_disabled}
                        className="w-full flex items-start gap-4 p-4 rounded-xl border-2 border-blue-400 bg-blue-50/70 text-blue-400 outline-none transition-all duration-300 ease-in-out 
                            hover:scale-[1.02] hover:shadow-md hover:bg-blue-100/70 
                            disabled:opacity-60 disabled:cursor-not-allowed disabled:grayscale disabled:hover:scale-100 disabled:hover:shadow-none disabled:hover:bg-blue-50/70"
                    >
                        <span className="text-2xl mt-0.5 flex-shrink-0">{res.icon}</span>
                        <div className="flex flex-col text-left">
                            <span className="text-sm sm:text-base font-semibold tracking-wide text-blue-900 disabled:text-gray-500">
                                {res.label}
                            </span>
                            <span className="text-xs mt-1 leading-relaxed transition-colors duration-200 text-blue-600/90 disabled:text-gray-400">
                                {res.description}
                            </span>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}