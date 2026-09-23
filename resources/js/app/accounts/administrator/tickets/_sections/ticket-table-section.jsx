import Table from '@/app/_components/table'
import moment from 'moment'
import React from 'react'
import { useSelector } from 'react-redux'
import TicketDrawerSection from './ticket-drawer-section'

export default function TicketTableSection() {
    const { tickets } = useSelector((store) => store.tickets)

    const columns = [
        {
            key: 'ticket_id', label: 'Ticket ID', sortable: true,

            render: (row) => (
                <span>
                    <TicketDrawerSection props_data={row}/>
                    
                </span>
            ),
        },
        {
            key: 'fullname',
            label: 'Fullname',
            sortable: true,
            render: (row) => `${row.fname || ''} ${row.lname || ''}`.trim() || '—',
        },
        { key: 'email', label: 'Email', sortable: true },
        { key: 'resolution', label: 'Resolution', sortable: false },
        { key: 'issue', label: 'Issue', sortable: false },
        {
            key: 'status',
            label: 'Status',
            sortable: true,
            render: (row) => {
                const styles = {
                    Open: 'bg-blue-100 text-blue-700 border-blue-200',
                    'In Progress': 'bg-amber-100 text-amber-700 border-amber-200',
                    Resolved: 'bg-emerald-100 text-emerald-700 border-emerald-200',
                    Closed: 'bg-slate-100 text-slate-600 border-slate-200',
                }
                return (
                    <span
                        className={`px-2.5 py-1 text-xs font-medium border rounded-full ${styles[row.status] || 'bg-slate-100 text-slate-700'
                            }`}
                    >
                        {row.status}
                    </span>
                )
            },
        },
        {
            key: 'isUploading',
            label: 'IsUploading',
            sortable: false,
            render: (row) => (
                <span
                    className={`px-2 py-0.5 text-xs font-semibold rounded ${row.isUploading
                        ? 'bg-blue-50 text-blue-600'
                        : 'bg-slate-100 text-slate-500'
                        }`}
                >
                    {row.isUploading ? 'Yes' : 'No'}
                </span>
            ),
        },
        {
            key: 'created_at', label: 'Created At', sortable: true,
            render: (row) => (
                <span

                >
                    {moment(row.created_at).format('LL')}
                </span>
            ),
        },
    ]

    const handleRowClick = (ticket) => {
        console.log('Clicked ticket:', ticket)
    }

    return (
        <>
            <Table
                columns={columns}
                data={tickets?.data}
                selectable={true}
                onRowClick={handleRowClick}
            />
        </>
    )
}