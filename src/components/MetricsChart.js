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

  const chartOptions = {
    scales: {
      y: {
        title: {
          display: true,
          text: 'Usage %',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Time',
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: title,
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            const value = context.parsed.y.toFixed(2);
            const index = context.dataIndex;
            console.log("hellooo", data[0])
            const command = data[0].data[index].command;
            return `${label} ${value} | ${command}`;
          }
        }
      },
    },
  };

  return (
    <div className="chart-container">
      <Line datasetIdKey='id' data={chartData} options={chartOptions} />
    </div>
  );
};

export default MetricsChart;
