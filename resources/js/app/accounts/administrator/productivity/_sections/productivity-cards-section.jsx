import React from 'react'
import {
    FaUser,
    FaWpforms,
    FaExclamationTriangle,
    FaCalendarDay,
    FaCalendarAlt,
    FaEnvelopeOpenText,
    FaMailBulk,
    FaEnvelope,
    FaCheckSquare,
    FaTasks,
    FaClipboardCheck,
    FaCalculator,
} from 'react-icons/fa'
import { HiMenu } from 'react-icons/hi'

// Single Employee Productivity Card
function EmployeeCardItem({ user }) {
    // Agent details fallbacks
    const agentName = `${user?.fname || ''} ${user?.lname || ''}`.trim() || user?.name || user?.agent || '—'
    const agentType = user?.agent_type || 'Agent Details'

    // Extract metric values directly from array lengths or numeric properties
    const metrics = [
        {
            label: 'Web Form',
            value: Array.isArray(user?.web_form_list) ? user.web_form_list.length : (user?.web_form ?? 0),
            icon: FaWpforms,
            color: 'text-blue-500',
        },
        {
            label: 'Overdue Cases',
            value: Array.isArray(user?.overdue_cases_list) ? user.overdue_cases_list.length : (user?.overdue_cases ?? 0),
            icon: FaExclamationTriangle,
            color: 'text-rose-500',
        },
        {
            label: 'Cases Due Today',
            value: Array.isArray(user?.cases_due_today_list) ? user.cases_due_today_list.length : (user?.cases_due_today ?? 0),
            icon: FaCalendarDay,
            color: 'text-amber-500',
        },
        {
            label: 'Upcoming Cases Dues',
            value: Array.isArray(user?.upcoming_dues_list) ? user.upcoming_dues_list.length : (user?.upcoming_dues ?? 0),
            icon: FaCalendarAlt,
            color: 'text-indigo-500',
        },
        {
            label: 'Overdue Direct Emails',
            value: Array.isArray(user?.overdue_direct_emails_list) ? user.overdue_direct_emails_list.length : (user?.overdue_direct_emails ?? 0),
            icon: FaEnvelopeOpenText,
            color: 'text-red-500',
        },
        {
            label: 'Direct Emails Due Today',
            value: Array.isArray(user?.direct_emails_due_today_list) ? user.direct_emails_due_today_list.length : (user?.direct_emails_due_today ?? 0),
            icon: FaMailBulk,
            color: 'text-orange-500',
        },
        {
            label: 'Upcoming Direct Email Dues',
            value: Array.isArray(user?.upcoming_dues_direct_emails_list) ? user.upcoming_dues_direct_emails_list.length : (user?.upcoming_dues_direct_emails ?? 0),
            icon: FaEnvelope,
            color: 'text-sky-500',
        },
        {
            label: 'Handled Cases',
            value: Array.isArray(user?.handled_cases_notes) ? user.handled_cases_notes.length : (user?.handled_cases ?? 0),
            icon: FaCheckSquare,
            color: 'text-emerald-500',
        },
        {
            label: 'Handled Direct Emails',
            value: Array.isArray(user?.handled_direct_emails_notes) ? user.handled_direct_emails_notes.length : (user?.handled_direct_emails ?? 0),
            icon: FaTasks,
            color: 'text-teal-500',
        },
        {
            label: 'Handled Web Form',
            value: Array.isArray(user?.handled_web_form_notes) ? user.handled_web_form_notes.length : (user?.handled_web_form ?? 0),
            icon: FaClipboardCheck,
            color: 'text-cyan-500',
        },
    ]

    // Calculate sum of metrics
    const total = metrics.reduce((acc, curr) => acc + Number(curr.value || 0), 0)

    return (
        <div className="w-full max-w-md bg-white rounded-2xl p-5 border border-slate-100 shadow-sm transition-all hover:shadow-md space-y-4">
            {/* Card Header */}
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <div className="flex items-center gap-2">
                    <HiMenu className="w-5 h-5 text-purple-600 cursor-pointer hover:opacity-80" />
                    <span className="px-3 py-1 bg-purple-50 text-purple-600 font-semibold text-xs rounded-full uppercase tracking-wide">
                        {agentType}
                    </span>
                </div>
                <span className="text-xs font-semibold text-slate-400">
                    {user?.emp_id ? `#${user.emp_id}` : `#${user?.id || ''}`}
                </span>
            </div>

            {/* Agent Row */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-50">
                <div className="flex items-center gap-2 text-purple-600 font-medium">
                    <FaUser className="w-4 h-4 text-purple-500" />
                    <span className="text-slate-500 font-medium text-sm">Agent</span>
                </div>
                <span className="font-bold text-slate-800 text-base">
                    {agentName}
                </span>
            </div>

            {/* Metrics List */}
            <div className="space-y-2.5 text-xs">
                {metrics.map((item, idx) => {
                    const Icon = item.icon
                    return (
                        <div key={idx} className="flex items-center justify-between py-0.5">
                            <div className="flex items-center gap-2">
                                <Icon className={`w-3.5 h-3.5 ${item.color}`} />
                                <span className="text-slate-500 font-normal">{item.label}</span>
                            </div>
                            <span className="font-semibold text-slate-800">
                                {item.value}
                            </span>
                        </div>
                    )
                })}
            </div>

            <div className=" border-t border-gray-100">
                <div className="mt-2 p-3 bg-slate-50 rounded-lg text-xs space-y-1 text-slate-600 max-h-32 overflow-y-auto">
                    <p><strong>Cases Logged:</strong> {user?.handled_cases_notes?.length || 0}</p>
                    <p><strong>Web Forms Logged:</strong> {user?.handled_web_form_notes?.length || 0}</p>
                    <p><strong>Emails Logged:</strong> {user?.handled_direct_emails_notes?.length || 0}</p>
                </div>
            </div>

            {/* Total Footer */}
            <div className="border-t border-gray-100 flex items-center justify-between bg-slate-50/50 p-3 rounded-xl">
                <div className="flex items-center gap-2 text-purple-700 font-bold text-xs uppercase tracking-wider">
                    <FaCalculator className="w-4 h-4 text-purple-600" />
                    <span>Total</span>
                </div>
                <span className="text-sm font-extrabold text-purple-700">
                    {total}
                </span>
            </div>

        </div>
    )
}

// Container mapping user list from Redux
export default function ProductivityCardsSection({ data = [], onViewProfile }) {
    if (!data.length) {
        return (
            <div className="text-center py-12 text-slate-400">
                No users found for this category.
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {data.map((user, index) => (
                <EmployeeCardItem
                    key={user.id || index}
                    user={user}
                    onViewProfile={onViewProfile}
                />
            ))}
        </div>
    )
}