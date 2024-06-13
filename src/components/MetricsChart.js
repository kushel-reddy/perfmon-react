import React from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import './MetricsChart.css';

const MetricsChart = ({ data, title }) => {
  const chartData = {
    labels: data.map(d => d.timestamp),
    datasets: [
      {
        label: title,
        data: data.map(d => d.value),
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  return (
    <div className="chart-container">
      <Line datasetIdKey='id' data={chartData} />
    </div>
  );
};

export default MetricsChart;
