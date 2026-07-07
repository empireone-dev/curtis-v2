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
const customerResponseData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Avg Customer Response (Hours)',
      data: [4.5, 3.8, 4.1, 4.8, 4.2, 5.5, 4.0], // Mock data in hours around the 4.2h average
      borderColor: '#6366f1', // Indigo
      backgroundColor: 'rgba(99, 102, 241, 0.1)', // Light transparent indigo for fill
      fill: true,
      tension: 0.4, // Smooth curve
      pointBackgroundColor: '#6366f1',
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
      display: false, // Hidden to keep it clean
    },
    tooltip: {
      callbacks: {
        label: function(context) {
          return `${context.parsed.y} Hours`;
        }
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Hours',
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

export default function CustomerResponseTimeSection() {
  return (
    <div className="p-5 font-sans">
      <h2 className="mb-6 text-2xl font-bold text-gray-900">
        Customer Response Time
      </h2>

      <div className="flex flex-col gap-6">
        
        {/* --- KPI SUMMARY CARD --- */}
        <div className="flex items-center p-6 bg-white border border-gray-200 shadow-sm rounded-xl">
          <div className="p-4 mr-4 bg-indigo-50 rounded-full">
            {/* SVG Icon representing a user and time */}
            <svg className="w-8 h-8 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Overall Average</p>
            <p className="text-3xl font-bold text-gray-900">4.2 <span className="text-lg font-normal text-gray-500">Hours</span></p>
          </div>
        </div>

        {/* --- TREND CHART --- */}
        <div className="w-full p-5 bg-white border border-gray-200 rounded-xl">
          <h3 className="mb-4 text-lg font-semibold text-gray-700">
            Customer Response Trend (Last 7 Days)
          </h3>
          <div className="w-full h-[300px]">
            <Line options={chartOptions} data={customerResponseData} />
          </div>
        </div>

      </div>
    </div>
  );
}