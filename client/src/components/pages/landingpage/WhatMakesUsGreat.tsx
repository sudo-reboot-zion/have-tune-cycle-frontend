import ExplainTextIcon from '@/components/common/ExplainTextIcon'
import Image from 'next/image'



function WhatMakesUsGreat() {
    return (
      <div className='p-5  lg:p-0 mb-20 mb:mb-32 text-white'>
          <div className='flex items-center flex-col space-y-5'>
              <h1 className='text-3xl font-monoBold capitalize font-poltwaski lg:text-[35px]'>What makes TuneCycle so great?</h1>
              <p className='text-[18px] font-extralight font-outfit'>Find out what makes us the best on the market</p>
          </div>
      
          <div className='flex flex-col lg:flex-row gap-20  items-center lg:gap-52 lg:justify-between mt-10 md:mt-20'>
  
               <div className='lg:ml-20 flex-[50%] flex flex-col space-y-3 place-self-start'>
                  <ExplainTextIcon text="Unbreakable security" icon1='images/gc1.svg' />
                  <ExplainTextIcon text="Direct connections" icon1='images/tripod.svg' />
                  <ExplainTextIcon text="Flexible leasing" icon1='images/gp1.svg' />
               </div>
  
               <div className='lg:mr-20 flex-[50%]'>
                  <Image src='/images/candle.svg' alt="gee" width={600} height={600}/>
               </div>
          </div>
  
      </div>
    )
  }
  
  export default WhatMakesUsGreat