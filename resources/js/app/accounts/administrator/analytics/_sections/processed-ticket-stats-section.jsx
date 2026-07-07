import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// 1. Register the required modules with Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);
export default function ProcessedTicketStatsSection() {

    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
        },
    };

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Sales',
                data: [4000, 3000, 2000, 2780, 1890, 2390, 3490],
                borderColor: 'rgb(136, 132, 216)',
                backgroundColor: 'rgba(136, 132, 216, 0.5)',
            },
            {
                label: 'Profit',
                data: [2400, 1398, 9800, 3908, 4800, 3800, 4300],
                borderColor: 'rgb(130, 202, 157)',
                backgroundColor: 'rgba(130, 202, 157, 0.5)',
            },
        ],
    };
    return (
        <div>
            <div className="flex-1 basis-[500px] min-w-[300px] p-5 bg-white border border-gray-200 rounded-xl">
                <h3 className="mb-5 text-lg font-semibold text-gray-700">
                   Number of ticket processed
                </h3>
                <div className="w-full h-[350px]">
                    <Bar options={options} data={chartData} />
                </div>
            </div>
        </div>
    )
}
