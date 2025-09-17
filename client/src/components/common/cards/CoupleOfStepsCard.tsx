import Image from 'next/image'


interface LeasingRight {
    title: string;
    description: string;
    feature: string;
    terms: { name: string; icon: string }[];
  }
  
  interface CoupleOfStepsCardProps {
    data: LeasingRight;
  }



function CoupleOfStepsCard({data}:CoupleOfStepsCardProps) {
  return (
    <div className='py-20 w-full p-3 space-y-3 bg-[#1F2231] lg:w-[400px] '>
        <div>
            <h1 className='text-center text-2xl font-poppins '>{data.title}</h1>
        </div>
        <div>
            <p className='line-clamp-3  text-[15px] leading-[2rem] md:line-clamp-none text-center font-extralight font-outfit'>{data.description}</p>
        </div>


            <div className='my-10'>
            <h1 className='capitalize text-[16px] text-center font-monoBold lg:text-[20px]'>{data.feature}</h1>
            </div>


        <div className='lg:mx-52'>

            <div className='flex flex-col items-center gap-5'>
                {data.terms.map((term,index)=>(
                    <div className='flex items-center gap-3 ' key={index}>
                       <Image  src={term.icon}width={20} height={20} alt="arrow"/>
                     <h1 className='text-wrap lg:w-64 text-[15px] font-bold'>{term.name}</h1>
                    </div>
                ))}

            </div>
           
        </div>
    </div>
  )
}

export default CoupleOfStepsCard