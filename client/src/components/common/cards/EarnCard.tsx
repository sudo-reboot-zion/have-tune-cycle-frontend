import React from 'react'

interface EarnProps{
    p1:string;
    p2:string;
    p3:string;
}

function EarnCard({p1,p2,p3}:EarnProps) {
  return (
    <div className='space-y-5 p-3  w-[100%] font-extralight text-[15px] font-outfit py-5 leading-[2.5rem] bg-[#1F2231] lg:text-[18px]'>
        <div>
        <p className='line-clamp-3 md:line-clamp-none'>{p1}</p>
        </div>

        <div>
            <p className='line-clamp-2 md:line-clamp-none'>{p2}</p>
        </div>

        <div>
            <p className='line-clamp-3 md:line-clamp-none'>{p3}</p>
        </div>

    </div>
  )
}

export default EarnCard