import React from 'react'
import Link from 'next/link';
import Curves from '@/components/shared/Curves';



function BaseContent() {
    return (
        <div className='md:h-dvh relative mb-10 md:mb-0'>
          <div className='flex flex-col mt-3 md:mt-0  items-center md:justify-center h-full'>
            <h1 className=' z-20 uppercase text-white font-monoBold font-poltwaski text-2xl md:max-w-2xl lg:max-w-4xl md:text-6xl text-center leading-tight'>
              LEASE YOUR MUSIC RIGHTS RETAIN YOUR OWNERSHIP
            </h1>
            <p className='w-full text-white lg:max-w-[52%]  md:text-[20px] font-extralight font-poppins mt-6 text-center'>
            TuneCycle empowers artistes to generate revenue without losing control of their creative work. Connect with buyers looking for fresh sounds for their projects. </p>
            
      <div className='flex flex-col md:flex-row gap-10 md:gap-20 items-center font-poppins mt-10'>
  <Link
    href="/dashboard/upload/"
    className='
      text-primaryColor 
      custom-btn-gradient 
      hover:bg-none hover:underline hover:text-white
      py-3 px-10 rounded-[10px] font-bold md:text-[20px] capitalize
      transition-colors duration-500 ease-in-out
    '
  >
    lease your music
  </Link>

  <Link
    href="/market_place/"
    className='
      text-primaryColor 
      custom-btn-gradient 
      hover:custom-btn-none hover:text-white hover:underline
      py-3 px-10 rounded-[10px] font-bold md:text-[20px] capitalize
      transition-colors duration-500 ease-in-out
    '
  >
    Explore marketplace
  </Link>
</div>

          </div>
    
          <div className='absolute top-0 w-full'>
            <Curves/>
          </div>
          
        </div>
      );
    
}

export default BaseContent