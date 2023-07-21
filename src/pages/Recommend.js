import React from 'react'
import Navbar from '../components/Navbar'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Recommend() {
  const [stockNames,setStockNames] = useState([])
  // const getPercentageColorClass = () => {
  //   if (color === 'green') {
  //     return 'bg-green-600';
  //   } else if (color === 'red') {
  //     return 'bg-red-600';
  //   }
  // }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post('https://ff0a-103-68-38-66.ngrok-free.app/stock/stockRec', {}, { headers: { 'Authorization': `Bearer ${localStorage.getItem('jwt')}`}});
        console.log(res.data);
        setStockNames(res.data.rec);
        // Handle the response from the server as needed
      } catch (error) {
        console.error(error);
        // Handle error case
      }
    };

    fetchData(); // Call the async function inside useEffect
  }, []);

    const mapper = [10,10,10,10,10,10,10,10,10,10,10,10]
    const progress = 0.66;

  return (
    <div className='pt-24 bg-cover bg-gray-900 h-screen'>
        <Navbar/>
        <div className='flex flex-row justify-evenly w-full '>
          <div className='flex flex-col items-center'>
            <p className="mb-4 mx-4 text-6xl font-extrabold tracking-tight text-white sm:text-3xl">BUYING RECOMMENDATIONS  </p>
            <div className=' items-center grid grid-cols-2 '>
            {stockNames.map((val)=>(
              <li className="flex flex-col justify-center items-center gap-x-6 py-2 px-6 rounded-md bg-gray-700 m-4">
                <div className="flex gap-x-4">
                  <div className="min-w-0 flex flex-col items-start">
                    <p className="text-sm font-bold leading-5 text-white">{val}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <p className={`m-4 text-sm leading-5 text-white py-2 px-6 rounded-lg bg-red-500`}>
                    xy%
                  </p>
                </div>
                <div> 
                  <CircularProgressbar value={progress*100} text={`${progress * 100}%`} className='w-36 h-36'
                    styles={buildStyles({
                      // Rotation of path and trail, in number of turns (0-1)
                      // rotation: 0.25,
                  
                      // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                      strokeLinecap: 'butt',
                  
                      // Text size
                      textSize: '10px',

                      size: '100px',
                  
                      // How long animation takes to go from one percentage to another, in seconds
                      pathTransitionDuration: 0.5,
                  
                      // Can specify path transition in more detail, or remove it entirely
                      // pathTransition: 'none',
                  
                      // Colors
                      pathColor: `rgba(62, 152, 199, ${progress})`,
                      textColor: '#f88',
                      trailColor: '#d6d6d6',
                      backgroundColor: '#3e98c7',
                    })}
                  />
                </div>
              </li> 
              ))
            }

            </div>        
          </div>
          <div className='flex'>
            <p className="mb-4 mx-4 text-6xl font-extrabold tracking-tight text-white sm:text-3xl">SELLING RECOMMENDATIONS </p>
          </div>
        
        </div>
    </div>
  )
}
