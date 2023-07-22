import React, { useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Navbar from '../components/Navbar';
import Phone from '../components/Phone';
import axios from 'axios';
import Navbar2 from '../components/Navbar2';
import {  useNavigate } from 'react-router-dom';

const animatedComponents = makeAnimated();

export default function PreferencesForm() {
  const [stockList, setStockList] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [risk, setRisk] = useState('');

  const navigate = useNavigate();

  const stockOptions = [
    { value: 'BHARTIARTL', label: 'Bharti Airtel Limited' },
    { value: 'POWERGRID', label: 'Power Grid Corporation of India' },
    { value: 'ICICIBANK', label: 'ICICI Bank Limited' },
    { value: 'ASIANPAINT', label: 'Asian Paints Limited' },
    { value: 'BRITANNIA', label: 'Britannia Industries Limited' },
    { value: 'INFY', label: 'Infosys Limited' },
    { value: 'NTPC', label: 'NTPC Limited' },
    { value: 'CIPLA', label: 'Cipla Limited' },
    { value: 'ONGC', label: 'Oil and Natural Gas Corporation Limited' },
    { value: 'HDFCBANK', label: 'HDFC Bank Limited' },
    { value: 'SUNPHARMA', label: 'Sun Pharmaceutical Industries Limited' },
    { value: 'EICHERMOT', label: 'Eicher Motors Limited' },
    { value: 'TECHM', label: 'Tech Mahindra Limited' },
    { value: 'M&M', label: 'Mahindra & Mahindra Limited' },
    { value: 'AXISBANK', label: 'Axis Bank Limited' },
    { value: 'RELIANCE', label: 'Reliance Industries Limited' },
    { value: 'WIPRO', label: 'Wipro Limited' },
    { value: 'HINDALCO', label: 'Hindalco Industries Limited' },
    { value: 'HINDUNILVR', label: 'Hindustan Unilever Limited' },
    { value: 'SBILIFE', label: 'SBI Life Insurance Company Limited' },
    { value: 'ULTRACEMCO', label: 'UltraTech Cement Limited' },
    { value: 'APOLLOHOSP', label: 'Apollo Hospitals Enterprise Limited' },
    { value: 'HDFC', label: 'Housing Development Finance Corporation Limited' },
    { value: 'BAJAJFINSV', label: 'Bajaj Finserv Limited' },
    { value: 'COALINDIA', label: 'Coal India Limited' },
    { value: 'DRREDDY', label: "Dr. Reddy's Laboratories Limited" },
    { value: 'ITC', label: 'ITC Limited' },
    { value: 'HEROMOTOCO', label: 'Hero MotoCorp Limited' },
    { value: 'DIVISLAB', label: "Divi's Laboratories Limited" },
    { value: 'GRASIM', label: 'Grasim Industries Limited' },
    { value: 'HCLTECH', label: 'HCL Technologies Limited' },
    { value: 'TCS', label: 'Tata Consultancy Services Limited' },
    { value: 'UPL', label: 'UPL Limited' },
    { value: 'KOTAKBANK', label: 'Kotak Mahindra Bank Limited' },
    { value: 'TATACONSUM', label: 'Tata Consumer Products Limited' },
    { value: 'INDUSINDBK', label: 'IndusInd Bank Limited' },
    { value: 'JSWSTEEL', label: 'JSW Steel Limited' },
    { value: 'LT', label: 'Larsen & Toubro Limited' },
    { value: 'SBIN', label: 'State Bank of India' },
    { value: 'TATAMOTORS', label: 'Tata Motors Limited' },
    { value: 'HDFCLIFE', label: 'HDFC Life Insurance Company Limited' },
    { value: 'MARUTI', label: 'Maruti Suzuki India Limited' },
    { value: 'BPCL', label: 'Bharat Petroleum Corporation Limited' },
    { value: 'TITAN', label: 'Titan Company Limited' },
    { value: 'BAJFINANCE', label: 'Bajaj Finance Limited' },
    { value: 'ADANIPORTS', label: 'Adani Ports and Special Economic Zone Limited' },
    { value: 'NESTLEIND', label: 'Nestlé India Limited' },
    { value: 'TATASTEEL', label: 'Tata Steel Limited' },
    { value: 'ADANIENT', label: 'Adani Enterprises Limited' },
    { value: 'BAJAJ-AUTO', label: 'Bajaj Auto Limited' },
  ];
  
  const watchlistOptions = [
    { value: 'BHARTIARTL', label: 'Bharti Airtel Limited' },
    { value: 'POWERGRID', label: 'Power Grid Corporation of India' },
    { value: 'ICICIBANK', label: 'ICICI Bank Limited' },
    { value: 'ASIANPAINT', label: 'Asian Paints Limited' },
    { value: 'BRITANNIA', label: 'Britannia Industries Limited' },
    { value: 'INFY', label: 'Infosys Limited' },
    { value: 'NTPC', label: 'NTPC Limited' },
    { value: 'CIPLA', label: 'Cipla Limited' },
    { value: 'ONGC', label: 'Oil and Natural Gas Corporation Limited' },
    { value: 'HDFCBANK', label: 'HDFC Bank Limited' },
    { value: 'SUNPHARMA', label: 'Sun Pharmaceutical Industries Limited' },
    { value: 'EICHERMOT', label: 'Eicher Motors Limited' },
    { value: 'TECHM', label: 'Tech Mahindra Limited' },
    { value: 'M&M', label: 'Mahindra & Mahindra Limited' },
    { value: 'AXISBANK', label: 'Axis Bank Limited' },
    { value: 'RELIANCE', label: 'Reliance Industries Limited' },
    { value: 'WIPRO', label: 'Wipro Limited' },
    { value: 'HINDALCO', label: 'Hindalco Industries Limited' },
    { value: 'HINDUNILVR', label: 'Hindustan Unilever Limited' },
    { value: 'SBILIFE', label: 'SBI Life Insurance Company Limited' },
    { value: 'ULTRACEMCO', label: 'UltraTech Cement Limited' },
    { value: 'APOLLOHOSP', label: 'Apollo Hospitals Enterprise Limited' },
    { value: 'HDFC', label: 'Housing Development Finance Corporation Limited' },
    { value: 'BAJAJFINSV', label: 'Bajaj Finserv Limited' },
    { value: 'COALINDIA', label: 'Coal India Limited' },
    { value: 'DRREDDY', label: "Dr. Reddy's Laboratories Limited" },
    { value: 'ITC', label: 'ITC Limited' },
    { value: 'HEROMOTOCO', label: 'Hero MotoCorp Limited' },
    { value: 'DIVISLAB', label: "Divi's Laboratories Limited" },
    { value: 'GRASIM', label: 'Grasim Industries Limited' },
    { value: 'HCLTECH', label: 'HCL Technologies Limited' },
    { value: 'TCS', label: 'Tata Consultancy Services Limited' },
    { value: 'UPL', label: 'UPL Limited' },
    { value: 'KOTAKBANK', label: 'Kotak Mahindra Bank Limited' },
    { value: 'TATACONSUM', label: 'Tata Consumer Products Limited' },
    { value: 'INDUSINDBK', label: 'IndusInd Bank Limited' },
    { value: 'JSWSTEEL', label: 'JSW Steel Limited' },
    { value: 'LT', label: 'Larsen & Toubro Limited' },
    { value: 'SBIN', label: 'State Bank of India' },
    { value: 'TATAMOTORS', label: 'Tata Motors Limited' },
    { value: 'HDFCLIFE', label: 'HDFC Life Insurance Company Limited' },
    { value: 'MARUTI', label: 'Maruti Suzuki India Limited' },
    { value: 'BPCL', label: 'Bharat Petroleum Corporation Limited' },
    { value: 'TITAN', label: 'Titan Company Limited' },
    { value: 'BAJFINANCE', label: 'Bajaj Finance Limited' },
    { value: 'ADANIPORTS', label: 'Adani Ports and Special Economic Zone Limited' },
    { value: 'NESTLEIND', label: 'Nestlé India Limited' },
    { value: 'TATASTEEL', label: 'Tata Steel Limited' },
    { value: 'ADANIENT', label: 'Adani Enterprises Limited' },
    { value: 'BAJAJ-AUTO', label: 'Bajaj Auto Limited' },
  ];

  const riskOptions = [
    { value: 'Low', label: 'Low' },
    { value: 'Medium', label: 'Medium' },
    { value: 'High', label: 'High' },
  ];

  const handleStockChoose = (selectedOptions) => {
    const selectedStocks = selectedOptions.map((option) => option.value);
    setStockList(selectedStocks);
    console.log(selectedStocks);
  };

  const handleWatchlistChoose = (selectedOptions) => {
    const selectedWatchlist = selectedOptions.map((option) => option.value);
    setWatchlist(selectedWatchlist);
    console.log(selectedWatchlist);
  };

  const handleRiskChoose = (selectedOptions) => {
    const selectedRisk = selectedOptions.value;
    setRisk(selectedRisk);
    console.log(selectedRisk);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Watchlist:', watchlist);
    console.log('Stocklist:', stockList);
    console.log('Risk:', risk);


    // Perform the post request to the server with the selected data
    try {
      const res = await axios.post('https://ff0a-103-68-38-66.ngrok-free.app/stock/getStocks', {
        watchlist: watchlist,
        portfolio: stockList,
        risk_profile:`${risk}`,
      }, { headers: { 'Authorization': `Bearer ${localStorage.getItem('jwt')}`}});
      console.log(res.data);
      // Handle the response from the server as needed
      } catch (error) {
      console.error(error);
      // Handle error case
      }

      navigate('/dashboard');
    };

return (
  <div className="relative flex flex-col items-center justify-center w-full md:flex-row min-h-screen bg-gray-900 pb-6">
    <Navbar2 />
    <div className="overflow-hidden py-12 sm:py-18 w-full">
      <div className="mx-auto w-full px-10 lg:px-14">
        <div className="mx-auto grid max-w-2xl pt-16 grid-cols-1 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:p-12 lg:pt-4">
            <div className="mx-auto lg:max-w-lg justify-between text-center flex flex-col">
              <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-2xl pt-10 pb-2">
                Select Your Portfolio Holdings
              </h1>
              <div className="">
                <Select
                  options={stockOptions}
                  isMulti
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  onChange={handleStockChoose}

                  defaultValue={[stockOptions[2], stockOptions[3]]}
                />
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-2xl pt-10 pb-2">
                Select Your Watchlist Holdings
              </h1>
              <div className="">
                <Select
                  options={watchlistOptions}
                  isMulti
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  onChange={handleWatchlistChoose}
                />
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-2xl pt-10 pb-2">
                Select Your Risk Tolerance
              </h1>
              <div className="">
                <Select
                  options={riskOptions}
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  onChange={handleRiskChoose}
                />
              </div>

            </div>
            <button type="submit" className="mt-10 bg-blue-600 text-white px-10 py-2 rounded hover:bg-blue-800 " onClick={handleSubmit}>Submit</button>
          </div>
          <Phone />
        </div>
      </div>
    </div>
  </div>
);
}
