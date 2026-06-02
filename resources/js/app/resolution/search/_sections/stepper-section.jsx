import moment from 'moment';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const StepperSection = () => {
    const { ticket } = useSelector((store) => store.app)
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

    console.log('ticket', ticket?.activities)

    const handleReset = () => {
        setCurrentStep(0);
    };

    return (
        <div className="max-w-2xl">
            <div className='text-center font-black text-2xl'>
                TICKET ID: {ticket?.ticket_id}
            </div>
            <div className="relative border-l-2 border-gray-200">
                {ticket?.activities?.map((step, index) => {
                    const ticket = JSON.parse(step.message);
                    return (
                        <div key={index} className=" ml-8 relative group py-3">
                            <span
                                className={`absolute -left-[50px] flex items-center justify-center w-8 h-8 rounded-full ring-4 ring-white transition-colors duration-300 bg-blue-600`}
                            >
                                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            </span>
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                                <div>
                                    <h3
                                        className={`font-semibold text-lg text-gray-900`}
                                    >
                                        {step.type} {ticket?.data?.status ?? ''}
                                    </h3>
                                    <p className={`mt-1 text-sm text-gray-700`}>
                                        {moment(step.created_at).format('LLL')}
                                    </p>
                                </div>

                                {/* <span
                                    className={`mt-2 sm:mt-0 whitespace-nowrap text-xs font-medium px-2.5 py-1 rounded-full bg-blue-50 text-blue-700`}
                                >
                                    {step.date}
                                </span> */}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default StepperSection;