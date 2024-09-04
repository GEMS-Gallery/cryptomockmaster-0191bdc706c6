import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Chart({ data, currentTimeframe, onTimeframeChange, currentPrice, priceChange24h }) {
  const chartData = {
    labels: data ? data.map(item => new Date(item.timestamp)) : [],
    datasets: [{
      label: 'ICP Price (USD)',
      data: data ? data.map(item => item.price) : [],
      borderColor: '#22C55E',
      tension: 0.1
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        ticks: { color: '#6B7280' },
        grid: { color: '#374151' }
      },
      x: {
        type: 'time',
        time: {
          unit: currentTimeframe <= 1 ? 'hour' : 'day',
          displayFormats: {
            hour: 'MMM d, HH:mm',
            day: 'MMM d'
          }
        },
        ticks: {
          color: '#6B7280',
          maxTicksLimit: 8,
          callback: function(value) {
            const date = new Date(value);
            if (currentTimeframe <= 1) {
              return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            } else if (currentTimeframe <= 7) {
              return date.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
            } else {
              return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
            }
          }
        },
        grid: { color: '#374151' }
      }
    },
    plugins: {
      legend: { display: false }
    }
  };

  return (
    <div className="chart-container">
      <div className="chart-header">
        <div>
          <span style={{ color: '#34D399' }}>•</span>
          <span style={{ fontWeight: 'bold' }}>ICP : {currentTimeframe}d</span>
          <span id="price-info" style={{ marginLeft: '0.5rem' }}>
            ${currentPrice.toFixed(2)} ({priceChange24h.toFixed(2)}%)
          </span>
        </div>
        <div className="timeframe-buttons">
          <button onClick={() => onTimeframeChange(1)}>1d</button>
          <button onClick={() => onTimeframeChange(7)}>7d</button>
          <button onClick={() => onTimeframeChange(30)}>30d</button>
        </div>
      </div>
      <Line data={chartData} options={options} />
    </div>
  );
}

export default Chart;