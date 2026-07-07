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
            {/* --- BAR GRAPH SECTION --- */}
            <div>
                <h2>Sales vs Profit (Bar Graph)</h2>
                <div style={{ width: '100%', height: '300px' }}>
                    <Bar options={options} data={chartData} />
                </div>
            </div>

        </div>
    )
}
