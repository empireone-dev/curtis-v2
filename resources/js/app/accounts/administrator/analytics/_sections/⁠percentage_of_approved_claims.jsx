import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';

// 1. Register the Chart.js components needed for a Doughnut chart
ChartJS.register(ArcElement, Tooltip, Legend);

export default function PercentageOfApprovedClaims({ props_data }) {
    // --- DATA EXTRACTION ---
    // Safely extract the percentages from the passed props, defaulting to 0
    const fastPercentage = props_data?.percentage_fast_approved || 0;
    const slowPercentage = props_data?.percentage_slow_approved || 0;

    // Extract the raw counts for the UI
    const fastCount = props_data?.fast_approved_count || 0;
    const slowCount = props_data?.slow_approved_count || 0;
    const totalCount = props_data?.total_approved_count || 0;

    // Extract the raw lists of tickets for the exports
    const fastList = props_data?.data?.fast_approved || [];
    const slowList = props_data?.data?.slow_approved || [];

    // Calculate total percentage (should naturally be 100, formatting cleanly)
    const totalPercentage = (fastPercentage + slowPercentage).toFixed(0);

    // --- CSV EXPORT LOGIC ---
    const exportToCSV = (dataset, filename) => {
        if (!dataset || dataset.length === 0) {
            alert("No data available to export.");
            return;
        }

        // 1. Extract headers dynamically from the first object's keys
        const headers = Object.keys(dataset[0]).join(',');

        // 2. Map through the data and format rows 
        const rows = dataset.map(obj => {
            return Object.values(obj).map(val => {

                let stringVal = '';

                // Check if the value exists
                if (val !== null && val !== undefined) {
                    // IF the value is an object/array (like the approved_claims relationship)
                    // THEN stringify it into JSON so it doesn't print [object Object]
                    stringVal = typeof val === 'object' ? JSON.stringify(val) : String(val);
                }

                // Escape quotes inside the string and wrap in quotes to prevent comma breaks
                return `"${stringVal.replace(/"/g, '""')}"`;

            }).join(',');
        }).join('\n');

        // 3. Combine headers and rows
        const csvContent = `${headers}\n${rows}`;

        // 4. Create a Blob and trigger the download
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.setAttribute("href", url);
        link.setAttribute("download", filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // --- CHART DATA ---
    const statusData = {
        labels: ['Fast (≤ 3 Days)', 'Slow (> 3 Days)'],
        datasets: [
            {
                data: [fastPercentage, slowPercentage],
                backgroundColor: ['#10b981', '#f59e0b'], // Emerald for Fast, Amber for Slow
                hoverBackgroundColor: ['#059669', '#d97706'], // Slightly darker on hover
                borderWidth: 0, // Removes the border between segments for a cleaner look
                cutout: '75%', // Controls the thickness of the doughnut ring
            },
        ],
    };

    // --- CHART OPTIONS ---
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    usePointStyle: true, // Uses circles instead of boxes in the legend
                    padding: 20,
                    font: {
                        family: 'system-ui, sans-serif',
                        size: 14,
                    }
                },
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        // The value is already a percentage, so we just append the % sign
                        const value = context.parsed;
                        return ` ${context.label}: ${value}%`;
                    }
                }
            }
        },
    };

    return (
        <div className="font-sans">

            <div className="flex flex-col gap-6 md:flex-row">
                {/* --- DOUGHNUT CHART CONTAINER --- */}
                <div className="flex items-center justify-center flex-1 p-5 bg-white border border-gray-200 rounded-xl">

                    {/* Left Column: Headings & Cards */}
                    <div className='flex flex-col justify-center flex-1 w-full gap-3'>
                        <h2 className="w-full mb-2 text-2xl font-semibold text-left text-gray-700">
                            Percentage of Approved Claims
                        </h2>

                        <div className="w-full">
                            <h3 className="mb-6 text-lg font-bold text-gray-900">
                                Web Form — Turnaround Time
                            </h3>

                            {/* --- KPI SUMMARY CARDS --- */}
                            <div className="flex flex-col w-full gap-4 sm:flex-row">

                                {/* Fast Card */}
                                <div className="flex flex-col flex-1 p-6 bg-white border border-gray-200 shadow-sm rounded-xl">
                                    <div className="flex items-center">
                                        <div className="p-3 mr-4 rounded-full bg-emerald-50">
                                            {/* Check circle icon */}
                                            <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium tracking-wide text-gray-500 uppercase">Fast (≤ 3 Days)</p>
                                            <p className="text-2xl font-bold text-gray-900">{fastPercentage}%</p>
                                            <p className="text-xs text-gray-400">Vol: {fastCount}</p>
                                        </div>
                                    </div>
                                    {/* Export Button */}
                                    <button
                                        onClick={() => exportToCSV(fastList, 'fast_approved_claims.csv')}
                                        className="flex items-center justify-center w-full gap-2 py-2 mt-4 text-sm font-medium transition-colors rounded-lg text-emerald-700 bg-emerald-50 hover:bg-emerald-100"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                        Export CSV
                                    </button>
                                </div>

                                {/* Slow Card */}
                                <div className="flex flex-col flex-1 p-6 bg-white border border-gray-200 shadow-sm rounded-xl">
                                    <div className="flex items-center">
                                        <div className="p-3 mr-4 rounded-full bg-amber-50">
                                            {/* Clock icon */}
                                            <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium tracking-wide text-gray-500 uppercase">Slow (&gt; 3 Days)</p>
                                            <p className="text-2xl font-bold text-gray-900">{slowPercentage}%</p>
                                            <p className="text-xs text-gray-400">Vol: {slowCount}</p>
                                        </div>
                                    </div>
                                    {/* Export Button */}
                                    <button
                                        onClick={() => exportToCSV(slowList, 'slow_approved_claims.csv')}
                                        className="flex items-center justify-center w-full gap-2 py-2 mt-4 text-sm font-medium transition-colors rounded-lg text-amber-700 bg-amber-50 hover:bg-amber-100"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                        Export CSV
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* Right Column: The Chart itself */}
                    <div className="relative w-full h-[300px] flex justify-center items-center flex-1">

                        <Doughnut options={chartOptions} data={statusData} />

                        {/* Center Text inside the Doughnut */}
                        <div className="absolute flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-3xl font-bold text-gray-900">{totalPercentage}%</span>
                            <span className="text-sm text-gray-500">{totalCount} Total Claims</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}