import React from 'react';
import Tilt from 'react-parallax-tilt';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto'

export default function Stock() {
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul','Aug','Sept','Oct','Nov','Dec'],
    datasets: [
      {
        label: 'Price',
        data: [4, 12, 20, 13, 6,12,14,22,32,23,21,33],
        fill: true,
        borderColor: 'white',
        tension: 0.4,
      },
    ],
  };
  const chartOptions = {
    scales: {
      x: {
        display: false, // Hide x-axis scale and labels
      },
      y: {
        display: false, // Hide y-axis scale and labels
      },
    },
    plugins: {
      legend: {
        display: false, // Hide legend
      },
    },
  };

  return (
    <div>
      <Tilt tiltMaxAngleX={4} tiltMaxAngleY={4}>
        <li className="flex justify-between gap-x-6 p-5 rounded-lg bg-gray-700 mb-1">
          <div className="flex gap-x-4">
            <div className="min-w-0 flex flex-col items-start">
              <p className="text-sm font-bold leading-5 text-white">Stock Ticker</p>
              <p className="mt-1 truncate text-xs leading-5 text-slate-400">Company Name</p>
            </div>
            <div className="hidden xl:block xl:w-32 xl:h-auto">
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>
          <div className="flex flex-col items-end">
            <p className="text-sm font-bold leading-6 text-white">Price</p>
            <p className="mt-1 text-sm leading-5 text-white bg-red-600 p-1 rounded-md">% Change</p>
          </div>
        </li>
      </Tilt>

      <Tilt tiltMaxAngleX={4} tiltMaxAngleY={4}>
        <li className="flex justify-between gap-x-6 p-5 rounded-lg bg-gray-700 mb-1">
          <div className="flex gap-x-4">
            <div className="min-w-0 flex flex-col items-start">
              <p className="text-sm font-bold leading-6 text-white">Stock Ticker</p>
              <p className="mt-1 truncate text-xs leading-5 text-slate-400">Company Name</p>
            </div>
            <div className="hidden xl:block xl:w-32 xl:h-auto">
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>
          <div className="flex flex-col items-end">
            <p className="text-sm font-bold leading-6 text-white">Price</p>
            <p className="mt-1 text-sm leading-5 text-white bg-green-600 p-1 rounded-md">% Change</p>
          </div>
        </li>
      </Tilt>
    </div>
  );
}
