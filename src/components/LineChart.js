import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

export default function LineChart({ symbol }) {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Price',
        data: [],
        fill: true,
        borderColor: 'green',
        tension: 0.4,
      },
    ],
  });

  const [lastClosePrice, setLastClosePrice] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://2c37-103-149-94-242.ngrok-free.app/yfin/graph', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ symbol: symbol === 2 ? '^BSESN' : '^NSEI' }),
        });

        const data = await response.json();

        // Assuming the API response is an array of objects with 'closePrice' and 'date' properties
        const sortedData = data.sort((a, b) => new Date(a.date) - new Date(b.date));
        const chartDataUpdated = {
          labels: sortedData.map(item => new Date(item.date).toLocaleDateString()), // Using 'date' as labels
          datasets: [
            {
              ...chartData.datasets[0],
              data: sortedData.map(item => item.closePrice), // Using 'closePrice' as data
            },
          ],
        };

        setChartData(chartDataUpdated);

        // Update the lastClosePrice state with the last close price from the API response
        if (sortedData.length > 0) {
          const lastClose = sortedData[sortedData.length - 1].closePrice;
          setLastClosePrice(lastClose.toFixed(2).toLocaleString());
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [symbol]);

  const chartOptions = {
    scales: {
      x: {
        display: true, // Show x-axis scale and labels
      },
      y: {
        display: true, // Show y-axis scale and labels
      },
    },
    plugins: {
      legend: {
        display: false, // Hide legend
      },
    },
  };

  return (
    <div className='bg-gray-800 px-3 py-2 mx-2 rounded-lg flex flex-col w-full'>
      <div className='flex flex-row justify-between items-center pb-1'>
      {symbol==1 && <h1 className='text-3xl font-extrabold tracking-tight text-white sm:text-2xl'>Nifty-50(^NSEI)</h1>}
      {symbol==2 && <h1 className='text-3xl font-extrabold tracking-tight text-white sm:text-2xl'>Sensex (^BSESN)</h1>}
        <p className="ml-2 text-3xl font-extrabold tracking-tight text-white sm:text-xl bg-gray-700 p-1 rounded-lg">
          {lastClosePrice}
        </p>
      </div>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
}
