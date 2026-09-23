import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { router } from '@inertiajs/react';

export default function TicketHeaderSection({ initialSearch = '', onSearch }) {
    const [searchQuery, setSearchQuery] = useState(initialSearch);

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        // Optional local callback
        if (onSearch) {
            onSearch(query);
        }

        // Send query to Inertia backend without triggering a full page re-render
        router.get(
            window.location.pathname,
            { search: query },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    };

    return (
        <>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4 border-b border-slate-200">
                {/* Left Side: Title & Search Bar */}
                <div className="flex  items-center justify-between flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 flex-1">

                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                            Ticket Management
                        </h1>
                        <p className="text-sm text-slate-500 mt-0.5">
                            Manage, monitor, and resolve all support tickets in one place.
                        </p>
                    </div>

                    <div className="relative min-w-[240px] max-w-xs flex-1">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            placeholder="Search tickets..."
                            className="w-full pl-9 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}