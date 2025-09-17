import React from 'react'
import { askQuestion } from '@/lib/data'
import FrequentAskQuestionCard from '@/components/common/cards/FrequentAskQuestionCard'


function FrequentAskQuestion() {
  return (
    <div className='mb-32 mx-5 lg:leftRightSpacing'>
        <div className='flex justify-center mb-10'>
            <h1 className='text-[23px] text-center font-monoBold lg:text-start lg:text-4xl font-poltwaski text-white'>Frequently Asked Questions(FAQs)</h1>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
          {askQuestion.map((item,index)=>(
            <FrequentAskQuestionCard key={index} question={item.question} answer={item.answers} />
          ))}
        </div>
    </div>
  )
}

export default FrequentAskQuestion