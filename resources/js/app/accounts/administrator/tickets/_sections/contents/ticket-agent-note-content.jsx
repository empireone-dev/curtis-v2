import React, { useState } from 'react';
import {
    MessageSquare, Plus, Loader2, CheckCircle2, ArrowLeft, Tag,
    MoreHorizontal, User, Search, History, Clock, Sparkles, X
} from 'lucide-react';

export default function TicketAgentNoteContent({ props_data }) {
    const ticketData = props_data || {};

    console.log('ticketData', props_data);

    // Extract Notes List from `props_data.agent_notes`
    const agentNotesList = ticketData?.agent_notes || [];
    const latestNote = agentNotesList.length > 0 ? agentNotesList[0]?.message : '';

    // Technical Notes States
    const [agentNotes, setAgentNotes] = useState(
        latestNote ||
        'Customer reported cooling failure after sudden power outage. Serial code validated with regional distributor. Compressor failure suspected.'
    );
    const [lastSaved, setLastSaved] = useState('Just now');
    const [isSaving, setIsSaving] = useState(false);
    const [activeTags, setActiveTags] = useState(['Compressor Failure']);

    // Form States for Log Case
    const [isEscalation, setIsEscalation] = useState('Yes');
    const [remarks, setRemarks] = useState('');
    const [caseType, setCaseType] = useState('');
    const [caseStatus, setCaseStatus] = useState('');
    const [reassignedTo, setReassignedTo] = useState('');

    // Audit Logs & Timeline Search States
    const [timelineFilter, setTimelineFilter] = useState('all');
    const [logSearchQuery, setLogSearchQuery] = useState('');
    const [selectedLogId, setSelectedLogId] = useState(null);

    // Extract Cases Logs List from `props_data.cases_logs`
    const caseLogsFromDB = ticketData?.cases_logs || [];

    // Handlers
    const insertQuickTag = (tag) => {
        if (!activeTags.includes(tag)) {
            setActiveTags((prev) => [...prev, tag]);
        }
        setAgentNotes((prev) => (prev ? `${prev}\n[TAG: ${tag}]` : `[TAG: ${tag}]`));
    };

    const removeTag = (tagToRemove) => {
        setActiveTags((prev) => prev.filter((t) => t !== tagToRemove));
        setAgentNotes((prev) => prev.replace(new RegExp(`\\n?\\[TAG: ${tagToRemove}\\]`, 'g'), ''));
    };

    const handleSaveNotes = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            setLastSaved(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        }, 450);
    };

    const handleLogCaseSubmit = (e) => {
        e.preventDefault();
        console.log({ isEscalation, remarks, caseType, caseStatus });
    };

    const handleReassign = (e) => {
        e.preventDefault();
        console.log({ reassignedTo });
    };

    // Calculate Word Count accurately
    const wordCount = agentNotes.trim() ? agentNotes.trim().split(/\s+/).filter(Boolean).length : 0;

    // Filter Cases Logs
    const filteredCaseLogs = caseLogsFromDB.filter((log) => {
        const query = logSearchQuery.toLowerCase();
        const userName = log.user?.name || `User #${log.user_id}`;
        return (
            (log.remarks || '').toLowerCase().includes(query) ||
            (log.case_status || '').toLowerCase().includes(query) ||
            (log.case_type || '').toLowerCase().includes(query) ||
            userName.toLowerCase().includes(query)
        );
    });

    return (
        <>
            <style>{`
                @keyframes tabFadeIn {
                    from { opacity: 0; transform: translateY(6px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .tab-content-anim {
                    animation: tabFadeIn 250ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
            `}</style>

            <div className="tab-content-anim space-y-8 mx-auto text-slate-800">

                {/* TOP ROW: Main Content Split */}
                <div className="flex flex-col lg:flex-row gap-6 items-start">

                    {/* LEFT COLUMN: Agent Technical Notes & Diagnosis */}
                    <div className="w-full lg:w-3/4 space-y-6 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm">

                        {/* Header Banner */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-gradient-to-r from-blue-50/80 via-indigo-50/30 to-transparent p-4 rounded-xl border border-blue-100/80 gap-3">
                            <div className="flex items-center gap-3">
                                <span className="p-2.5 bg-blue-600 text-white rounded-xl shadow-sm shadow-blue-500/30 shrink-0">
                                    <MessageSquare className="w-5 h-5" />
                                </span>
                                <div>
                                    <h3 className="text-base font-bold text-slate-900 tracking-tight">
                                        Agent Technical Notes & Diagnosis
                                    </h3>
                                    <p className="text-xs text-slate-500">
                                        Write a detailed explanation of the defect or issue found during intake review.
                                    </p>
                                </div>
                            </div>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100/80 text-blue-700 border border-blue-200/60 self-start sm:self-auto">
                                <Sparkles className="w-3.5 h-3.5 text-blue-500" /> Live Editor
                            </span>
                        </div>

                        {/* Quick Defect Tags Picker */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                                    <Tag className="w-3.5 h-3.5 text-blue-500" />
                                    Quick Defect Tags
                                </label>
                                {activeTags.length > 0 && (
                                    <span className="text-[11px] font-medium text-slate-400">
                                        {activeTags.length} active tag(s)
                                    </span>
                                )}
                            </div>

                            {/* Tag Options */}
                            <div className="flex flex-wrap gap-2">
                                {[
                                    'Cooling Issue',
                                    'Compressor Defect',
                                    'Power Supply Failure',
                                    'Proof of Purchase Verified',
                                    'Refrigerant Leak',
                                    'Technician Dispatch Required'
                                ].map((tag) => {
                                    const isSelected = activeTags.includes(tag);
                                    return (
                                        <button
                                            key={tag}
                                            type="button"
                                            onClick={() => insertQuickTag(tag)}
                                            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 border flex items-center gap-1.5 cursor-pointer active:scale-95 ${isSelected
                                                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                                                    : 'bg-slate-50 hover:bg-blue-50/80 text-slate-700 border-slate-200 hover:border-blue-300'
                                                }`}
                                        >
                                            <Plus className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                                            {tag}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Active Tags Bar */}
                            {activeTags.length > 0 && (
                                <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100">
                                    <span className="text-[11px] text-slate-400 font-medium mr-1">Attached:</span>
                                    {activeTags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/80 animate-fadeIn"
                                        >
                                            {tag}
                                            <button
                                                onClick={() => removeTag(tag)}
                                                className="hover:bg-blue-200/60 rounded p-0.5 transition cursor-pointer"
                                            >
                                                <X className="w-3 h-3 text-blue-600" />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Notes Editor Box */}
                        <div className="space-y-3">
                            <div className="relative rounded-2xl transition-all duration-200 focus-within:ring-4 focus-within:ring-blue-500/10">
                                <textarea
                                    rows={15}
                                    value={agentNotes}
                                    onChange={(e) => setAgentNotes(e.target.value)}
                                    placeholder="Write a detailed explanation of the defect/issue..."
                                    className="w-full p-4 rounded-2xl bg-slate-50/60 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:border-blue-500 focus:outline-none transition-all duration-200 leading-relaxed shadow-inner"
                                />
                            </div>

                            {/* Editor Status Bar */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                                <div className="flex items-center gap-3 text-xs text-slate-500 font-medium px-1">
                                    <span className="bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200/60 text-slate-700">
                                        Words: <strong className="text-slate-900">{wordCount}</strong>
                                    </span>
                                    <span className="text-slate-300">•</span>
                                    <span className="text-slate-500 flex items-center gap-1">
                                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                                        Auto-saved <strong className="text-slate-700">{lastSaved}</strong>
                                    </span>
                                </div>

                                <button
                                    type="button"
                                    onClick={handleSaveNotes}
                                    disabled={isSaving}
                                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold text-sm rounded-xl shadow-sm shadow-blue-500/25 transition-all duration-200 flex items-center gap-2 justify-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSaving ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <CheckCircle2 className="w-4 h-4 text-white" />
                                    )}
                                    <span>Save Agent Notes</span>
                                </button>
                            </div>
                        </div>

                    </div>

                    {/* RIGHT STICKY COLUMN: Log Case & Case Details */}
                    <div className="w-full lg:w-1/4 space-y-6 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm sticky top-6 self-start z-10">
                        {/* Log Case Section */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                                <h2 className="text-base font-bold text-slate-900 tracking-tight">Log Case</h2>
                                <span className="w-2 h-2 rounded-full bg-emerald-500 ring-4 ring-emerald-100"></span>
                            </div>

                            {/* Escalation Toggle Buttons */}
                            <div className="space-y-1.5">
                                <span className="block text-xs font-semibold text-slate-600">
                                    Is this case a possible escalation?
                                </span>
                                <div className="grid grid-cols-2 gap-2 pt-1">
                                    {['Yes', 'No'].map((opt) => (
                                        <button
                                            key={opt}
                                            type="button"
                                            onClick={() => setIsEscalation(opt)}
                                            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${isEscalation === opt
                                                    ? opt === 'Yes'
                                                        ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                                                        : 'bg-blue-600 text-white border-blue-600 shadow-xs'
                                                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                                                }`}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Remarks Field */}
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
                                    Remarks
                                </label>
                                <textarea
                                    rows={3}
                                    value={remarks}
                                    onChange={(e) => setRemarks(e.target.value)}
                                    placeholder="Enter additional remarks..."
                                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all duration-200 resize-y"
                                />
                            </div>

                            {/* Case Type Select */}
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
                                    Case Type
                                </label>
                                <select
                                    value={caseType}
                                    onChange={(e) => setCaseType(e.target.value)}
                                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all duration-200"
                                >
                                    <option value="">Select Case Type</option>
                                    <option value="Technical">Technical</option>
                                    <option value="Billing">Billing</option>
                                    <option value="General">General Inquiry</option>
                                </select>
                            </div>

                            {/* Case Status Select */}
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
                                    Case Status
                                </label>
                                <select
                                    value={caseStatus}
                                    onChange={(e) => setCaseStatus(e.target.value)}
                                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all duration-200"
                                >
                                    <option value="">Select Status</option>
                                    <option value="Open">Open</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Resolved">Resolved</option>
                                </select>
                            </div>

                            {/* Submit Button */}
                            <button
                                onClick={handleLogCaseSubmit}
                                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-bold text-sm rounded-xl shadow-sm shadow-blue-500/20 transition-all duration-200 cursor-pointer"
                            >
                                Submit Log
                            </button>
                        </div>

                        {/* Reassign Section */}
                        <div className="space-y-4 pt-5 border-t border-slate-100">
                            <h2 className="text-base font-bold text-slate-900 tracking-tight">Case Assignment</h2>

                            <div>
                                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
                                    Reassigned to
                                </label>
                                <select
                                    value={reassignedTo}
                                    onChange={(e) => setReassignedTo(e.target.value)}
                                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all duration-200"
                                >
                                    <option value="">Select Agent or Team</option>
                                    <option value="Agent 1">Agent 1</option>
                                    <option value="Agent 2">Agent 2</option>
                                    <option value="Tier 2 Support">Tier 2 Support</option>
                                </select>
                            </div>

                            {/* Reassign Button */}
                            <button
                                onClick={handleReassign}
                                className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 active:scale-[0.99] text-white font-bold text-sm rounded-xl shadow-sm shadow-rose-500/20 transition-all duration-200 cursor-pointer"
                            >
                                Reassign Case
                            </button>
                        </div>
                    </div>

                </div>

                {/* BOTTOM ROW: Timeline & Case Logs Split */}
                <div className="pt-8 border-t border-slate-200/80 flex flex-col lg:flex-row gap-8 items-start">

                    {/* Timeline Notes (Left Side, 3/4 Width) */}
                    <div className="w-full lg:w-3/4 space-y-6 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm">

                        {/* Timeline Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                            <div className="flex items-center gap-2">
                                <History className="w-5 h-5 text-blue-600" />
                                <h3 className="text-base font-bold text-slate-900">Activity & Communication Timeline</h3>
                            </div>
                        </div>

                        {/* Timeline List Mapped from `props_data.agent_notes` */}
                        <div className="space-y-6 pt-2">
                            {agentNotesList.length > 0 ? (
                                agentNotesList.map((item) => (
                                    <div
                                        key={item.id}
                                        className="relative pl-6 border-l-2 border-blue-500/80 hover:border-blue-600 transition-all group"
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex items-center gap-2.5">
                                                <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-2xs">
                                                    <User className="w-4 h-4" />
                                                </div>
                                                <div>
                                                    <span className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                                                        {item.user?.name || `User #${item.user_id}`}
                                                    </span>
                                                    <span className="text-xs text-slate-400 ml-2 font-medium">
                                                        {item.created_at ? new Date(item.created_at).toLocaleString() : 'N/A'}
                                                    </span>
                                                </div>
                                            </div>

                                            <button className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-1 rounded-lg transition cursor-pointer">
                                                <MoreHorizontal className="w-4 h-4" />
                                            </button>
                                        </div>

                                        {item.message && (
                                            <div className="mt-3 ml-9 bg-slate-50/80 hover:bg-slate-50 p-4 rounded-xl border border-slate-200/70 transition-all text-xs text-slate-700 leading-relaxed shadow-2xs">
                                                {item.message}
                                            </div>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8 text-xs text-slate-400 font-medium">
                                    No notes recorded yet.
                                </div>
                            )}
                        </div>

                    </div>

                    {/* Case Logs Column (Right Side, 1/4 Width) - Mapped from `props_data.cases_logs` */}
                    <div className="w-full lg:w-1/4 space-y-4 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm">

                        <div>
                            <h3 className="text-base font-bold text-slate-900">Case Audit Logs</h3>
                            <p className="text-xs text-slate-500 mt-0.5">Historical log of user actions</p>
                        </div>

                        {/* Search Input */}
                        <div className="relative">
                            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                value={logSearchQuery}
                                onChange={(e) => setLogSearchQuery(e.target.value)}
                                placeholder="Search logs..."
                                className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:outline-none transition-all"
                            />
                        </div>

                        {/* Log List */}
                        <div className="space-y-3 pt-1 max-h-[420px] overflow-y-auto pr-1">
                            {filteredCaseLogs.length > 0 ? (
                                filteredCaseLogs.map((log) => {
                                    const isSelected = selectedLogId === log.id;
                                    const userName = log.user?.name || `User #${log.user_id}`;
                                    return (
                                        <div
                                            key={log.id}
                                            onClick={() => setSelectedLogId(isSelected ? null : log.id)}
                                            className={`p-3 rounded-xl text-xs space-y-1.5 transition-all cursor-pointer border ${isSelected
                                                    ? 'bg-blue-50/80 border-blue-300 ring-2 ring-blue-500/10'
                                                    : 'bg-slate-50/60 border-slate-200/70 hover:bg-slate-100/80'
                                                }`}
                                        >
                                            <div className="font-bold text-slate-800 flex items-center justify-between">
                                                <span>{userName}</span>
                                                <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${String(log.isEscalate) === 'true' ? 'bg-amber-100 text-amber-700' : 'bg-slate-200 text-slate-600'
                                                    }`}>
                                                    {String(log.isEscalate) === 'true' ? 'Escalated' : 'Normal'}
                                                </span>
                                            </div>

                                            <div className="text-slate-600 font-medium">
                                                Status: <span className="text-blue-600 font-semibold">{log.case_status || 'N/A'}</span>
                                            </div>

                                            <div className="text-[11px] text-slate-400 flex justify-between items-center">
                                                <span>{log.created_at ? new Date(log.created_at).toLocaleDateString() : 'N/A'}</span>
                                                <span className="capitalize text-slate-500">{log.log_from || 'handled'}</span>
                                            </div>

                                            {log.remarks && (
                                                <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-200/50">
                                                    <span className="text-slate-400">Remarks: </span>
                                                    <span className="font-semibold text-slate-700">{log.remarks}</span>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="text-center py-6 text-xs text-slate-400 font-medium">
                                    No logs found.
                                </div>
                            )}
                        </div>

                    </div>

                </div>

            </div>
        </>
    );
}