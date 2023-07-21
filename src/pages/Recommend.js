import React from 'react'
import Navbar from '../components/Navbar'

export default function Recommend() {
  // const getPercentageColorClass = () => {
  //   if (color === 'green') {
  //     return 'bg-green-600';
  //   } else if (color === 'red') {
  //     return 'bg-red-600';
  //   }
  // }

    const mapper = [10,10,10,10,10,10,10,10,10,10,10,10]
  return (
    <div className='pt-24 bg-cover bg-gray-900 h-screen'>
        <Navbar/>
        <div className='flex flex-row justify-evenly w-full '>
          <div className='flex flex-col items-center'>
            <p className="mb-4 mx-4 text-6xl font-extrabold tracking-tight text-white sm:text-3xl">BUYING RECOMMENDATIONS  </p>
            <div className=' items-center grid grid-cols-3 '>
            {mapper.map((val)=>(
              <li className="flex flex-col justify-center items-center gap-x-6 py-2 px-6 rounded-md bg-gray-700 m-4">
                  <div className="flex gap-x-4">
                    <div className="min-w-0 flex flex-col items-start">
                      <p className="text-sm font-bold leading-5 text-white">Stock Ticker</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className={`mt-1 text-sm leading-5 text-white py-2 px-6 rounded-lg bg-red-500`}>
                      {val}
                    </p>
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
