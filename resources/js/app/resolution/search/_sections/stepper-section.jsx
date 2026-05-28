import React, { useState } from 'react';

const StepperSection = () => {
    // Simulate the current status of the ticket (0 = first step)
    const [currentStep, setCurrentStep] = useState(1);

    // Define your ticket phases
    const steps = [
        {
            title: "Ticket Submitted",
            description: "Customer submitted the warranty/parts claim via the online portal.",
            date: "May 25, 2026 - 10:15 AM",
        },
        {
            title: "Under Review",
            description: "Our support team is reviewing the uploaded documents and photos.",
            date: "May 26, 2026 - 09:30 AM",
        },
        {
            title: "Parts Ordered",
            description: "Required parts have been identified and requested from the warehouse.",
            date: "Pending",
        },
        {
            title: "Shipped",
            description: "Replacement parts are on the way to the customer.",
            date: "Pending",
        },
        {
            title: "Resolved",
            description: "Ticket closed successfully.",
            date: "Pending",
        },
    ];

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep((prev) => prev + 1);
        }
    };

    const handleReset = () => {
        setCurrentStep(0);
    };

    return (
        <div className="max-w-2xl">
            <div className="relative border-l-2 border-gray-200">
                {steps.map((step, index) => {
                    // Determine the state of the current mapped step
                    const isCompleted = index < currentStep;
                    const isCurrent = index === currentStep;
                    const isPending = index > currentStep;

                    return (
                        <div key={index} className=" ml-8 relative group">
                            {/* Timeline Marker (Circle) */}
                            <span
                                className={`absolute -left-[50px] flex items-center justify-center w-8 h-8 rounded-full ring-4 ring-white transition-colors duration-300 ${isCompleted
                                    ? "bg-blue-600"
                                    : isCurrent
                                        ? "bg-blue-100 border-2 border-blue-600"
                                        : "bg-gray-100 border-2 border-gray-300"
                                    }`}
                            >
                                {isCompleted ? (
                                    // Checkmark for completed steps
                                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                ) : isCurrent ? (
                                    // Inner dot for the current active step
                                    <span className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-pulse" />
                                ) : null}
                            </span>

                            {/* Step Content */}
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                                <div>
                                    <h3
                                        className={`font-semibold text-lg ${isCompleted || isCurrent ? "text-gray-900" : "text-gray-400"
                                            }`}
                                    >
                                        {step.title}
                                    </h3>
                                    <p className={`mt-1 text-sm ${isCurrent ? "text-gray-700" : "text-gray-500"}`}>
                                        {step.description}
                                    </p>
                                </div>

                                {/* Date/Time Badge */}
                                <span
                                    className={`mt-2 sm:mt-0 whitespace-nowrap text-xs font-medium px-2.5 py-1 rounded-full ${isPending
                                        ? "bg-gray-100 text-gray-500"
                                        : "bg-blue-50 text-blue-700"
                                        }`}
                                >
                                    {step.date}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default StepperSection;