import Image from 'next/image';
import React from 'react'




function ExplainTextIcon({text,icon1}:{text:string;icon1:string}) {
  return (

    <div className='border p-6 font-extralight font-poppins border-b border-t-0 space-x-3  border-l-0 border-r-0 w-full flex flex-row justify-between items-center'>
        <div>
          <Image src={icon1} className='w-5 h-5' width={30} height={30} alt={`${icon1}.txt`}/>
        </div>

        <div>
            <h1 className='text-[16px] md:text-2xl font-bold'>{text}</h1>
        </div>
        <div>
          <Image src='/images/arrow_left.svg' className='w-5 h-5' width={10} height={10} alt='left-svg'/>
        </div>

        </div>
  )
}

export default ExplainTextIcon