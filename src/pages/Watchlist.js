import React, { useState, useEffect } from 'react';
import Stock from '../components/Stock';
import Navbar from '../components/Navbar';
import LineChart from '../components/LineChart'
import { Typewriter } from 'react-simple-typewriter'
import StockCarousel from '../components/StockCarousel.js';
import News from '../components/News';
// import {motion} from 'framer-motion'

export default function Watchlist() {

  const [showWatchlist, setShowWatchlist] = useState(true);

  // Function to toggle between watchlist and portfolio list
  const toggleList = () => {
    setShowWatchlist(!showWatchlist);
  };
  return (
    <div className="relative flex flex-col md:flex-row min-h-screen bg-gray-900 bg-auto pb-6">
      <Navbar />

      <div className="flex flex-col mt-12 p-5 items-left h-screen mb-10 rounded-lg overflow-y-auto overflow-x-hidden sm:w-1/3 bg-gray-800 no-scrollbar">
        <div className='flex flex-row justify-between'>
        <p className="mt-2 text-left text-6xl font-extrabold tracking-tight text-white sm:text-3xl">
          <Typewriter
            words={[showWatchlist ? 'My Watchlist' : 'My Portfolio']}
            cursor
            cursorStyle='.'
            loop={0}
          />
        </p>
        <button
          className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-1 px-4 mt-4 rounded"
          onClick={toggleList}
        >
          {showWatchlist ? 'Switch to Portfolio' : 'Switch to Watchlist'}
        </button>
        </div>

        <ul role="list" className="mt-4">
          {showWatchlist ? (
            <li>
              <Stock />
              <Stock />
              <Stock />
              <Stock />
              <Stock />
            </li>
          ) : (
            <li>
              <Stock />
              <Stock />
              <Stock />
              <Stock />
              <Stock />
            </li>
          )}
        </ul>
        {/* Button to toggle between watchlist and portfolio list */}
        
      </div>
      
      <div className='mt-12 mx-2 flex-col justify-evenly sm:w-2/3'>

        <div className='flex flex-row justify-evenly mt-4'>

          <div className='flex flex-col p-2 items-center justify-center sm:w-1/2'>
            <p className="mb-4 mx-4 text-6xl font-extrabold tracking-tight text-white sm:text-3xl">
              Top Gainers
              <span className='text-green-600'>
                <Typewriter
                  words={['']}
                  cursor
                  cursorStyle='%'
                  loop={0}
                />
              </span>
            </p>
            <StockCarousel color="green" />
          </div>
          <div className='flex flex-col p-2 items-center justify-center sm:w-1/2'>
            <p className="mb-4 mx-4 text-6xl font-extrabold tracking-tight text-white sm:text-3xl">
              Top Losers
              <span className='text-red-600'>
                <Typewriter
                  words={['']}
                  cursor
                  cursorStyle='%'
                  loop={0}
                />
              </span>
            </p>
            <StockCarousel color="red" />
          </div>

        </div>

        <div className='flex flex-row justify-evenly  mt-2 mb-2 w-full'>
          <LineChart symbol={1}/>
          <LineChart symbol={2}/>
        </div>

        <div className='mx-2 mt-6 my-1 flex-grow overflow-y-auto overflow-x-hidden no-scrollbar rounded-2xl'>
          <News />
        </div>
      </div>
    </div>
  );
}
