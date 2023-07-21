import React from 'react';
import Tilt from 'react-parallax-tilt';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

SwiperCore.use([Autoplay]);
SwiperCore.use([Navigation]);

export default function StockCarousel2({ color }) {
  const getPercentageColorClass = () => {
    if (color === 'green') {
      return 'bg-green-600';
    } else if (color === 'red') {
      return 'bg-red-600';
    }
  };

  return (
    <div className="flex flex-row justify-evenly w-full overflow-x-auto overflow-y-hidden bg-gray-800 p-2 px-1 rounded-lg">
      <Swiper
        spaceBetween={20}
        slidesPerView={3}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Navigation]}
        style={{ width: '100%'}}
      >
        <SwiperSlide>
          <Tilt>
            <li className="flex flex-col justify-center items-center gap-x-6 py-2 px-6 rounded-md bg-gray-700 mx-1">
              <div className="flex gap-x-4">
                <div className="min-w-0 flex flex-col items-start">
                  <p className="text-sm font-bold leading-5 text-white">INFI</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <p className={`mt-1 text-sm leading-5 text-white py-2 px-6 rounded-lg ${getPercentageColorClass()}`}>
                  -7.73%
                </p>
              </div>
            </li>
          </Tilt>
        </SwiperSlide>

        <SwiperSlide>
          <Tilt>
            <li className="flex flex-col justify-center items-center gap-x-6 py-2 px-6 rounded-md bg-gray-700 mx-1">
              <div className="flex gap-x-4">
                <div className="min-w-0 flex flex-col items-start">
                  <p className="text-sm font-bold leading-5 text-white">HINDUNILVR</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <p className={`mt-1 text-sm leading-5 text-white py-2 px-6 rounded-lg ${getPercentageColorClass()}`}>
                  -3.60%
                </p>
              </div>
            </li>
          </Tilt>
        </SwiperSlide>

        <SwiperSlide>
          <Tilt>
            <li className="flex flex-col justify-center items-center gap-x-6 py-2 px-6 rounded-md bg-gray-700 mx-1">
              <div className="flex gap-x-4">
                <div className="min-w-0 flex flex-col items-start">
                  <p className="text-sm font-bold leading-5 text-white">HCL TECH</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <p className={`mt-1 text-sm leading-5 text-white py-2 px-6 rounded-lg ${getPercentageColorClass()}`}>
                  -3.17%
                </p>
              </div>
            </li>
          </Tilt>
        </SwiperSlide>

        <SwiperSlide>
          <Tilt>
            <li className="flex flex-col justify-center items-center gap-x-6 py-2 px-6 rounded-md bg-gray-700 mx-1">
              <div className="flex gap-x-4">
                <div className="min-w-0 flex flex-col items-start">
                  <p className="text-sm font-bold leading-5 text-white">WIPRO</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <p className={`mt-1 text-sm leading-5 text-white py-2 px-6 rounded-lg ${getPercentageColorClass()}`}>
                  -3.05%
                </p>
              </div>
            </li>
          </Tilt>
        </SwiperSlide>

        <SwiperSlide>
          <Tilt>
            <li className="flex flex-col justify-center items-center gap-x-6 py-2 px-6 rounded-md bg-gray-700 mx-1">
              <div className="flex gap-x-4">
                <div className="min-w-0 flex flex-col items-start">
                  <p className="text-sm font-bold leading-5 text-white">TCS</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <p className={`mt-1 text-sm leading-5 text-white py-2 px-6 rounded-lg ${getPercentageColorClass()}`}>
                  -2.58%
                </p>
              </div>
            </li>
          </Tilt>
        </SwiperSlide>

        <SwiperSlide>
          <Tilt>
            <li className="flex flex-col justify-center items-center gap-x-6 py-2 px-6 rounded-md bg-gray-700 mx-1">
              <div className="flex gap-x-4">
                <div className="min-w-0 flex flex-col items-start">
                  <p className="text-sm font-bold leading-5 text-white">RELIANCE</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <p className={`mt-1 text-sm leading-5 text-white py-2 px-6 rounded-lg ${getPercentageColorClass()}`}>
                  -2.48%
                </p>
              </div>
            </li>
          </Tilt>
        </SwiperSlide>

      </Swiper>
    </div>
  );
}
