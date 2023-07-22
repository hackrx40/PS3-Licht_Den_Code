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

  const [loading, setLoading] = useState(true);

  const [lastClosePrice, setLastClosePrice] = useState('');
  const [secondLastClosePrice, setSecondLastClosePrice] = useState('');
  const [percentageChange, setPercentageChange] = useState('');

  const stockOptions = [
    { value: 'BRTI.NS', label: 'Bharti Airtel Limited' },
    { value: 'POWERGRID.NS', label: 'Power Grid Corporation of India' },
    { value: 'ICICIBANK.NS', label: 'ICICI Bank Limited' },
    { value: 'ASIANPAINT.NS', label: 'Asian Paints Limited' },
    { value: 'BRITANNIA.NS', label: 'Britannia Industries Limited' },
    { value: 'INFY.NS', label: 'Infosys Limited' },
    { value: 'NTPC.NS', label: 'NTPC Limited' },
    { value: 'CIPLA.NS', label: 'Cipla Limited' },
    { value: 'ONGC.NS', label: 'Oil and Natural Gas Corporation Limited' },
    { value: 'HDFCBANK.NS', label: 'HDFC Bank Limited' },
    { value: 'SUNPHARMA.NS', label: 'Sun Pharmaceutical Industries Limited' },
    { value: 'EICHERMOT.NS', label: 'Eicher Motors Limited' },
    { value: 'TECHM.NS', label: 'Tech Mahindra Limited' },
    { value: 'M&M.NS', label: 'Mahindra & Mahindra Limited' },
    { value: 'AXISBANK.NS', label: 'Axis Bank Limited' },
    { value: 'RELIANCE.NS', label: 'Reliance Industries Limited' },
    { value: 'WIPRO.NS', label: 'Wipro Limited' },
    { value: 'HINDALCO.NS', label: 'Hindalco Industries Limited' },
    { value: 'HINDUNILVR.NS', label: 'Hindustan Unilever Limited' },
    { value: 'SBILIFE.NS', label: 'SBI Life Insurance Company Limited' },
    { value: 'ULTRACEMCO.NS', label: 'UltraTech Cement Limited' },
    { value: 'APOLLOHOSP.NS', label: 'Apollo Hospitals Enterprise Limited' },
    { value: 'HDFC.NS', label: 'Housing Development Finance Corporation Limited' },
    { value: 'BAJAJFINSV.NS', label: 'Bajaj Finserv Limited' },
    { value: 'COALINDIA.NS', label: 'Coal India Limited' },
    { value: 'DRREDDY.NS', label: "Dr. Reddy's Laboratories Limited" },
    { value: 'ITC.NS', label: 'ITC Limited' },
    { value: 'HEROMOTOCO.NS', label: 'Hero MotoCorp Limited' },
    { value: 'DIVISLAB.NS', label: "Divi's Laboratories Limited" },
    { value: 'GRASIM.NS', label: 'Grasim Industries Limited' },
    { value: 'HCLTECH.NS', label: 'HCL Technologies Limited' },
    { value: 'TCS.NS', label: 'Tata Consultancy Services Limited' },
    { value: 'UPL.NS', label: 'UPL Limited' },
    { value: 'KOTAKBANK.NS', label: 'Kotak Mahindra Bank Limited' },
    { value: 'TATACONSUM.NS', label: 'Tata Consumer Products Limited' },
    { value: 'INDUSINDBK.NS', label: 'IndusInd Bank Limited' },
    { value: 'JSWSTEEL.NS', label: 'JSW Steel Limited' },
    { value: 'LT.NS', label: 'Larsen & Toubro Limited' },
    { value: 'SBIN.NS', label: 'State Bank of India' },
    { value: 'TATAMOTORS.NS', label: 'Tata Motors Limited' },
    { value: 'HDFCLIFE.NS', label: 'HDFC Life Insurance Company Limited' },
    { value: 'MARUTI.NS', label: 'Maruti Suzuki India Limited' },
    { value: 'BPCL.NS', label: 'Bharat Petroleum Corporation Limited' },
    { value: 'TITAN.NS', label: 'Titan Company Limited' },
    { value: 'BAJFINANCE.NS', label: 'Bajaj Finance Limited' },
    { value: 'ADANIPORTS.NS', label: 'Adani Ports and Special Economic Zone Limited' },
    { value: 'NESTLEIND.NS', label: 'Nestlé India Limited' },
    { value: 'TATASTEEL.NS', label: 'Tata Steel Limited' },
    { value: 'ADANIENT.NS', label: 'Adani Enterprises Limited' },
    { value: 'BAJAJ-AUTO.NS', label: 'Bajaj Auto Limited' },
  ];
  const stockOptionsDict = stockOptions.reduce((acc, option) => {
    acc[option.value] = option.label;
    return acc;
  }, {});


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
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
              borderColor: 'white' // Set graph color based on percentage change
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
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);

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
        radius: 1, // Set the radius of the data points to 0 to remove dots
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
          {loading?(
        <div className="animate-pulse">
        <div className="bg-gray-400 h-4 w-64 mb-2 rounded-md"></div>
        <div className="bg-gray-500 h-4 w-36 rounded-md"></div>
      </div>
      ):(
            <div className="min-w-0 flex flex-col items-start">
              <p className="text-sm font-bold leading-5 text-white">{ticker}</p>
              <p className="mt-1 truncate text-xs leading-5 text-slate-400 overflow-auto">{stockLabel}</p>
            </div>
      )}
            </div>
            {!loading && (
            <div className='flex flex-row'>
            <div className="hidden xl:block xl:w-32 xl:h-auto w-36 h-20 text-right mr-4 ">
              <Line data={chartData} options={chartOptions} />
            </div>
          <div className="flex flex-col items-end">
            <p className="text-sm font-bold leading-6 text-white">{lastClosePrice}</p>
            <p className={`mt-1 text-sm leading-5 ${colour} p-1 rounded-md text-white`}>{percentageChange}%</p>
          </div>
          </div>)}
        </li>
      </Tilt>

    </div>
  );
}

