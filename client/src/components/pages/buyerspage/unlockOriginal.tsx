import React from 'react'
import { leasingRights } from '@/lib/data'
import CoupleOfStepsCard from '@/components/common/cards/CoupleOfStepsCard'


function UnlockOriginalContent() {
  return (
    <div className='mb-32 text-white'>
    <div className='flex flex-col items-center space-y-5 mb-14'>
        <h1 className='text-[20px] text-center  font-monoBold md:text-3xl lg:text-start font-poltwaski lg:text-4xl'>Unlock Original Sound with Master Rights Leasing</h1>
        <p className='w-full p-0  md:p-3  lg:p-0 text-center text-[18px] font-extralight font-poppins lg:w-[55%]'>Discover a world of unique, high-quality music for your projects. BeatBack offers artists the opportunity to lease their master recordings, granting you access
             to original tracks for a limited time. Choose the leasing option that best suits your needs.</p>

    </div>

          <div className='grid  grid-cols-1 lg:grid-cols-3 mx-10  gap-10  lg:gap-0 lg:mx-52'>
             {
              leasingRights.map((item,index)=>(
                <CoupleOfStepsCard key={index} data={item} />

              ))
             }
             </div>
    </div>
  )
}

export default UnlockOriginalContent