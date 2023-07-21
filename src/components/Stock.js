import React, { useState, useEffect } from 'react';
import Tilt from 'react-parallax-tilt';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

export default function Stock({ ticker }) {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Price',
        data: [],
        fill: true,
        borderColor: 'white',
        tension: 0.4,
      },
    ],
  });

  const [lastClosePrice, setLastClosePrice] = useState('');
  const [secondLastClosePrice, setSecondLastClosePrice] = useState('');
  const [percentageChange, setPercentageChange] = useState('');

  const stockOptions = [
    { value: 'ADANIENT.NS', label: 'ADANI ENTERPRISES' },
    { value: 'ADANIPORTS.NS', label: 'ADANI PORTS & SEZ' },
    { value: 'APOLLOHOSP.NS', label: 'APOLLO HOSPITALS' },
    { value: 'ASIANPAINT.NS', label: 'ASIAN PAINTS' },
    { value: 'AXISBANK.NS', label: 'AXIS BANK' },
    { value: 'BAJAJ-AUTO.NS', label: 'BAJAJ AUTO' },
    { value: 'BAJFINANCE.NS', label: 'BAJAJ FINANCE' },
    { value: 'BAJAJFINSV.NS', label: 'BAJAJ FINSERV' }, // Corrected ticker name
    { value: 'BHARTIARTL.NS', label: 'BHARTI AIRTEL' }, // Corrected ticker name
    { value: 'BPCL.NS', label: 'BPCL' },
    { value: 'CIPLA.NS', label: 'CIPLA' },
    { value: 'COALINDIA.NS', label: 'COAL INDIA' },
    { value: 'DIVISLAB.NS', label: 'DIVIS LABORATORIES' },
    { value: 'DRREDDY.NS', label: 'DR. REDDYS LAB' },
    { value: 'EICHERMOT.NS', label: 'EICHER MOTORS' },
    { value: 'GRASIM.NS', label: 'GRASIM' },
    { value: 'HCLTECH.NS', label: 'HCL TECHNOLOGIES' },
    { value: 'HDFCBANK.NS', label: 'HDFC BANK' },
    { value: 'HDFCLIFE.NS', label: 'HDFC LIFE INSURANCE' },
    { value: 'HEROMOTOCO.NS', label: 'HERO MOTOCORP' },
    { value: 'HINDALCO.NS', label: 'HINDALCO' },
    { value: 'HINDUNILVR.NS', label: 'HUL' },
    { value: 'ICICIBANK.NS', label: 'ICICI BANK' },
    { value: 'INDUSINDBK.NS', label: 'INDUSIND BANK' },
    { value: 'INFY.NS', label: 'INFOSYS' },
    { value: 'IOC.NS', label: 'IOC' },
    { value: 'ITC.NS', label: 'ITC' },
    { value: 'JSWSTEEL.NS', label: 'JSW STEEL' },
    { value: 'KOTAKBANK.NS', label: 'KOTAK MAHINDRA BANK' },
    { value: 'LT.NS', label: 'L&T' },
    { value: 'M&M.NS', label: 'M&M' },
    { value: 'MARUTI.NS', label: 'MARUTI SUZUKI' },
    { value: 'NESTLEIND.NS', label: 'NESTLE' },
    { value: 'NTPC.NS', label: 'NTPC' },
    { value: 'ONGC.NS', label: 'ONGC' },
    { value: 'POWERGRID.NS', label: 'POWER GRID' },
    { value: 'RELIANCE.NS', label: 'RELIANCE IND.' },
    { value: 'SBIN.NS', label: 'SBI' },
    { value: 'SBILIFE.NS', label: 'SBI LIFE INSURANCE' },
    { value: 'SUNPHARMA.NS', label: 'SUN PHARMA' },
    { value: 'TATACONSUM.NS', label: 'TATA CONSUMER' },
    { value: 'TATAMOTORS.NS', label: 'TATA MOTORS' },
    { value: 'TATASTEEL.NS', label: 'TATA STEEL' },
    { value: 'TCS.NS', label: 'TCS' },
    { value: 'TECHM.NS', label: 'TECH MAHINDRA' },
    { value: 'TITAN.NS', label: 'TITAN' },
    { value: 'ULTRACEMCO.NS', label: 'ULTRATECH CEMENT' },
    { value: 'UPL.NS', label: 'UPL' },
    { value: 'WIPRO.NS', label: 'WIPRO' },
  ];

  const stockOptionsDict = stockOptions.reduce((acc, option) => {
    acc[option.value] = option.label;
    return acc;
  }, {});


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://ff0a-103-68-38-66.ngrok-free.app/yfin/graph', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ symbol: ticker }),
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
              borderColor: percentageChange >= 0 ? 'green' : 'red' // Set graph color based on percentage change
            },
          ],
        };

        setChartData(chartDataUpdated);

        // Update the lastClosePrice and secondLastClosePrice states with the last two close prices from the API response
        if (sortedData.length >= 2) {
          const lastClose = sortedData[sortedData.length - 1].closePrice;
          const secondLastClose = sortedData[sortedData.length - 2].closePrice;
          setLastClosePrice(lastClose.toFixed(2).toLocaleString());
          setSecondLastClosePrice(secondLastClose.toFixed(2).toLocaleString());

          // Calculate the percentage change
          const change = lastClose - secondLastClose;
          const percentageChange = ((change / secondLastClose) * 100).toFixed(2);
          setPercentageChange(percentageChange);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [ticker]);

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
    elements: {
      point: {
        radius: 0, // Set the radius of the data points to 0 to remove dots
      },
    },
  };

    
const colour= (percentageChange>= 0 ? 'bg-green-600' : 'bg-red-600')
const stockLabel = stockOptionsDict[ticker];
  return (
    <div>
      <Tilt tiltMaxAngleX={4} tiltMaxAngleY={4}>
        <li className="flex justify-between gap-x-6 p-5 rounded-lg bg-gray-700 mb-1">
          <div className="flex gap-x-4">
            
            <div className="min-w-0 flex flex-col items-start">
              <p className="text-sm font-bold leading-5 text-white">{ticker}</p>
              <p className="mt-1 truncate text-xs leading-5 text-slate-400">{stockLabel}</p>
            </div>
            </div>
            <div className='flex flex-row'>
            <div className="hidden xl:block xl:w-32 xl:h-auto w-36 h-20 text-right  ">
              <Line data={chartData} options={chartOptions} />
            </div>
          <div className="flex flex-col items-end">
            <p className="text-sm font-bold leading-6 text-white">{lastClosePrice}</p>
            <p className={`mt-1 text-sm leading-5 ${colour} p-1 rounded-md text-white`}>{percentageChange}%</p>
          </div>
          </div>
        </li>
      </Tilt>
    </div>
  );
}

