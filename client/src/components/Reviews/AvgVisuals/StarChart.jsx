import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
import PropTypes from 'prop-types';

const StarChart = ({ ratings }) => {

  const chartRef = React.useRef(null);

  React.useEffect(() => {
    const chartInstance = chartRef.current?.chartInstance;
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, []);

  if (!ratings) {
    return;
  }

  const newChart = {
    labels: ['5 stars', '4 Stars', '3 Stars', '2 Stars', '1 Stars'],
    datasets: [
      {
        barThickness: 10,
        data: [ratings[5], ratings[4], ratings[3], ratings[2], ratings[1]],
        backgroundColor: 'rgb(128, 128, 128)',
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 0,
      },
      line: {
        borderWidth: 0,
      },
      point: {
        borderWidth: 0,
      }
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'none',
        intersect: false,
      },
    },
    scales: {
      x: {
        border: {
          display: false,
        },
        grid: {
          drawBorder: false,
          drawTicks: false,
          display: false,
        },
        ticks: {
          beginAtZero: true,
          display: false
        }
      },
      y: {
        border: {
          display: false,
        },
        grid: {
          drawBorder: false,
          drawTicks: false,
          display: false,
        },
        ticks: {
          display: true,
        },
      },
    },
  };

  return <Bar
  data={newChart}
  width={10}
  height={100}
  options={options} />
}

StarChart.propTypes = {
  ratings: PropTypes.object.isRequired,
};

export default StarChart;