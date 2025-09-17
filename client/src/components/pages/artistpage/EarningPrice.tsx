import React from 'react'

import Image from 'next/image'
import EarnCard from '@/components/common/cards/EarnCard'


function EarningPrice() {
  return (
    <div>
        <div className='mb-20 lg:mb-40 mx-5 text-white'>
        <div className='mb-10 lg:mb-20'>
            <h1 className='text-[20px] text-center text-nowrap font uppercase lg:text-start md:text-3xl font-poltwaski lg:text-5xl'>Pricing and earnings</h1>
        </div>

        <div className='flex flex-col lg:gap-2 gap-10 lg:flex-row'>
<EarnCard
  p1='At TuneCycle, we keep things simple and transparent. For every successful license sold on our platform, we take a flat 20% commission.'
  p2='For example, if your track sells for $30, you receive $24 while our fee is $6. This ensures fairness and consistency for all artists.'
  p3='We’re exploring future tiered options for high-volume creators. As a special offer, new artists who join within the first 30 days enjoy a reduced 15% commission on their first 5 sales.'
/>


            <div className='w-full'>
                <Image
                  src='/images/money_bar.svg'
                  width={600}
                  height={600}
                  className='w-full'
                  alt='bar'
                />
            </div>

<EarnCard
  p1='TuneCycle empowers artists with flexible payout options. Choose to receive your earnings immediately after each license, opt for a monthly payout, or let them accumulate for a bigger cash-out later.'
  p2='We support secure payment methods including bank transfers, PayPal, and Stripe Connect — so you can access your funds conveniently.'
  p3='A small $1 processing fee applies to most withdrawals, while direct transfers within the same payment network are fee-free.'
/>
        </div>
    </div>
    </div>

  )
}

export default EarningPrice