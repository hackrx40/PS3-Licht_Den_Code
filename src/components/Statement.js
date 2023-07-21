import React from 'react'
import Threemodel from './Threemodel'

export default function Statement() {
  return (
    <div className="overflow-hidden py-12 sm:py-18">
    <div className="mx-auto max-w-7xl px-10 lg:px-14">
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
        <div className="lg:pl-12 lg:pt-4">
          <div className="lg:max-w-lg">
            <h2 className="md:text-xl text-lg font-bold leading-7 mt-6 text-white">Market Insights</h2>
            <p className="mt-2 md:text-6xl font-bold flex justify-center items-left tracking-tight bg-gradient-to-r from-blue-400 to-purple-700 bg-clip-text text-transparent text-5xl">StockWatch</p>
            <p className="mt-4 text-2xl text-gray-300">Are you looking to elevate your investment game and make more informed decisions in the stock market? Welcome to StockWatch, your all-in-one stock recommendation system designed to revolutionize your investment experience.</p>
            <div className='flex flex-row justify-items-center mx-44  '>
            <a href="/signup" className="mt-5 rounded-md border border-transparent bg-indigo-600 py-3 px-6 font-medium text-white hover:bg-blue-700">Get Started <span aria-hidden="true">&rarr;</span></a>
            </div>
            {/* <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-slate-200 lg:max-w-none">
              <div className="relative pl-9">
                <dt className="inline font-bold bg-gradient-to-r from-violet-500 to-blue-600 bg-clip-text text-transparent">
                  <svg className="absolute left-1 top-1 h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M5.5 17a4.5 4.5 0 01-1.44-8.765 4.5 4.5 0 018.302-3.046 3.5 3.5 0 014.504 4.272A4 4 0 0115 17H5.5zm3.75-2.75a.75.75 0 001.5 0V9.66l1.95 2.1a.75.75 0 101.1-1.02l-3.25-3.5a.75.75 0 00-1.1 0l-3.25 3.5a.75.75 0 101.1 1.02l1.95-2.1v4.59z" clip-rule="evenodd" />
                  </svg>
                  Push to deploy:
                </dt>
                <dd className="inline"> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.</dd>
              </div>
              <div className="relative pl-9">
                <dt className="inline font-bold bg-gradient-to-r from-violet-500 to-blue-600 bg-clip-text text-transparent">
                  <svg className="absolute left-1 top-1 h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clip-rule="evenodd" />
                  </svg>
                  SSL certificates:
                </dt>
                <dd className="inline"> Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.</dd>
              </div>
              <div className="relative pl-9">
                <dt className="inline font-bold bg-gradient-to-r from-violet-500 to-blue-600 bg-clip-text text-transparent">
                  <svg className="absolute left-1 top-1 h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path d="M4.632 3.533A2 2 0 016.577 2h6.846a2 2 0 011.945 1.533l1.976 8.234A3.489 3.489 0 0016 11.5H4c-.476 0-.93.095-1.344.267l1.976-8.234z" />
                    <path fill-rule="evenodd" d="M4 13a2 2 0 100 4h12a2 2 0 100-4H4zm11.24 2a.75.75 0 01.75-.75H16a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75h-.01a.75.75 0 01-.75-.75V15zm-2.25-.75a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75H13a.75.75 0 00.75-.75V15a.75.75 0 00-.75-.75h-.01z" clip-rule="evenodd" />
                  </svg>
                  Database backups:
                </dt>
                <dd className="inline"> Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.</dd>
              </div>
            </dl> */}
          </div>
        </div>
        <Threemodel/>
      </div>
    </div>
  </div>
  
  )
}

