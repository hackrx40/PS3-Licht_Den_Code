import React, { useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Navbar from '../components/Navbar';
import Phone from '../components/Phone';
import axios from 'axios';

const animatedComponents = makeAnimated();

export default function PreferencesForm() {
  const [stockList, setStockList] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [risk, setRisk] = useState('');

  const stockOptions = [
      { value: 'BHARTIARTL', label: 'BHARTI AIRTEL' },
      { value: 'POWERGRID', label: 'POWER GRID' },
      { value: 'ICICIBANK', label: 'ICICI BANK' },
      { value: 'ASIANPAINT', label: 'ASIAN PAINTS' },
      { value: 'BRITANNIA', label: 'BRITANNIA' },
      { value: 'INFY', label: 'INFOSYS' },
      { value: 'NTPC', label: 'NTPC' },
      { value: 'CIPLA', label: 'CIPLA' },
      { value: 'ONGC', label: 'ONGC' },
      { value: 'HDFCBANK', label: 'HDFC BANK' },
      { value: 'SUNPHARMA', label: 'SUN PHARMA' },
      { value: 'EICHERMOT', label: 'EICHER MOTORS' },
      { value: 'TECHM', label: 'TECH MAHINDRA' },
      { value: 'M&M', label: 'M&M' },
      { value: 'AXISBANK', label: 'AXIS BANK' },
      { value: 'RELIANCE', label: 'RELIANCE IND.' },
      { value: 'WIPRO', label: 'WIPRO' },
      { value: 'HINDALCO', label: 'HINDALCO' },
      { value: 'HINDUNILVR', label: 'HUL' },
      { value: 'SBILIFE', label: 'SBI LIFE INSURANCE' },
      { value: 'ULTRACEMCO', label: 'ULTRATECH CEMENT' },
      { value: 'APOLLOHOSP', label: 'APOLLO HOSPITALS' },
      { value: 'HDFC', label: 'HDFC' },
      { value: 'BAJAJFINSV', label: 'BAJAJ FINSERV' },
      { value: 'COALINDIA', label: 'COAL INDIA' },
      { value: 'DRREDDY', label: 'DR. REDDYS LAB' },
      { value: 'ITC', label: 'ITC' },
      { value: 'HEROMOTOCO', label: 'HERO MOTOCORP' },
      { value: 'DIVISLAB', label: 'DIVIS LABORATORIES' },
      { value: 'GRASIM', label: 'GRASIM' },
      { value: 'HCLTECH', label: 'HCL TECHNOLOGIES' },
      { value: 'TCS', label: 'TCS' },
      { value: 'UPL', label: 'UPL' },
      { value: 'KOTAKBANK', label: 'KOTAK MAHINDRA BANK' },
      { value: 'TATACONSUM', label: 'TATA CONSUMER' },
      { value: 'INDUSINDBK', label: 'INDUSIND BANK' },
      { value: 'JSWSTEEL', label: 'JSW STEEL' },
      { value: 'LT', label: 'L&T' },
      { value: 'SBIN', label: 'SBI' },
      { value: 'TATAMOTORS', label: 'TATA MOTORS' },
      { value: 'HDFCLIFE', label: 'HDFC LIFE INSURANCE' },
      { value: 'MARUTI', label: 'MARUTI SUZUKI' },
      { value: 'BPCL', label: 'BPCL' },
      { value: 'TITAN', label: 'TITAN' },
      { value: 'BAJFINANCE', label: 'BAJAJ FINANCE' },
      { value: 'ADANIPORTS', label: 'ADANI PORTS & SEZ' },
      { value: 'NESTLEIND', label: 'NESTLE' },
      { value: 'TATASTEEL', label: 'TATA STEEL' },
      { value: 'ADANIENT', label: 'ADANI ENTERPRISES' },
      { value: 'BAJAJ-AUTO', label: 'BAJAJ AUTO' },
    ];

  const watchlistOptions = [
      { value: 'BHARTIARTL', label: 'BHARTI AIRTEL' },
      { value: 'POWERGRID', label: 'POWER GRID' },
      { value: 'ICICIBANK', label: 'ICICI BANK' },
      { value: 'ASIANPAINT', label: 'ASIAN PAINTS' },
      { value: 'BRITANNIA', label: 'BRITANNIA' },
      { value: 'INFY', label: 'INFOSYS' },
      { value: 'NTPC', label: 'NTPC' },
      { value: 'CIPLA', label: 'CIPLA' },
      { value: 'ONGC', label: 'ONGC' },
      { value: 'HDFCBANK', label: 'HDFC BANK' },
      { value: 'SUNPHARMA', label: 'SUN PHARMA' },
      { value: 'EICHERMOT', label: 'EICHER MOTORS' },
      { value: 'TECHM', label: 'TECH MAHINDRA' },
      { value: 'M&M', label: 'M&M' },
      { value: 'AXISBANK', label: 'AXIS BANK' },
      { value: 'RELIANCE', label: 'RELIANCE IND.' },
      { value: 'WIPRO', label: 'WIPRO' },
      { value: 'HINDALCO', label: 'HINDALCO' },
      { value: 'HINDUNILVR', label: 'HUL' },
      { value: 'SBILIFE', label: 'SBI LIFE INSURANCE' },
      { value: 'ULTRACEMCO', label: 'ULTRATECH CEMENT' },
      { value: 'APOLLOHOSP', label: 'APOLLO HOSPITALS' },
      { value: 'HDFC', label: 'HDFC' },
      { value: 'BAJAJFINSV', label: 'BAJAJ FINSERV' },
      { value: 'COALINDIA', label: 'COAL INDIA' },
      { value: 'DRREDDY', label: 'DR. REDDYS LAB' },
      { value: 'ITC', label: 'ITC' },
      { value: 'HEROMOTOCO', label: 'HERO MOTOCORP' },
      { value: 'DIVISLAB', label: 'DIVIS LABORATORIES' },
      { value: 'GRASIM', label: 'GRASIM' },
      { value: 'HCLTECH', label: 'HCL TECHNOLOGIES' },
      { value: 'TCS', label: 'TCS' },
      { value: 'UPL', label: 'UPL' },
      { value: 'KOTAKBANK', label: 'KOTAK MAHINDRA BANK' },
      { value: 'TATACONSUM', label: 'TATA CONSUMER' },
      { value: 'INDUSINDBK', label: 'INDUSIND BANK' },
      { value: 'JSWSTEEL', label: 'JSW STEEL' },
      { value: 'LT', label: 'L&T' },
      { value: 'SBIN', label: 'SBI' },
      { value: 'TATAMOTORS', label: 'TATA MOTORS' },
      { value: 'HDFCLIFE', label: 'HDFC LIFE INSURANCE' },
      { value: 'MARUTI', label: 'MARUTI SUZUKI' },
      { value: 'BPCL', label: 'BPCL' },
      { value: 'TITAN', label: 'TITAN' },
      { value: 'BAJFINANCE', label: 'BAJAJ FINANCE' },
      { value: 'ADANIPORTS', label: 'ADANI PORTS & SEZ' },
      { value: 'NESTLEIND', label: 'NESTLE' },
      { value: 'TATASTEEL', label: 'TATA STEEL' },
      { value: 'ADANIENT', label: 'ADANI ENTERPRISES' },
      { value: 'BAJAJ-AUTO', label: 'BAJAJ AUTO' },
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
      const res = await axios.post('https://2c37-103-149-94-242.ngrok-free.app/stock/getStocks', {
        watchlist:watchlist,
        portfolio:stockList,
        risk_profile:risk,
      });
      console.log(res.data);
      // Handle the response from the server as needed
    } catch (error) {
      console.error(error);
      // Handle error case
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full md:flex-row min-h-screen bg-gray-900 pb-6">
      <Navbar />
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
