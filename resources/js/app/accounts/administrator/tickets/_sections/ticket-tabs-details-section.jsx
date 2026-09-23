import React, { useState } from 'react';
import {
    CheckCircle2,
    Clock,
    Folder,
    ImageIcon,
    ListTodo,
    MessageSquare,
    Upload,
    FileText,
    Headphones,
    Wrench,
    Plus,
    Trash2,
    Copy,
    X,
    Loader2
} from 'lucide-react';
import TicketFilesContent from './contents/ticket-files-content';
import TicketActivitiesContent from './contents/ticket-activities-content';
import TicketDetailsContent from './contents/ticket-details-content';
import TicketAgentNoteContent from './contents/ticket-agent-note-content';

export default function TicketTabsDetailsSection({ props_data }) {
    const [activeTab, setActiveTab] = useState('files');
    const [lightboxImage, setLightboxImage] = useState(null);

    // Dynamic Safe Extractors
    const ticketData = props_data?.ticket || props_data || {};

    const getFullName = () => {
        const fname = ticketData?.fname || ticketData?.user?.fname || ticketData?.customer?.fname || '';
        const lname = ticketData?.lname || ticketData?.user?.lname || ticketData?.customer?.lname || '';
        const name = `${fname} ${lname}`.trim();
        return name || ticketData?.fullname || 'Marcus Vance';
    };

    // Checklist State
    const [checklist, setChecklist] = useState({
        storeName: true,
        purchaseDate: true,
        itemDesc: true,
        unitPrice: false,
        totalPaid: true
    });

    // File Attachments State
    const [files, setFiles] = useState(props_data?.files || ticketData?.files || [
        {
            id: 1,
            name: 'Bill_Of_Sale_Receipt_BestBuy.png',
            size: '2.4 MB',
            type: 'image',
            url: 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?auto=format&fit=crop&q=80&w=800',
            status: 'Verified',
            uploadedAt: 'Yesterday 14:22'
        },
        {
            id: 2,
            name: 'Fridge_Serial_Number_Plate.jpg',
            size: '1.8 MB',
            type: 'image',
            url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800',
            status: 'Pending Review',
            uploadedAt: 'Yesterday 14:25'
        }
    ]);

    // Audit Activities State
    const [activities, setActivities] = useState([
        { id: 1, user: 'System Intake', text: 'Case File created via Web Form intake portal', time: '1 day ago', type: 'system' },
        { id: 2, user: `${getFullName()} (Customer)`, text: 'Uploaded proof of purchase bill of sale and serial plate photo', time: '1 day ago', type: 'customer' },
        { id: 3, user: 'Support Agent', text: 'Verified Store Name and Purchase Date validity on receipt', time: '2 hours ago', type: 'agent' }
    ]);

    // Agent Technical Notes State
    const [agentNotes, setAgentNotes] = useState(
        ticketData?.agent_notes || 'Customer reported cooling failure after sudden power outage. Serial code validated with regional distributor. Compressor failure suspected.'
    );
    const [lastSaved, setLastSaved] = useState('Just now');
    const [isSaving, setIsSaving] = useState(false);

    // Event Handlers
    const toggleChecklist = (key) => {
        setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleFileUpload = (e) => {
        const uploadedFiles = Array.from(e.target.files || []);
        if (uploadedFiles.length === 0) return;

        uploadedFiles.forEach(f => {
            const newFile = {
                id: Date.now() + Math.random(),
                name: f.name,
                size: `${(f.size / (1024 * 1024)).toFixed(1)} MB`,
                type: f.type.includes('image') ? 'image' : 'document',
                url: URL.createObjectURL(f),
                status: 'Pending Review',
                uploadedAt: 'Just now'
            };
            setFiles(prev => [newFile, ...prev]);
        });
    };

    const deleteFile = (id) => {
        setFiles(prev => prev.filter(f => f.id !== id));
    };

    const toggleFileStatus = (id) => {
        setFiles(prev => prev.map(f => {
            if (f.id === id) {
                return { ...f, status: f.status === 'Verified' ? 'Pending Review' : 'Verified' };
            }
            return f;
        }));
    };

    const insertQuickTag = (tag) => {
        setAgentNotes(prev => `${prev}\n[TAG: ${tag}]`);
    };

    const handleSaveNotes = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            setLastSaved(new Date().toLocaleTimeString());
        }, 450);
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
    };

    const wordCount = agentNotes.trim() ? agentNotes.trim().split(/\s+/).length : 0;

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
                            {files.length}
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
                            {activities.length}
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