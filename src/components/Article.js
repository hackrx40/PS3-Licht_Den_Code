import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { useState, useEffect } from 'react';


export const Article = ({articles,val,sendStockName,setSendStockName,getArticle,handleArticleClicked}) => {
    const[showArticle,setShowArticle] = useState(false)

    const handleShowArticle = () => {
        console.log(val)
        setShowArticle(true);
        setSendStockName(val)
        console.log("djnjsfd",sendStockName)
        handleArticleClicked(val)
        getArticle(val);
      }

      
    return (
    <div>
        <div>
            {!showArticle?(
                <div>
                <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-800 " onClick={()=>{handleShowArticle()}}>
                Show Articles
                </button>
            </div>
            ):(
                <SwiperSlide style={{ width: '305px', height: '200px' }}>
                <div className="bg-gray-800 p-3 h-full rounded-lg flex flex-col justify-between overflow-y-auto no-scrollbar">
                <div className=" flex-wrap">
                    <h2 className={`text-white text-left text-lg font-bold mb-4`}>
                    {articles?.titles[0]}
                    </h2>
                    <h2 className={`text-white text-left text-lg font-bold mb-4`}>
                    {articles?.sentiments[0]}
                    </h2>
                </div>
                <div className="flex-shrink-0">
                </div>
                <a href={`${articles?.urls[0]}`} className="text-white bg-blue-600 rounded-lg px-4 py-1 mt-1 block text-center">
                    Read
                </a>
                </div>
            </SwiperSlide>
            )}
            
            </div>
    </div>
  )
}
