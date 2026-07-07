import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// 1. Register the Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// --- MOCK DATA ---

// Bar Chart Data: Ticket Age Distribution
const ticketAgeData = {
  labels: ['< 24 Hours', '1 - 3 Days', '4 - 7 Days', '> 7 Days'],
  datasets: [
    {
      label: 'Number of Tickets',
      data: [120, 65, 30, 15], 
      backgroundColor: [
        '#10b981', // Emerald (Good - under 24h)
        '#3b82f6', // Blue (Okay - 1 to 3 days)
        '#f59e0b', // Amber (Warning - 4 to 7 days)
        '#ef4444', // Red (Critical - over 7 days)
      ],
      borderRadius: 4,
    },
  ],
};

// --- CHART OPTIONS ---
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false, // Hidden because the colors/labels speak for themselves
    },
    tooltip: {
      callbacks: {
        label: function(context) {
          return ` ${context.raw} Tickets`;
        }
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Number of Tickets',
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

export default function PerformanceMetrixSection() {
  return (
    <div className="p-5 font-sans">
      <h2 className="mb-6 text-2xl font-bold text-gray-900">
        Overall Performance Metrics
      </h2>

      {/* --- KPI SUMMARY CARDS --- */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-8">
        
        {/* Ticket Age KPI */}
        <div className="flex items-center p-6 bg-white border border-gray-200 shadow-sm rounded-xl">
          <div className="p-3 mr-4 bg-purple-50 rounded-full">
            {/* Calendar/Clock Icon */}
            <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium tracking-wide text-gray-500 uppercase">Avg Ticket Age</p>
            <p className="text-2xl font-bold text-gray-900">2.4 <span className="text-sm font-normal text-gray-500">Days</span></p>
          </div>
        </div>

        {/* Resolution Rate KPI */}
        <div className="flex items-center p-6 bg-white border border-gray-200 shadow-sm rounded-xl">
          <div className="p-3 mr-4 bg-blue-50 rounded-full">
            {/* Check Badge Icon */}
            <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium tracking-wide text-gray-500 uppercase">Resolution Rate</p>
            <p className="text-2xl font-bold text-gray-900">86<span className="text-sm font-normal text-gray-500">%</span></p>
          </div>
        </div>

        {/* CSAT KPI */}
        <div className="flex items-center p-6 bg-white border border-gray-200 shadow-sm rounded-xl">
          <div className="p-3 mr-4 bg-yellow-50 rounded-full">
            {/* Star Icon */}
            <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium tracking-wide text-gray-500 uppercase">CSAT Score</p>
            <p className="text-2xl font-bold text-gray-900">4.7 <span className="text-sm font-normal text-gray-500">/ 5.0</span></p>
          </div>
        </div>

      </div>

      {/* --- CHART SECTION --- */}
      <div className="w-full p-5 bg-white border border-gray-200 rounded-xl">
        <h3 className="mb-4 text-lg font-semibold text-gray-700">
          Ticket Age Distribution (Currently Open)
        </h3>
        <p className="mb-6 text-sm text-gray-500">
          A breakdown of how long current tickets have been sitting unresolved.
        </p>
        <div className="w-full h-[350px]">
          <Bar options={chartOptions} data={ticketAgeData} />
        </div>
      </div>

    </div>
  );
}