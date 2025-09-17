import { IoInformationCircleOutline } from 'react-icons/io5'



interface StatsProps{
   name:string;
   amount:string;
   info:string;
   base:string;
}

function StatisticCard({name,amount}: StatsProps) {
  return (
    <div className='w-full rounded-[10px]  bg-[#252B36]  lg:p-5 space-y-5'>
    <div className='flex items-center gap-3'>
       <h1 className='text-[15px] font-extralight text-white  font-outfit  text-nowrap capitalize lg:text-[20px]'>{name}</h1>
       <IoInformationCircleOutline className='text-[20px] text-[#A2A8B4]'/>
    </div>

    <div>
       <h1 className='text-2xl font-monoBold lg:text-6xl'> {amount} ETH</h1>
    </div>

</div>
  )
}

export default StatisticCard