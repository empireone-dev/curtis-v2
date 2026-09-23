
import React, { useState, useMemo } from 'react'

export default function Table({
    columns = defaultColumns,
    data = defaultData,
    selectable = true,
    onRowClick,
}) {
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })
    const [selectedRows, setSelectedRows] = useState(new Set())

    // Sort Data
    const sortedData = useMemo(() => {
        if (!sortConfig.key) return data
        return [...data].sort((a, b) => {
            const aVal = a[sortConfig.key]
            const bVal = b[sortConfig.key]
            if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1
            if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1
            return 0
        })
    }, [data, sortConfig])

    // Sorting Handler
    const handleSort = (key) => {
        setSortConfig((prev) => {
            if (prev.key === key) {
                if (prev.direction === 'asc') return { key, direction: 'desc' }
                return { key: null, direction: 'asc' }
            }
            return { key, direction: 'asc' }
        })
    }

    // Row Selection Handlers
    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedRows(new Set(sortedData.map((d, index) => d.id || index)))
        } else {
            setSelectedRows(new Set())
        }
    }

    const handleSelectRow = (id) => {
        const newSelected = new Set(selectedRows)
        if (newSelected.has(id)) {
            newSelected.delete(id)
        } else {
            newSelected.add(id)
        }
        setSelectedRows(newSelected)
    }

    const isAllSelected =
        sortedData.length > 0 &&
        sortedData.every((d, i) => selectedRows.has(d.id || i))

    return (
        <div className="w-full bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden text-slate-800 font-sans">
            {/* Header selection indicator bar (if items selected) */}
            {selectable && selectedRows.size > 0 && (
                <div className="p-3 border-b border-slate-100 bg-blue-50/50 flex items-center justify-between">
                    <span className="text-xs font-semibold text-blue-600">
                        {selectedRows.size} selected
                    </span>
                </div>
            )}

            {/* Table Area */}
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                    <thead>
                        <tr className="bg-slate-50/70 border-b border-slate-100 text-xs uppercase tracking-wider text-slate-500">
                            {selectable && (
                                <th className="py-3.5 px-4 w-10">
                                    <input
                                        type="checkbox"
                                        checked={isAllSelected}
                                        onChange={handleSelectAll}
                                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                    />
                                </th>
                            )}
                            {columns.map((col) => (
                                <th
                                    key={col.key}
                                    onClick={() => col.sortable && handleSort(col.key)}
                                    className={`py-3.5 px-4 font-semibold select-none ${col.sortable ? 'cursor-pointer hover:text-blue-600 transition-colors' : ''
                                        }`}
                                >
                                    <div className="flex items-center gap-1.5">
                                        <span>{col.label}</span>
                                        {col.sortable && (
                                            <span className="text-slate-400">
                                                {sortConfig.key === col.key ? (
                                                    sortConfig.direction === 'asc' ? '↑' : '↓'
                                                ) : (
                                                    '↕'
                                                )}
                                            </span>
                                        )}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {sortedData.length > 0 ? (
                            sortedData.map((row, index) => {
                                const rowId = row.id || index
                                const isSelected = selectedRows.has(rowId)

                                return (
                                    <tr
                                        key={rowId}
                                        onClick={() => onRowClick && onRowClick(row)}
                                        className={`transition-colors duration-150 hover:bg-blue-50/40 cursor-pointer ${isSelected ? 'bg-blue-50/60' : ''
                                            }`}
                                    >
                                        {selectable && (
                                            <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                                                <input
                                                    type="checkbox"
                                                    checked={isSelected}
                                                    onChange={() => handleSelectRow(rowId)}
                                                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                                />
                                            </td>
                                        )}
                                        {columns.map((col) => (
                                            <td key={col.key} className="py-3.5 px-4 text-slate-700 whitespace-nowrap">
                                                {col.render ? col.render(row) : row[col.key]}
                                            </td>
                                        ))}
                                    </tr>
                                )
                            })
                        ) : (
                            <tr>
                                <td
                                    colSpan={columns.length + (selectable ? 1 : 0)}
                                    className="py-12 text-center text-slate-400"
                                >
                                    No records available.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

// Default columns demo
const defaultColumns = [
    { key: 'id', label: 'Ticket ID', sortable: true },
    { key: 'subject', label: 'Subject', sortable: true },
    {
        key: 'status',
        label: 'Status',
        sortable: true,
        render: (row) => {
            const styles = {
                Open: 'bg-blue-100 text-blue-700',
                'In Progress': 'bg-amber-100 text-amber-700',
                Resolved: 'bg-emerald-100 text-emerald-700',
            }
            return (
                <span
                    className={`px-2.5 py-1 text-xs font-semibold rounded-full ${styles[row.status] || 'bg-slate-100 text-slate-700'
                        }`}
                >
                    {row.status}
                </span>
            )
        },
    },
    { key: 'priority', label: 'Priority', sortable: true },
    { key: 'date', label: 'Created At', sortable: true },
]

// Default ticket sample data
const defaultData = [
    { id: 'TCK-1001', subject: 'Unable to access dashboard', status: 'Open', priority: 'High', date: '2026-03-20' },
    { id: 'TCK-1002', subject: 'Payment failed on checkout', status: 'In Progress', priority: 'Critical', date: '2026-03-21' },
    { id: 'TCK-1003', subject: 'Feature request: Dark mode', status: 'Resolved', priority: 'Low', date: '2026-03-22' },
    { id: 'TCK-1004', subject: 'Password reset link expired', status: 'Open', priority: 'Medium', date: '2026-03-22' },
    { id: 'TCK-1005', subject: 'API response time spike', status: 'In Progress', priority: 'High', date: '2026-03-23' },
    { id: 'TCK-1006', subject: 'Profile photo upload error', status: 'Resolved', priority: 'Low', date: '2026-03-23' },
]