import React from 'react';
import { ListTodo, Headphones, Copy, Wrench, CheckCircle2 } from 'lucide-react';

export default function TicketDetailsContent({ props_data }) {
    // Dynamic Safe Extractor
    const ticketData = props_data?.ticket || props_data || {};

    const getFullName = () => {
        const fname = ticketData?.fname || ticketData?.user?.fname || ticketData?.customer?.fname || '';
        const lname = ticketData?.lname || ticketData?.user?.lname || ticketData?.customer?.lname || '';
        const name = `${fname} ${lname}`.trim();
        return name || ticketData?.fullname || 'Marcus Vance';
    };

    const copyToClipboard = (text) => {
        if (text) {
            navigator.clipboard.writeText(text);
        }
    };

    return (
        <div>
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
                        <ListTodo className="w-5 h-5 text-blue-600" /> Detailed Specifications
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                        Verified customer profile and appliance warranty information.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Customer Card */}
                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                                <Headphones className="w-4 h-4 text-slate-600" /> Customer Contact Info
                            </h4>
                            <button
                                onClick={() => copyToClipboard(getFullName())}
                                className="text-xs text-blue-600 hover:underline flex items-center gap-1 font-semibold"
                            >
                                <Copy className="w-3.5 h-3.5" /> Copy Data
                            </button>
                        </div>

                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between border-b border-slate-200/60 pb-2">
                                <span className="text-slate-500">Full Name</span>
                                <span className="font-bold text-slate-800">{getFullName()}</span>
                            </div>
                            <div className="flex justify-between border-b border-slate-200/60 pb-2">
                                <span className="text-slate-500">Email Address</span>
                                <span className="font-bold text-blue-600">
                                    {ticketData?.email}
                                </span>
                            </div>

                            <div className="flex justify-between border-b border-slate-200/60 pb-2">
                                <span className="text-slate-500">Phone Number</span>
                                <span className="font-bold text-slate-800">
                                    {ticketData?.phone}
                                </span>
                            </div>
                            <div className="flex justify-between border-b border-slate-200/60 pb-2">
                                <span className="text-slate-500">Phone Number 2</span>
                                <span className="font-bold text-slate-800">
                                    {ticketData?.phone2}
                                </span>
                            </div>

                            <div className="flex justify-between border-b border-slate-200/60 pb-2">
                                <span className="text-slate-500">Physical Address</span>
                                <span className="font-bold text-slate-800 text-right max-w-[200px]">
                                    {`${ticketData?.address ?? ''} ${ticketData?.city ?? ''} ${ticketData?.state ?? ''} ${ticketData?.zip_code ?? ''}`}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500">Mailing Address</span>
                                <span className="font-bold text-slate-800 text-right max-w-[200px]">
                                    {`${ticketData?.address2 ?? ''} ${ticketData?.city2 ?? ''} ${ticketData?.state2 ?? ''} ${ticketData?.zip_code2 ?? ''}`}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Appliance Specs Card */}
                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                                <Wrench className="w-4 h-4 text-slate-600" /> Product & Warranty Metadata
                            </h4>
                        </div>

                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between border-b border-slate-200/60 pb-2">
                                <span className="text-slate-500">Product</span>
                                <span className="font-bold text-slate-800">
                                    {ticketData?.unit}
                                </span>
                            </div>
                             <div className="flex justify-between border-b border-slate-200/60 pb-2">
                                <span className="text-slate-500">Brand</span>
                                <span className="font-mono font-bold text-slate-800">
                                    {ticketData?.brand}
                                </span>
                            </div>
                            <div className="flex justify-between border-b border-slate-200/60 pb-2">
                                <span className="text-slate-500">Model Number</span>
                                <span className="font-mono font-bold text-slate-800">
                                    {ticketData?.item_number}
                                </span>
                            </div>
                            <div className="flex justify-between border-b border-slate-200/60 pb-2">
                                <span className="text-slate-500">Serial Number</span>
                                <span className="font-mono font-bold text-slate-800">
                                    {ticketData?.serial_number}
                                </span>
                            </div>
                            <div className="flex justify-between border-b border-slate-200/60 pb-2">
                                <span className="text-slate-500">Class</span>
                                <span className="font-bold text-slate-800">
                                    {ticketData?.class}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500">Warranty Status</span>
                                <span className="font-bold text-emerald-600 flex items-center gap-1">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> {ticketData?.call_type}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}