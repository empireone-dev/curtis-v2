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
} from 'chart.js';

// 1. Register the required modules with Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

// 2. Options can remain outside since they are static
const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'top',
        },
    },
};

// Default props_data to an empty array to prevent map errors before data loads
const CreatedTicketStatsSection = ({ props_data = [] }) => {

    // 3. Extract the labels and data points dynamically from the Laravel response
    const chartLabels = props_data.map(item => item.name);
    const chartValues = props_data.map(item => item.tickets);

    // 4. Construct the chartData object using the extracted data
    const chartData = {
        labels: chartLabels,
        datasets: [
            {
                label: 'Tickets Created',
                data: chartValues,
                borderColor: 'rgb(136, 132, 216)', // Purple line
                backgroundColor: 'rgba(136, 132, 216, 0.5)',
                tension: 0.1, // Adds a slight curve to the line; set to 0 for straight lines
            }
        ],
    };

    return (
        <div className="flex-1 basis-[500px] min-w-[300px] p-5 bg-white border border-gray-200 rounded-xl">
            <h3 className="mb-5 text-lg font-semibold text-gray-700">
                Number of Ticket Created
            </h3>
            <div className="w-full h-[350px]">
                <div style={{ width: '100%', height: '300px' }}>
                    {/* Render the chart with dynamic data */}
                    <Line options={options} data={chartData} />
                </div>
            </div>
        </div>
    );
};

export default CreatedTicketStatsSection;