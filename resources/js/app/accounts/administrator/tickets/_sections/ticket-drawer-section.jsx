import Drawer from '@/app/_components/drawer';
import React, { useState } from 'react';
import {
    FileText,
    Wrench,
    ArrowLeftRight,
    RefreshCw,
    CheckCircle2,
    Image as ImageIcon,
    Folder,
    FolderOpen,
    Clock,
    MessageSquare,
    Headphones,
    Info,
    Plus,
    Upload,
    ListTodo,
    Copy,
    Trash2,
    X,
    Loader2
} from 'lucide-react';
import TicketTabsDetailsSection from './ticket-tabs-details-section';

const WORKFLOW_STEPS = [
    { id: 'Submitted', label: 'Submitted', desc: 'Intake Completed' },
    { id: 'Validation', label: 'Validation', desc: 'Proof Verified' },
    { id: 'Repair', label: 'Repair', desc: 'Tech Dispatch' },
    { id: 'Resolution', label: 'Resolution', desc: 'Refund / Swap' },
    { id: 'Closed', label: 'Closed', desc: 'Archived' }
];

function TicketDrawerContent({ ticket, getFullName, getIssueText }) {
    const [status, setStatus] = useState(ticket?.status || 'Information Completed');
    const [currentStepIndex, setCurrentStepIndex] = useState(1);

    // Modal, Toast & Lightbox states
    const [modalConfig, setModalConfig] = useState({ open: false, type: '', title: '', Icon: null });
    const [modalRemark, setModalRemark] = useState('');
    const [toast, setToast] = useState(null);
    const [lightboxImage, setLightboxImage] = useState(null);


    // Audit activity logs
    const [activities, setActivities] = useState([
        { id: 1, user: 'System Intake', text: 'Case File created via Web Form intake portal', time: '1 day ago', type: 'system' },
        { id: 2, user: `${getFullName()} (Customer)`, text: 'Uploaded proof of purchase bill of sale and serial plate photo', time: '1 day ago', type: 'customer' },
        { id: 3, user: 'Support Agent', text: 'Verified Store Name and Purchase Date validity on receipt', time: '2 hours ago', type: 'agent' }
    ]);

    const showToast = (message, type = 'info') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3200);
    };

    const addActivity = (text, user = 'Support Specialist', type = 'agent') => {
        setActivities(prev => [
            { id: Date.now(), user, text, time: 'Just now', type },
            ...prev
        ]);
    };

    const handleWorkflowAction = (actionType) => {
        let title = `Move Case to ${actionType}`;
        let Icon = CheckCircle2;

        if (actionType === 'Repair') Icon = Wrench;
        else if (actionType === 'Refund') Icon = ArrowLeftRight;
        else if (actionType === 'Replacement') Icon = RefreshCw;
        else if (actionType === 'Validation') Icon = CheckCircle2;
        else if (actionType === 'Resource') Icon = Folder;

        setModalConfig({
            open: true,
            type: actionType,
            title,
            Icon
        });
    };

    const confirmWorkflowAction = () => {
        const action = modalConfig.type;
        setStatus(action);

        if (action === 'Validation') setCurrentStepIndex(1);
        else if (action === 'Repair') setCurrentStepIndex(2);
        else if (action === 'Refund' || action === 'Replacement') setCurrentStepIndex(3);
        else if (action === 'Resource') setCurrentStepIndex(4);

        const remarkText = modalRemark.trim() ? ` (Remark: "${modalRemark}")` : '';
        addActivity(`Transitioned case status to [${action}]${remarkText}`);
        showToast(`Case status updated to ${action}`, 'success');

        setModalConfig({ ...modalConfig, open: false });
        setModalRemark('');
    };


  
    const copyToClipboard = (text, label = 'Text') => {
        navigator.clipboard.writeText(text);
        showToast(`${label} copied to clipboard!`, 'success');
    };

    const ticketId = ticket?.ticket_id || ticket?.id || 'CF060826173956';
    const issueExplanation = getIssueText();

    return (
        <div className="space-y-6">

            {/* Top Banner Card with Action Workflow */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-5 lg:p-6 transition-all">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                    <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 uppercase tracking-wider flex items-center gap-1.5">
                                <FileText className="w-3.5 h-3.5" /> {ticket?.source || 'WEB FORM'}
                            </span>
                            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                                Status: {status}
                            </span>
                            <span className="text-xs text-slate-400 flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5" /> Active
                            </span>
                        </div>

                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                                Case File : <span className="text-blue-600 font-mono">{ticketId}</span>
                            </h1>
                            <button
                                onClick={() => copyToClipboard(ticketId, "Case ID")}
                                className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition"
                                title="Copy Case ID"
                            >
                                <Copy className="w-4 h-4" />
                            </button>
                        </div>

                        <p className="text-xs text-slate-500 flex items-center gap-1.5">
                            <FolderOpen className="w-3.5 h-3.5 text-slate-400" /> Processed Ticket: <span className="font-semibold text-slate-700">{ticket?.ticketName || 'CF-Warranty Claim'}</span>
                        </p>
                    </div>

                    {/* Workflow Action Buttons */}
                    <div className="flex flex-wrap items-center gap-2 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                        <button
                            onClick={() => handleWorkflowAction('Resource')}
                            className="flex items-center gap-2 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition shadow-sm"
                        >
                            <Folder className="w-4 h-4 text-slate-600" />
                            <span>Move to Resource</span>
                        </button>

                        <button
                            onClick={() => handleWorkflowAction('Repair')}
                            className="flex items-center gap-2 px-3.5 py-2 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-semibold rounded-xl transition shadow-sm"
                        >
                            <Wrench className="w-4 h-4 text-amber-600" />
                            <span>Move to Repair</span>
                        </button>

                        <button
                            onClick={() => handleWorkflowAction('Refund')}
                            className="flex items-center gap-2 px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-semibold rounded-xl transition shadow-sm"
                        >
                            <ArrowLeftRight className="w-4 h-4 text-emerald-600" />
                            <span>Move to Refund</span>
                        </button>

                        <button
                            onClick={() => handleWorkflowAction('Replacement')}
                            className="flex items-center gap-2 px-3.5 py-2 bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200 text-xs font-semibold rounded-xl transition shadow-sm"
                        >
                            <RefreshCw className="w-4 h-4 text-purple-600" />
                            <span>Move to Replacement</span>
                        </button>

                        <button
                            onClick={() => handleWorkflowAction('Validation')}
                            className="flex items-center gap-2 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition shadow-md shadow-blue-500/20"
                        >
                            <CheckCircle2 className="w-4 h-4 text-white" />
                            <span>Move to Validation</span>
                        </button>
                    </div>
                </div>

                {/* Dynamic Workflow Progress Stepper */}
                <div className="mt-6 pt-6 border-t border-slate-100">
                    <div className="relative">
                        <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 -translate-y-1/2 z-0"></div>

                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 relative z-10">
                            {WORKFLOW_STEPS.map((step, idx) => {
                                const isCompleted = idx < currentStepIndex;
                                const isCurrent = idx === currentStepIndex;

                                return (
                                    <div key={step.id} className="flex flex-col items-center text-center group">
                                        <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all shadow-sm ${isCompleted
                                            ? 'bg-emerald-500 text-white ring-4 ring-emerald-100'
                                            : isCurrent
                                                ? 'bg-blue-600 text-white ring-4 ring-blue-100 scale-110'
                                                : 'bg-slate-200 text-slate-500'
                                            }`}>
                                            {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                                        </div>
                                        <div className="mt-2">
                                            <div className={`text-xs font-bold ${isCurrent ? 'text-blue-600' : 'text-slate-700'}`}>
                                                {step.label}
                                            </div>
                                            <div className="text-[10px] text-slate-400 hidden sm:block">{step.desc}</div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Customer Explanation Callout - Solid Blue Header */}
            <div className="bg-blue-600 rounded-2xl text-white p-5 shadow-md relative overflow-hidden">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-blue-100 text-xs font-bold uppercase tracking-wider">
                            <Info className="w-4 h-4 text-blue-100" /> Customer Detailed Explanation:
                        </div>
                        <p className="text-base sm:text-lg font-medium text-white italic leading-relaxed">
                            "{issueExplanation}"
                        </p>
                    </div>
                    <button
                        onClick={() => copyToClipboard(issueExplanation, "Customer Explanation")}
                        className="flex-shrink-0 bg-white/10 hover:bg-white/20 text-white px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition backdrop-blur-sm border border-white/20"
                    >
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Text</span>
                    </button>
                </div>
            </div>

            {/* Main Tabbed Container */}
          <TicketTabsDetailsSection props_data={ticket}/>
            {/* Action Transition Confirmation Modal */}
            {modalConfig.open && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center">
                                {modalConfig.Icon && <modalConfig.Icon className="w-6 h-6 text-slate-700" />}
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-slate-900">{modalConfig.title}</h3>
                                <p className="text-xs text-slate-500">Update ticket processing pipeline stage</p>
                            </div>
                        </div>

                        <p className="text-sm text-slate-600">
                            Are you sure you want to transition Case <span className="font-mono font-bold text-blue-600">{ticketId}</span> to <strong>{modalConfig.type}</strong>?
                        </p>

                        <div className="space-y-1.5">
                            <label className="block text-xs font-semibold text-slate-500">
                                Reason / Remark (Optional)
                            </label>
                            <input
                                type="text"
                                value={modalRemark}
                                onChange={(e) => setModalRemark(e.target.value)}
                                placeholder="e.g. Verified receipt, dispatching technician"
                                className="w-full px-3.5 py-2 text-sm bg-slate-100 rounded-xl border-0 focus:ring-2 focus:ring-blue-500 text-slate-800"
                            />
                        </div>

                        <div className="flex justify-end gap-3 pt-2">
                            <button
                                onClick={() => setModalConfig({ ...modalConfig, open: false })}
                                className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmWorkflowAction}
                                className="px-4 py-2 text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md transition"
                            >
                                Confirm Transition
                            </button>
                        </div>
                    </div>
                </div>
            )}

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

            {/* Floating Toast Notification */}
            {toast && (
                <div className={`fixed bottom-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl text-sm font-semibold text-white transition-all transform animate-bounce ${toast.type === 'success' ? 'bg-emerald-600' : 'bg-slate-800'
                    }`}>
                    <CheckCircle2 className="w-5 h-5 text-white" />
                    <span>{toast.message}</span>
                </div>
            )}

        </div>
    );
}

const SAMPLE_TICKET = {
    id: "CF060826173956",
    ticket_id: "CF060826173956",
    source: "WEB FORM",
    ticketName: "CF-Warranty Claim",
    category: "Refrigeration & Cooling",
    product: "ArcticCool French Door Refrigerator 26 cu. ft.",
    model: "AC-RF26-SLV",
    serial: "SN98320492811A",
    purchaseDate: "2025-11-14",
    store: "Home Appliance Superstore - Chicago, IL",
    unitPrice: "$1,299.99",
    totalPaid: "$1,390.99 (Tax Incl.)",
    warrantyStatus: "Active (2-Year Limited Warranty)",
    fname: "Marcus",
    lname: "Vance",
    email: "m.vance@example.com",
    phone: "+1 (555) 019-2834",
    address: "742 Evergreen Terrace, Springfield, IL 62704",
    issue: "The fridge just stopped working out of nowhere a day ago, it does not cool no more even if its plugged in."
};

export default function TicketDrawerSection({ props_data = SAMPLE_TICKET }) {
    const ticket = props_data || SAMPLE_TICKET;

    if (!ticket) return null;

    // Helpers
    const getFullName = () => {
        const fname = ticket?.fname || ticket?.user?.fname || ticket?.customer?.fname || '';
        const lname = ticket?.lname || ticket?.user?.lname || ticket?.customer?.lname || '';
        const name = `${fname} ${lname}`.trim();
        return name || ticket?.fullname || 'N/A';
    };

    const getIssueText = () => {
        if (!ticket?.issue) return ticket?.explanation || 'No details specified.';
        if (Array.isArray(ticket.issue)) return ticket.issue.join(', ');
        if (typeof ticket.issue === 'string') {
            try {
                const parsed = JSON.parse(ticket.issue);
                if (Array.isArray(parsed)) return parsed.join(', ');
            } catch (e) { }
        }
        return String(ticket.issue);
    };

    return (
        <Drawer
            width="w-full"
            trigger={
                <button
                    type="button"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-blue-600 font-semibold bg-blue-50/50 hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 active:scale-95 transition-all duration-200 cursor-pointer"
                >
                    {ticket.ticket_id || ticket.id}
                </button>
            }
        >
            <TicketDrawerContent
                ticket={ticket}
                getFullName={getFullName}
                getIssueText={getIssueText}
            />
        </Drawer>
    );
}