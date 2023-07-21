import React from 'react'
import Navbar from '../components/Navbar'
import Statement from '../components/Statement'
import Stats from '../components/Stats'
import Slide1 from '../components/Slide1'

export default function Landing() {
  return (
    <div className="flex flex-col bg-gradient-to-r from-gray-900 via-black to-gray-900 bg-full h-max p-10"> 
      <Navbar />
      <div className="flex-grow">
        <Statement />
        <Stats/>
        <Slide1/>   
      </div>
    </div>
  
  )
}

