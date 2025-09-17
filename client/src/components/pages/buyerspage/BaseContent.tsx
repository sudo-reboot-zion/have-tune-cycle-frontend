
import ArrowTextLink from '@/components/shared/ArrowTextLink'
import Curves from '@/components/shared/Curves'
import Image from 'next/image'
import React from 'react'




function BaseContent() {
  return (
    <div className='relative mb-32 lg:mb-15 md:mb-[30rem]  py-20 text-white '>
    <div className='h-dvh  flex items-center flex-col gap-20 lg:flex-row-reverse mx-5 md:mx-10 lg:mx-20'>
        <div className='flex-[100%] lg:flex-[50%] space-y-10 z-20'>
            <h1 className='text-2xl uppercase w-[90%] text-center font-monoBold md:text-5xl font-poltwaski'>USE CERTIFIED TRACKS, NEVER RISK A COPYRIGHT STRIKE</h1>
            <p className='text-[16px]  leading-[2rem] lg:text-[20px] font-poppins font-extralight '>  Say goodbye to takedowns and copyright headaches. With RiffRent, every track is pre-cleared 
  and certified for use — whether it’s a YouTube vlog, podcast, or business promo. 
  Find your perfect sound and license it instantly, worry-free.</p>

                <div className='grid place-content-center'>
                    <ArrowTextLink name="market place" href="/market_place" />
                </div>
        </div>

        <div className='flex-[50%] w-full z-40'>
            <Image src='/images/console.svg' alt="melody"  width={700} height={700}/>
        </div>
        </div>

        <div className='absolute top-0 w-full z-10'>
            <Curves/>
         </div>
    </div>
  )
}

export default BaseContent
