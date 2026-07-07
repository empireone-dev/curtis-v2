import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';

// 1. Register the Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

// --- MOCK DATA ---
const ticketAgeData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
        {
            label: 'Avg Ticket Age (Days)',
            data: [2.1, 2.3, 2.4, 2.2, 2.5, 2.8, 2.4], // Mock data in days
            borderColor: '#a855f7', // Purple
            backgroundColor: 'rgba(168, 85, 247, 0.1)', // Light transparent purple for fill
            fill: true,
            tension: 0.4, // Smooth curve
            pointBackgroundColor: '#a855f7',
            pointBorderWidth: 2,
            pointRadius: 4,
        },
    ],
};

// --- CHART OPTIONS ---
const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false, // Hidden to keep the UI clean
        },
        tooltip: {
            callbacks: {
                label: function (context) {
                    return `${context.parsed.y} Days`;
                }
            }
        }
    },
    scales: {
        y: {
            beginAtZero: true,
            title: {
                display: true,
                text: 'Days',
                color: '#6b7280'
            },
            grid: {
                color: '#e5e7eb',
            },
        },
        x: {
            grid: {
                display: false,
            },
        },
    },
};

export default function TicketAgeSection() {
    return (
        <div className="p-5 font-sans">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">
                Average Ticket Age
            </h2>

            <div className="flex flex-col gap-6">

                {/* --- KPI SUMMARY CARD --- */}
                <div className="flex items-center p-6 bg-white border border-gray-200 shadow-sm rounded-xl">
                    <div className="p-4 mr-4 bg-purple-50 rounded-full">
                        {/* SVG Icon representing a calendar/clock */}
                        <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Overall Average</p>
                        <p className="text-3xl font-bold text-gray-900">2.4 <span className="text-lg font-normal text-gray-500">Days</span></p>
                    </div>
                </div>

                {/* --- TREND CHART --- */}
                <div className="w-full p-5 bg-white border border-gray-200 rounded-xl">
                    <h3 className="mb-4 text-lg font-semibold text-gray-700">
                        Ticket Age Trend (Last 7 Days)
                    </h3>
                    <div className="w-full h-[300px]">
                        <Line options={chartOptions} data={ticketAgeData} />
                    </div>
                </div>

            </div>
        </div>
    );
}