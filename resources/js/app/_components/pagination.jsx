
import React from 'react'


export default function Pagination({
    currentPage = 1,
    totalPages = 1,
    onPageChange,
    pageSize,
    onPageSizeChange,
    pageSizeOptions = [10, 20, 50, 100],
    totalItems,
}) {
    // Helper to generate page numbers with ellipsis (e.g. 1 ... 4 5 6 ... 10)
    const getPageNumbers = () => {
        const pages = []
        const delta = 1 // Number of pages around current page

        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 ||
                i === totalPages ||
                (i >= currentPage - delta && i <= currentPage + delta)
            ) {
                pages.push(i)
            } else if (pages[pages.length - 1] !== '...') {
                pages.push('...')
            }
        }
        return pages
    }

    // Calculate item range for displaying "Showing X to Y of Z results"
    const startItem = totalItems && pageSize ? (currentPage - 1) * pageSize + 1 : null
    const endItem =
        totalItems && pageSize ? Math.min(currentPage * pageSize, totalItems) : null

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white border border-slate-200/80 rounded-2xl shadow-sm text-sm text-slate-600 font-sans">

            {/* Left section: Rows per page & item count */}
            <div className="flex flex-wrap items-center gap-4 text-xs">
                {pageSize && onPageSizeChange && (
                    <div className="flex items-center gap-2">
                        <span>Rows per page:</span>
                        <select
                            value={pageSize}
                            onChange={(e) => onPageSizeChange(Number(e.target.value))}
                            className="bg-slate-50 border w-24 border-slate-200 rounded-lg px-2.5 py-1 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
                        >
                            {pageSizeOptions.map((size) => (
                                <option key={size} value={size}>
                                    {size}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {totalItems !== undefined && (
                    <span className="text-slate-500">
                        {startItem && endItem ? (
                            <>
                                Showing <strong className="text-slate-800">{startItem}</strong> to{' '}
                                <strong className="text-slate-800">{endItem}</strong> of{' '}
                                <strong className="text-slate-800">{totalItems}</strong> entries
                            </>
                        ) : (
                            <>
                                Total: <strong className="text-slate-800">{totalItems}</strong> entries
                            </>
                        )}
                    </span>
                )}
            </div>

            {/* Right section: Page numbers navigation */}
            <div className="flex items-center gap-1">
                {/* Previous Button */}
                <button
                    onClick={() => onPageChange && onPageChange(currentPage - 1)}
                    disabled={currentPage <= 1}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 hover:text-blue-600 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-slate-700 transition-all"
                >
                    ‹ Prev
                </button>

                {/* Page Number Buttons */}
                <div className="flex items-center gap-1 mx-1">
                    {getPageNumbers().map((page, index) => {
                        if (page === '...') {
                            return (
                                <span key={`ellipsis-${index}`} className="px-2 py-1 text-slate-400 select-none">
                                    ...
                                </span>
                            )
                        }

                        const isCurrent = page === currentPage

                        return (
                            <button
                                key={page}
                                onClick={() => onPageChange && onPageChange(page)}
                                className={`min-w-[32px] h-8 px-2 rounded-lg text-xs font-semibold transition-all ${isCurrent
                                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                                    : 'text-slate-600 hover:bg-blue-50 hover:text-blue-600'
                                    }`}
                            >
                                {page}
                            </button>
                        )
                    })}
                </div>

                {/* Next Button */}
                <button
                    onClick={() => onPageChange && onPageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 hover:text-blue-600 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-slate-700 transition-all"
                >
                    Next ›
                </button>
            </div>
        </div>
    )
}