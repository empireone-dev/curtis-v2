import React, { useState } from 'react';

// Workflow Steps mapped to generic SVG icons
const WORKFLOW_STEPS = [
    { id: 'VALIDATION', label: 'Warranty Validation', icon: HomeIcon },
    { id: 'LACKING_INFO', label: 'Lacking Information', icon: UserIcon },
    { id: 'DECISION', label: 'Decision Making', icon: ChatIcon },
    { id: 'RMA_REQUEST', label: 'RMA Request', icon: HelpIcon },
    { id: 'PROCESS_TICKET', label: 'Process Ticket', icon: SettingsIcon },
    { id: 'CLOSED_TICKET', label: 'Closed Ticket', icon: LockIcon },
];

export default function SleekWorkflowApp() {
    const [isExpanded, setIsExpanded] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeStep, setActiveStep] = useState('VALIDATION');

    // Handle selection and auto-close mobile drawer
    const handleStepClick = (stepId) => {
        setActiveStep(stepId);
        setIsMobileMenuOpen(false);
    };

    return (
        // Added a fallback background color so the rounded borders of the main area are visible
        <div className="flex h-[85vh] font-sans overflow-hidden relative">

            {isMobileMenuOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black/40 z-30 transition-opacity"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            <aside
                className={`
          absolute md:relative z-40 flex flex-col bg-[#2e74ff] transition-all duration-300 ease-in-out 
          rounded-[2rem] py-8 bottom-4 top-0
          ${isExpanded ? 'w-64' : 'w-24'}
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-[150%] md:translate-x-0'}
        `}
            >
                {/* Brand / Logo Area */}
                <div className="flex items-center pl-8 mb-10 h-8">
                    {(isExpanded || isMobileMenuOpen) && (
                        <span className="text-white font-bold text-xl whitespace-nowrap">
                            WARRANTY CLAIM
                        </span>
                    )}
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 flex flex-col pl-4 md:pl-6">
                    <ul className="space-y-2 relative pr-4 md:pr-0">
                        {WORKFLOW_STEPS.map((step) => {
                            const isActive = activeStep === step.id;
                            const Icon = step.icon;

                            return (
                                <li key={step.id} className="relative">
                                    <button
                                        onClick={() => handleStepClick(step.id)}
                                        // On mobile, items are pills (rounded-full). On desktop, they snap to the right edge.
                                        className={`w-full flex items-center py-4 pl-4 transition-colors duration-200 rounded-full md:rounded-r-none md:rounded-l-full ${isActive
                                                ? 'bg-white text-[#2e74ff] shadow-sm md:shadow-none'
                                                : 'text-white hover:bg-[#4b86ff]'
                                            }`}
                                    >
                                        <Icon className="w-6 h-6 shrink-0 relative z-10" />
                                        {(isExpanded || isMobileMenuOpen) && (
                                            <span className="ml-4 font-medium whitespace-nowrap relative z-10">
                                                {step.label}
                                            </span>
                                        )}

                                        {/* ACTIVE STATE CURVES (The "Cutout" effect - Hidden on mobile drawer) */}

                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Bottom Toggle Button (Hidden on Mobile) */}
                <div className="hidden md:flex justify-center mt-auto">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#2e74ff] hover:bg-gray-100 transition-colors"
                    >
                        {isExpanded ? (
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
                            </svg>
                        )}
                    </button>
                </div>
            </aside>

            {/* MAIN CONTENT AREA */}
            <main className="flex-1 bg-white my-4 mx-4 md:ml-2 rounded-[2rem] p-6 md:p-10 overflow-y-auto relative w-full">

                {/* Mobile Header / Hamburger Toggle */}
                <div className="md:hidden flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
                    <h2 className="text-sm font-bold tracking-widest text-[#2e74ff] uppercase">
                        Warranty Claim
                    </h2>
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="p-2 bg-gray-100 text-[#2e74ff] rounded-lg hover:bg-gray-200 transition-colors"
                    >
                        <MenuIcon className="w-6 h-6" />
                    </button>
                </div>

                <div className="max-w-3xl">
                    <h2 className="text-sm font-bold tracking-widest text-[#2e74ff] uppercase mb-2">
                        Active Workflow Step
                    </h2>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-8">
                        {WORKFLOW_STEPS.find(s => s.id === activeStep)?.label}
                    </h1>

                    <div className="prose prose-blue max-w-none text-gray-600">
                        <p className="text-lg">
                            This main content area matches seamlessly with the active white tab from the sidebar.
                            You can place your forms, ticket information, and resolution buttons here for the
                            <strong> {activeStep.replace(/_/g, ' ')} </strong> phase.
                        </p>
                        <p className="text-lg">
                            This main content area matches seamlessly with the active white tab from the sidebar.
                            You can place your forms, ticket information, and resolution buttons here for the
                            <strong> {activeStep.replace(/_/g, ' ')} </strong> phase.
                        </p>
                    </div>
                </div>
            </main>

        </div>
    );
}

// --- ICONS ---

function MenuIcon(props) {
    return (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
    );
}

function HomeIcon(props) {
    return (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
    );
}

function UserIcon(props) {
    return (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
    );
}

function ChatIcon(props) {
    return (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
    );
}

function HelpIcon(props) {
    return (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    );
}

function SettingsIcon(props) {
    return (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
    );
}

function LockIcon(props) {
    return (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
    );
}