import IntroductionCard from '@/components/common/cards/IntroductionCard'
import { howItWorksItems } from '@/lib/data'
import React from 'react'


function HowItWorksHolder() {
  return (
    <div className=' space-y-5 mb-20 lg:mb-32 mx-5 lg:leftRightSpacing lg:mt-0 text-white'>
        <div>
            <h1 className='text-[22px] font-poltwaski text-center text-nowrap font-monoBold uppercase mb-10 lg:mb-20 lg:text-5xl lg:text-start'>how it works</h1>
        </div>

        <div className='flex flex-col lg:flex-row gap-5 lg:gap-2'>
            {howItWorksItems.map((item,index)=>(
              <IntroductionCard key={index}
               title={item.title}
                image={item.image} 
                description={item.description}/>
            ))}
        </div>
    </div>
  )
}

export default HowItWorksHolder