'use client'

import React from 'react'
import Pagination from '@/app/_components/pagination'
import { useSelector } from 'react-redux'
import { router } from '@inertiajs/react'

export default function TicketPaginationSection() {
    const { tickets } = useSelector((store) => store.tickets)

    // Laravel Paginator properties mapping
    const currentPage = tickets?.current_page || 1
    const totalPages = tickets?.last_page || 1
    const pageSize = tickets?.per_page || 5
    const totalItems = tickets?.total || 0

    // Callback when clicking page numbers
    const handlePageChange = (page) => {
        router.get(
            window.location.pathname,
            { page, per_page: pageSize },
            {
                preserveState: true,
                preserveScroll: true,
                only: ['tickets'], // Optionally request only tickets prop from Inertia
            }
        )
    }

    // Callback when changing per_page size from dropdown
    const handlePageSizeChange = (newSize) => {
        router.get(
            window.location.pathname,
            { page: 1, per_page: newSize },
            {
                preserveState: true,
                preserveScroll: true,
                only: ['tickets'],
            }
        )
    }

    return (
        <div className="w-full py-4">
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                pageSize={pageSize}
                onPageSizeChange={handlePageSizeChange}
                totalItems={totalItems}
            />
        </div>
    )
}