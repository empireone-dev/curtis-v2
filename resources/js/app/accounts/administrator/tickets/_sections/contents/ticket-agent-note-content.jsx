import React, { useState } from 'react';
import { MessageSquare, Plus, Loader2, CheckCircle2 } from 'lucide-react';

export default function TicketAgentNoteContent({ props_data }) {
    const ticketData = props_data?.ticket || props_data || {};

    // States
    const [agentNotes, setAgentNotes] = useState(
        props_data?.agent_notes ||
        ticketData?.agent_notes ||
        'Customer reported cooling failure after sudden power outage. Serial code validated with regional distributor. Compressor failure suspected.'
    );
    const [lastSaved, setLastSaved] = useState('Just now');
    const [isSaving, setIsSaving] = useState(false);

    // Handlers
    const insertQuickTag = (tag) => {
        setAgentNotes((prev) => `${prev}\n[TAG: ${tag}]`);
    };

    const handleSaveNotes = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            setLastSaved(new Date().toLocaleTimeString());
        }, 450);
    };

    const wordCount = agentNotes.trim() ? agentNotes.trim().split(/\s+/).length : 0;

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
                        <MessageSquare className="w-5 h-5 text-blue-600" /> Agent Technical Notes & Diagnosis
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                        Write a detailed explanation of the defect or issue found during intake review.
                    </p>
                </div>

                {/* Quick Defect Tags */}
                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                        Quick Defect Tags
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {[
                            'Cooling Issue',
                            'Compressor Defect',
                            'Power Supply Failure',
                            'Proof of Purchase Verified',
                            'Refrigerant Leak',
                            'Technician Dispatch Required'
                        ].map((tag) => (
                            <button
                                key={tag}
                                onClick={() => insertQuickTag(tag)}
                                className="px-3 py-1.5 text-xs bg-slate-100 hover:bg-blue-100 hover:text-blue-700 font-semibold text-slate-700 rounded-xl transition border border-slate-200 flex items-center gap-1.5 cursor-pointer"
                            >
                                <Plus className="w-3.5 h-3.5 text-slate-500" /> {tag}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Notes Textarea */}
                <div className="space-y-3">
                    <textarea
                        rows={7}
                        value={agentNotes}
                        onChange={(e) => setAgentNotes(e.target.value)}
                        placeholder="Write a detailed explanation of the defect/issue..."
                        className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                    />

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-4 text-xs text-slate-400">
                            <span>
                                Word Count: <strong className="text-slate-700">{wordCount}</strong> words
                            </span>
                            <span>Auto-saved: {lastSaved}</span>
                        </div>

                        <button
                            onClick={handleSaveNotes}
                            disabled={isSaving}
                            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-md shadow-blue-500/20 transition flex items-center gap-2 justify-center cursor-pointer disabled:opacity-50"
                        >
                            {isSaving ? (
                                <Loader2 className="w-4 h-4 animate-spin text-white" />
                            ) : (
                                <CheckCircle2 className="w-4 h-4 text-white" />
                            )}
                            <span>Save Agent Notes</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}