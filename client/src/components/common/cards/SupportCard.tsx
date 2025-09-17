import Image from 'next/image'
import React from 'react'

interface SupportProps{
    text:string;
    image:string;
    title:string;
}
function SupportCard({text,image,title}:SupportProps) {
  return (
    <div className='p-10 bg-[#202020] rounded-[10px] w-full bg-[#1f1f25'>
        <div className='space-y-10 flex  items-center flex-col justify-center'>
            <div>
                <Image src={image} alt='' width={100} height={100}/>
            </div>


            <div>
                <h1 className='text-3xl font-poppins capitalize'>{title}</h1>
            </div>

            <div className='bg-white h-1 w-32 m-5'/>

            <div>
                <h1 className='text-[18px] text-center font-outfit  text-wrap'>{text}</h1>
            </div>
        </div>
    </div>
  )
}

export default SupportCard