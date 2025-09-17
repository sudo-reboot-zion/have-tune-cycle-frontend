import FrequentAskQuestionCard from '@/components/common/cards/FrequentAskQuestionCard'
import SupportCard from '@/components/common/cards/SupportCard'

import { supportiveTags } from '@/lib/data'
import React from 'react'

function SupportHolder() {
  return (
    <div className='py-10 text-white'>


        <div className='mb-10'>
            <h1 className='text-3xl capitalize font-poltwaski'>Find answers and get support (FAQ&apos;s)</h1>
        </div>

       <div className='grid grid-cols-3 gap-10'>

        {supportiveTags.map((data,index)=>(
            <SupportCard key={index} text={data.text} image={data.image} title={data.title} />
        ))}


       </div>

       <div className='py-10'>
          <div>
            <h1 className='text-3xl font-monoBold capitalize my-10 font-poltwaski'>Frequent ask question</h1>
          </div>

          <div className='space-y-10'>
          <FrequentAskQuestionCard question={'What is master rights leasing, and how does it benefit my project?'}
           answer={'You lease the original recording for temporary use, giving your project a unique, professional sound without buying the rights outright.'}/>

        <FrequentAskQuestionCard question={'What is master rights leasing, and how does it benefit my project?'}
           answer={'You lease the original recording for temporary use, giving your project a unique, professional sound without buying the rights outright.'}/>

          </div>


       </div>
    </div>
  )
}

export default SupportHolder