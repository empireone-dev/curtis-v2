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
  Filler // Imported for the area fill effect under the line
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
const responseTimeData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Avg Response Time (Hours)',
      data: [2.4, 2.1, 1.8, 1.5, 1.7, 1.9, 1.6], // Mock data in hours
      borderColor: '#06b6d4', // Cyan
      backgroundColor: 'rgba(6, 182, 212, 0.1)', // Light transparent cyan for fill
      fill: true, // Fills the area under the line
      tension: 0.4, // Smooth curve
      pointBackgroundColor: '#06b6d4',
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
      display: false, // Hidden since the title explains it
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
        color: '#e5e7eb', // Light gray grid lines
      },
    },
    x: {
      grid: {
        display: false, // Hides vertical grid lines
      },
    },
  },
};

export default function CompanyResponseTimeSection() {
  return (
    <div className="p-5 font-sans">
      <h2 className="mb-6 text-2xl font-bold text-gray-900">
        Company Response Time
      </h2>

      <div className="flex flex-col gap-6">
        
        {/* --- KPI SUMMARY CARD --- */}
        <div className="flex items-center p-6 bg-white border border-gray-200 shadow-sm rounded-xl">
          <div className="p-4 mr-4 bg-cyan-50 rounded-full">
            {/* Simple SVG icon representing time/speed */}
            <svg className="w-8 h-8 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Overall Average</p>
            <p className="text-3xl font-bold text-gray-900">1.8 <span className="text-lg font-normal text-gray-500">Hours</span></p>
          </div>
        </div>

        {/* --- TREND CHART --- */}
        <div className="w-full p-5 bg-white border border-gray-200 rounded-xl">
          <h3 className="mb-4 text-lg font-semibold text-gray-700">
            Response Time Trend (Last 7 Days)
          </h3>
          <div className="w-full h-[300px]">
            <Line options={chartOptions} data={responseTimeData} />
          </div>
        </div>

      </div>
    </div>
  );
}