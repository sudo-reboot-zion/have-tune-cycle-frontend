import Image from 'next/image'


interface IntroductionProps{
    title:string;
    image:string;
    description:string;
}

function IntroductionCard({title,image,description}:IntroductionProps) {
  return (
    <div className=" lg:max-w-[500px] py-6  lg:py-14  lg:p-3 bg-[#1F2231] font-outfit font-extralight">

            <div className='flex flex-col items-center justify-center space-y-3 mb-5 lg:mb-10'>
                <Image src={image} width={50} height={50} alt="gee"/>
                <h1 className='text-[18px] text-nowrap font-bold capitalize text-brand-gold-color lg:text-2xl'>{title}</h1>
            </div>



        <div className='mx-2 text-[16px] lg:text-[18px] '>
            <p className='leading-[2rem] text-center'>{description}</p>
        </div>
    </div>
  )
}

export default IntroductionCard