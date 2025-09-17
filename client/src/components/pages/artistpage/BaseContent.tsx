import ArrowTextLink from '@/components/shared/ArrowTextLink'
import Curves from '@/components/shared/Curves'
import Image from 'next/image'



function BaseContent() {
  return (
    <div className='relative mb-40 md:mb-[30em] lg:mb-32 text-white '>
    <div className='h-dvh  flex flex-col mx-5 md:mx-10 items-center gap-10 md:gap-20 lg:leftRightSpacing lg:flex-row '>
        <div className='flex-[50%] space-y-10 z-30'>
            <h1 className='text-[20px] w-full uppercase lg:w-[90%] text-center font-poltwaski lg:text-5xl'>monetize yOUR mUSIC ON YOUR TERMS </h1>
            <p className='text-[16px] font-extralight font-poppins leading-[2rem] lg:text-[20px] '>Take control of your music&apos;s revenue potential. Lease your tracks directly to a global network of creators while retaining 
                ownership. Set your own terms, reach 
                new audiences, and build a sustainable music career with TuneCycle</p>

                <div className='grid place-content-center'>
                    <ArrowTextLink name='Leased now' href='/dashboard/upload'/>
                </div>
        </div>

        <div className='flex-[50%] w-full'>
            <Image src='/images/lady_melody.svg' alt="melody" width={700} height={700}/>
        </div>
        </div>

        <div className='absolute top-0 w-full'>
            <Curves/>
         </div>
    </div>
  )
}

export default BaseContent