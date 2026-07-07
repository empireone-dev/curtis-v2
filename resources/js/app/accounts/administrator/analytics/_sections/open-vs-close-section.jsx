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

// --- MOCK DATA ---
const totalTickets = 230;
const openTickets = 45;
const closedTickets = 185;

const statusData = {
    labels: ['Open Tickets', 'Closed Tickets'],
    datasets: [
        {
            data: [openTickets, closedTickets],
            backgroundColor: ['#f59e0b', '#10b981'], // Amber for Open, Emerald for Closed
            hoverBackgroundColor: ['#d97706', '#059669'], // Slightly darker on hover
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
                    const value = context.parsed;
                    const percentage = ((value / totalTickets) * 100).toFixed(1);
                    return ` ${context.label}: ${value} (${percentage}%)`;
                }
            }
        }
    },
};

export default function OpenVsCloseSection() {
    return (
        <div className="p-5 font-sans">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">
                Ticket Status Ratio
            </h2>

            <div className="flex flex-col md:flex-row gap-6">

                {/* --- KPI SUMMARY CARDS --- */}
                <div className="flex flex-col gap-4 md:w-1/3">

                    <div className="flex items-center p-6 bg-white border border-gray-200 shadow-sm rounded-xl">
                        <div className="p-3 mr-4 bg-amber-50 rounded-full">
                            {/* Folder open icon */}
                            <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm font-medium tracking-wide text-gray-500 uppercase">Open</p>
                            <p className="text-2xl font-bold text-gray-900">{openTickets}</p>
                        </div>
                    </div>

                    <div className="flex items-center p-6 bg-white border border-gray-200 shadow-sm rounded-xl">
                        <div className="p-3 mr-4 bg-emerald-50 rounded-full">
                            {/* Check circle icon */}
                            <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm font-medium tracking-wide text-gray-500 uppercase">Closed</p>
                            <p className="text-2xl font-bold text-gray-900">{closedTickets}</p>
                        </div>
                    </div>

                </div>

                {/* --- DOUGHNUT CHART --- */}
                <div className="flex-1 p-5 bg-white border border-gray-200 rounded-xl flex flex-col items-center justify-center">
                    <h3 className="w-full mb-2 text-lg font-semibold text-gray-700 text-left">
                        Current Open vs. Closed
                    </h3>
                    <div className="relative w-full h-[300px] flex justify-center items-center">
                        <Doughnut options={chartOptions} data={statusData} />

                        {/* Center Text inside the Doughnut */}
                        <div className="absolute flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-3xl font-bold text-gray-900">{totalTickets}</span>
                            <span className="text-sm text-gray-500">Total</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}