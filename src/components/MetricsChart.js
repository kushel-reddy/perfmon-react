import React from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import './MetricsChart.css'; 

const MetricsChart = ({ data, title }) => {
  const chartData = {
    labels: data.length > 0 ? data[0].data.map(d => d.timestamp) : [],
    datasets: data.map((metric, index) => ({
      label: metric.label,
      data: metric.data.map(d => d.value),
      fill: false,
      backgroundColor: `rgba(${75 + index * 50}, ${192 - index * 30}, ${192 - index * 30}, 0.4)`,
      borderColor: `rgba(${75 + index * 50}, ${192 - index * 30}, ${192 - index * 30}, 1)`,
    })),
  };

  return (
    <div className="chart-container">
      <Line datasetIdKey='id' data={chartData} />
    </div>
  );
};

export default MetricsChart;
