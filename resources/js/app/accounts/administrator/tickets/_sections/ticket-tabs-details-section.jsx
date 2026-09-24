import React, { useState } from 'react';
import {
    Clock,
    Folder,
    ListTodo,
    MessageSquare,
    X,
} from 'lucide-react';
import TicketFilesContent from './contents/ticket-files-content';
import TicketActivitiesContent from './contents/ticket-activities-content';
import TicketDetailsContent from './contents/ticket-details-content';
import TicketAgentNoteContent from './contents/ticket-agent-note-content';

export default function TicketTabsDetailsSection({ props_data }) {
    const [activeTab, setActiveTab] = useState('files');
    const [lightboxImage, setLightboxImage] = useState(null);

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden">
            {/* Inline CSS animation styles for fallback guaranteed transition */}
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

            {/* Navigation Tabs Header */}
            <div className="border-b border-slate-200 bg-slate-50/50 px-4 sm:px-6 pt-3">
                <div className="flex space-x-2 sm:space-x-6 overflow-x-auto">
                    <button
                        onClick={() => setActiveTab('files')}
                        className={`pb-3 px-3 text-sm font-semibold border-b-2 transition-all duration-200 flex items-center gap-2 whitespace-nowrap ${activeTab === 'files'
                            ? 'border-blue-600 text-blue-600'
                            : 'border-transparent text-slate-500 hover:text-slate-800'
                            }`}
                    >
                        <Folder className="w-4 h-4" />
                        <span>Files</span>
                        <span className="px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-700 font-bold transition-all">
                            {props_data?.files?.length}
                        </span>
                    </button>

                    <button
                        onClick={() => setActiveTab('activities')}
                        className={`pb-3 px-3 text-sm font-semibold border-b-2 transition-all duration-200 flex items-center gap-2 whitespace-nowrap ${activeTab === 'activities'
                            ? 'border-blue-600 text-blue-600'
                            : 'border-transparent text-slate-500 hover:text-slate-800'
                            }`}
                    >
                        <Clock className="w-4 h-4" />
                        <span>Activities</span>
                        <span className="px-2 py-0.5 text-xs rounded-full bg-slate-200 text-slate-700 font-bold transition-all">
                            {props_data?.activities?.length}
                        </span>
                    </button>

                    <button
                        onClick={() => setActiveTab('details')}
                        className={`pb-3 px-3 text-sm font-semibold border-b-2 transition-all duration-200 flex items-center gap-2 whitespace-nowrap ${activeTab === 'details'
                            ? 'border-blue-600 text-blue-600'
                            : 'border-transparent text-slate-500 hover:text-slate-800'
                            }`}
                    >
                        <ListTodo className="w-4 h-4" />
                        <span>Details</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('notes')}
                        className={`pb-3 px-3 text-sm font-semibold border-b-2 transition-all duration-200 flex items-center gap-2 whitespace-nowrap ${activeTab === 'notes'
                            ? 'border-blue-600 text-blue-600'
                            : 'border-transparent text-slate-500 hover:text-slate-800'
                            }`}
                    >
                        <MessageSquare className="w-4 h-4" />
                        <span>Agent Notes</span>
                    </button>
                </div>
            </div>

            {/* Tab Content Panes Container */}
            <div className="p-5 sm:p-6 min-h-[460px] relative">

                {/* TAB 1: FILES & PROOF */}
                {activeTab === 'files' && (
                    <TicketFilesContent props_data={props_data} />
                )}

                {/* TAB 2: ACTIVITIES & AUDIT LOG */}
                {activeTab === 'activities' && (
                    <TicketActivitiesContent  props_data={props_data} />
                )}

                {/* TAB 3: DETAILS */}
                {activeTab === 'details' && (
                    <TicketDetailsContent props_data={props_data} />
                )}

                {/* TAB 4: AGENT NOTES */}
                {activeTab === 'notes' && (
                  <TicketAgentNoteContent  props_data={props_data}/>
                )}

            </div>

            {/* Lightbox Image Preview Modal */}
            {lightboxImage && (
                <div
                    className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-md"
                    onClick={() => setLightboxImage(null)}
                >
                    <div className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl">
                        <button
                            onClick={() => setLightboxImage(null)}
                            className="absolute top-4 right-4 p-2 bg-black/60 text-white rounded-full hover:bg-black transition"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <img src={lightboxImage} alt="Document Lightbox" className="max-w-full max-h-[85vh] object-contain rounded-xl" />
                    </div>
                </div>
            )}
        </div>
    );
}