import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import moment from 'moment';

export default function TicketActivitiesContent({ props_data }) {
    const ticketData = props_data?.ticket || props_data || {};

    const getFullName = () => {
        const fname = ticketData?.fname || ticketData?.user?.fname || ticketData?.customer?.fname || '';
        const lname = ticketData?.lname || ticketData?.user?.lname || ticketData?.customer?.lname || '';
        const name = `${fname} ${lname}`.trim();
        return name || ticketData?.fullname || 'Marcus Vance';
    };

    // Activities State with default fallback data
    const [activities, setActivities] = useState(props_data?.activities);

    useEffect(() => {
        setActivities(props_data?.activities

        )
    }, [props_data?.activities?.length])
    return (
        <>
            <style>{`
                @keyframes tabFadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(6px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .tab-content-anim {
                    animation: tabFadeIn 250ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
            `}</style>

            <div className="tab-content-anim space-y-6">
                <div>
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-blue-600" /> Activities & Audit History
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                        Real-time timeline of case updates, stage changes, and agent entries.
                    </p>
                </div>

                <div className="relative pl-6 border-l-2 border-slate-200 space-y-6 my-4">
                    {activities.map(item => (
                        <div key={item.id} className="relative group">
                            <div className={`absolute -left-[31px] top-0 w-4 h-4 rounded-full ring-4 ring-white ${item.type === 'agent' ? 'bg-blue-600' : item.type === 'customer' ? 'bg-emerald-500' : 'bg-slate-400'
                                }`}></div>

                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                <div className="flex justify-between items-center text-xs text-slate-500 mb-1">
                                    <span className="font-bold text-slate-700">{item?.user?.name ?? 'Customer'}</span>
                                    <span>{moment(item.created_at).format('LLL')}</span>
                                </div>
                                <p className="text-sm font-medium text-slate-800">{item.type}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}