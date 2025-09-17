import React from 'react'


interface SummaryCardProps {
  totalLeases: number;
  description: string;
  title: string;
}

function Summarycard({ totalLeases, description, title }: SummaryCardProps) {
  return (
    <div className='p-5 w-full bg-[#252B36] rounded-xl space-y-5'>
       <h1 className='font-bold'>{title}</h1>
       <h1 className='text-4xl font-monoBold'>{totalLeases}</h1>
       <p className='font-bold'>{description}</p>
    </div>
  )
}

export default Summarycard