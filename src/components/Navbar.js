import React from 'react'
import { useNavigate } from "react-router-dom";
import image from './assets/image1.png'

export default function Navbar() {
    const navigate = useNavigate()
    return ( 

    <div className='flex flex-row static '>
        <header className="absolute inset-x-0 top-0 z-50 bg-gradient-to-r from-blue-600 to-blue-800">
        <nav className="flex items-center justify-between p-2 mb-1 lg:px-8 " aria-label="Global">
        <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img className="h-8 w-auto" src={image} alt="" />
            </a>
        </div>
        <div className="flex lg:hidden">
            <button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
            <span className="sr-only">Open main menu</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
            <a href="#" className="text-md font-semibold leading-6 text-gray-200 hover:font-extrabold hover:shadow-xl transition-all ease-in duration-100 p-2 rounded-lg " onClick={()=>{navigate("/")}}>Home</a>

            {/* <a href="#" className="text-sm font-semibold leading-6 text-gray-200 hover:font-extrabold hover:shadow-xl transition-all ease-in duration-100 p-2 rounded-lg">Find Jobs</a>*/}

            <a href="#" className="text-md font-semibold leading-6 text-gray-200 hover:font-extrabold hover:shadow-xl transition-all ease-in duration-100 p-2 rounded-lg" onClick={()=>{navigate("/Dashboard")}}>FAQs</a> 

            <a href="#" className="text-md font-semibold leading-6 text-gray-200 hover:font-extrabold hover:shadow-xl transition-all ease-in duration-100 p-2 rounded-lg" onClick={()=>{}}>About Us</a>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a href="#" className="text-sm font-semibold leading-6 text-gray-200 mr-2 p-2 hover:bg-violet-500 rounded-md transition-all duration-500 ease-in-out border-2 border-violet-500" onClick={()=>{navigate("/Signup")}}>Sign Up <span aria-hidden="true"></span></a>
            <a href="#" className="text-sm font-semibold leading-6 text-gray-200 p-2 hover:bg-violet-500 rounded-md transition-all duration-500 ease-in-out border-2  border-violet-500" onClick={()=>{navigate("/Login")}}>Log in <span aria-hidden="true">&rarr;</span></a>
        </div>
        </nav>
        
        
    </header>

    </div>
  )
}
