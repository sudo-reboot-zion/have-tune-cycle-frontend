import Image from 'next/image'


function PerfectMatch() {
  return (
    <div className='p-5 text-white lg:p-0 mb-20 mt-10 md:mt-20 lg:mt-0 flex flex-col lg:flex-row items-center md:mb-32 gap-20'>

        <div className='lg:ml-20 flex-[100%]  md:flex-[50%] w-full space-y-5  md:space-y-10'>
            <div className='space-y-5  md:space-y-10'>
                 <h1 className='font-monoBold text-[20px] md:text-4xl capitalize font-poltwaski '>Find your perfect match</h1>
                <p className='text-[17px] font-outfit font-extralight md:w-[80%]  md:leading-[2rem] md:text-[20px]'>Discover the ideal track for your project. Browse our diverse catalog and find your sound</p>
            </div>

            <div>
                <Image src='/images/barsito.svg' alt='notice-1' width={700} height={600}/>
            </div>

            <div className='space-y-5'>
                 <h1 className='font-monoBold text-nowrap md:text-wrap text-[20px]  md:text-4xl font-poltwaski'>Quick & Easy liscensing</h1>
                <p className='text-[18px] font-outfit font-extralight  md:text-[20px]  w-[100%] md:w-[80%]'>Secure your license instantly. Our simple platform makes it quick and easy.</p>
            </div>

        </div>

        <div className='lg:mr-20 flex-[50%] space-y-10 w-full'>

             <div>
                <Image src='/images/notice2.svg' alt='notice-2' width={700} height={600}/>
            </div>


            <div className='space-y-5'>
                 <h1 className='font-poltwaski text-2xl text-center md:text-left md:text-4xl capitalize'>Custom leases available</h1>
                <p className='text-[18px] font-extralight font-outfit md:text-[20px]'>Control your licensing. Negotiate directly with artists for the best deals.</p>
            </div>


        </div>

        </div>
  )
}

export default PerfectMatch