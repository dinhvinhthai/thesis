import React from "react";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";

const BarChart = ( { name, chartData } ) =>
{
    const labels = [ "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12" ];
    const data = {
        labels: labels,
        datasets: [
            {
                label: name,
                backgroundColor: "#005663",
                borderColor: "#005663",
                data: chartData
            },
        ],
    };
    return (
        <div>
            <Bar data={ data } />
        </div>
    );
};

export default BarChart;