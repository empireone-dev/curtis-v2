import React, { useEffect, useState } from 'react'
import Layout from './../../layout'
import TicketTableSection from './_sections/ticket-table-section'
import LoadingPage from '@/app/_components/loading-page'
import store from '@/app/store/store'
import { get_tickets_thunk } from '@/app/_redux/tickets-thunk'
import TicketPaginationSection from './_sections/ticket-pagination-section'

export default function Page() {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function get_data() {
            setLoading(true)

            // Extract page and per_page parameters from URL query string
            const searchParams = typeof window !== 'undefined'
                ? new URLSearchParams(window.location.search)
                : new URLSearchParams()
            const page = searchParams.get('page') || 1
            const per_page = searchParams.get('per_page') || 5

            await store.dispatch(get_tickets_thunk({ page, per_page }))
            setLoading(false)
        }

        if (typeof window !== 'undefined') {
            get_data()
        }
    }, [typeof window !== 'undefined' ? window.location.search : null])

    return (
        <Layout>
            <div className="w-full space-y-6">
                {/* Page Title Section */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-200">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                            Ticket Management
                        </h1>
                        <p className="text-sm text-slate-500 mt-1">
                            Manage, monitor, and resolve all support tickets in one place.
                        </p>
                    </div>
                </div>

                {/* Content Section */}
                {loading ? (
                    <LoadingPage />
                ) : (
                    <div className="space-y-4">
                        <TicketTableSection />
                        <TicketPaginationSection />
                    </div>
                )}
            </div>
        </Layout>
    )
}