import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';

const StepperSection = () => {
    const { ticket } = useSelector((store) => store.app);
    console.log('ticket', ticket?.activities);

    const activities = [
        ...(ticket?.activities || []),
        ...(ticket ? [{
            type: ticket.status,
            created_at: ticket.updated_at, 
            message: null              
        }] : [])
    ];
    const activitiesCount = activities?.length || 0;
    return (
        <div className="max-w-2xl">
            
            <div className="relative border-l-2 border-gray-200">
                {activities?.map((step, index) => {
                    // Changed variable name to 'activityData' to prevent shadowing the outer 'ticket' state
                    const activityData = JSON.parse(step.message);
                    const isLast = index === activitiesCount - 1;

                    return (
                        <div key={index} className="ml-8 relative group py-3">
                            <span
                                className={`absolute -left-[50px] flex items-center justify-center w-8 h-8 rounded-full ring-4 ring-white transition-colors duration-300 ${isLast ? 'bg-gray-400' : 'bg-blue-600'
                                    }`}
                            >
                                {/* Only render the checkmark if it is NOT the last item */}
                                {!isLast ? (
                                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                ) : (
                                    // Optional: Render a small dot instead of a checkmark for the current/last step
                                    <div className="w-2 h-2 bg-white rounded-full" />
                                )}
                            </span>
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                                <div>
                                    <h3 className="font-semibold text-lg text-gray-900">
                                        {step.type} {activityData?.data?.status ?? ''}
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-700">
                                        {moment(step.created_at).format('LLL')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default StepperSection;