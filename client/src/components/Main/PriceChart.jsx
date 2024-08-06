import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const PriceChart = () => {
    const data = {
        labels: ['Store 1', 'Store 2', 'Store 3', 'Store 4', 'Store 5'],
        datasets: [
            {
                label: 'Average Price',
                data: [12, 19, 3, 5, 2],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        maintainAspectRatio: false, // Make the chart responsive
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="price-chart-container">
            <h3>סטטיסטיקת מחירים בחנויות מזון</h3>
            <div className="chart-wrapper">
                <Bar data={data} options={options} />
            </div>
        </div>
    );
};

export default PriceChart;
