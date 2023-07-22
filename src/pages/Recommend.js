import React from 'react'
import Navbar from '../components/Navbar'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import Navbar2 from '../components/Navbar2';
import { Article } from '../components/Article';

SwiperCore.use([Autoplay]);
SwiperCore.use([Navigation]);

export default function Recommend() {
  const [stockNames,setStockNames] = useState([])
  const [selectedStock, setSelectedStock] = useState('');
  const [sendStockName, setSendStockName] = useState('');
  const [articles, setArticles] = useState('');
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

  const handleArticleClicked = async (val) => {
    // Do something with the 'val' received from the Article component
    console.log('Received value:', val);
    try {
      const res = await axios.post('https://8a2d-35-230-62-233.ngrok-free.app/sentiment', {
      bank_name:val,
      }, );
      console.log(val)
      console.log(res?.data);
      setArticles(res?.data)
      // Handle the response from the server as needed
      } catch (error) {
      console.error(error);
      // Handle error case
      }

  }


      const getArticle = async () => {
        try {
          const res = await axios.post('https://8a2d-35-230-62-233.ngrok-free.app/sentiment', {
          bank_name:sendStockName,
          }, );
          console.log(sendStockName)
          console.log(res.data);
          // Handle the response from the server as needed
          } catch (error) {
          console.error(error);
          // Handle error case
          }
    
    
      }

    const mapper = [10,10,10,10,10,10,10,10,10,10,10,10]
    // const progress = 0.66;

  return (
    <div className='pt-24 bg-cover bg-gray-900 h-max py-10'>
        <Navbar2/>
        <div className='flex flex-row justify-evenly w-full '>
          <div className='flex flex-col items-center'>
            <p className="mb-4 mx-4 text-6xl font-extrabold tracking-tight text-white sm:text-3xl">BUYING RECOMMENDATIONS  </p>
            <div className=' items-center grid grid-cols-1 '>
            {stockNames.map((val,index)=>(
              <li className="flex flex-row justify-center items-center gap-x-6 p-6 rounded-md bg-gray-700 m-4">
                <div>
                <div className="flex gap-x-4 items-center justify-center">
                  <div className="min-w-0 flex flex-col items-center">
                    <p className="text-lg font-bold leading-5 text-white">{val}</p>
                  </div>
                </div>
                {/* <div className="flex flex-col items-center">
                  <p className={`m-4 text-sm leading-5 text-white py-2 px-6 rounded-lg bg-red-500`}>
                    XY%
                  </p>
                </div> */}
                <div> 
                  <CircularProgressbar value={ (Math.round(0.5 + Math.random() * 0.5)*100)} text={`${Math.round(( 0.5 + Math.random() * 0.5) * 100)}%`} className='w-36 h-36'
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
                      pathColor: `rgba(0, 0, 255, ${(0.5 + Math.random() * 0.5)})`,
                      textColor: '#fff',
                      trailColor: '#d6d6d6',
                      backgroundColor: '#3e98c7',
                    })}
                  />
                </div>
                </div>
                <div>
                  {/* <div>
                    {!showArticle?(
                      <div>
                      <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-800 " onClick={handleShowArticle}>
                        Show Articles
                      </button>
                    </div>
                    ):(
                      <SwiperSlide style={{ width: '305px', height: '200px' }}>
                      <div className="bg-gray-800 p-3 h-full rounded-lg flex flex-col justify-between overflow-y-auto no-scrollbar">
                        <div className=" flex-wrap">
                          <h2 className={`text-white text-left text-lg font-bold mb-4`}>
                            Article Title
                          </h2>
                          <h2 className={`text-white text-left text-lg font-bold mb-4`}>
                            Sentiment: Positive/ Neutral/ Negative
                          </h2>
                        </div>
                        <div className="flex-shrink-0">
                        </div>
                        <a href={''} className="text-white bg-blue-600 rounded-lg px-4 py-1 mt-1 block text-center">
                          Read
                        </a>
                      </div>
                  </SwiperSlide>
                    )}
                    
                  </div> */}
                <Article articles={articles} val={val} sendStockName={sendStockName} setSendStockName={setSendStockName} getArticle={getArticle} handleArticleClicked={handleArticleClicked}/>
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
