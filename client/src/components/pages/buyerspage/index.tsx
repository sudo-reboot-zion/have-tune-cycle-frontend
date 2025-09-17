"use client"
import React, { useEffect, useState } from 'react'


import FrequentAskQuestion from './frequentAskQuestionHolder'

import UnlockOriginalContent from './unlockOriginal'
import Header from '@/components/layouts/Header'
import Footer from '@/components/layouts/Footer'
import BaseContent from './BaseContent'





function ForBuyersPage() {

  const [, setIsLoading] = useState(true)

  useEffect(()=>{
      const timer = setTimeout(()=>{
        setIsLoading(false)
      },3000)
      return ()=> clearTimeout(timer)
  },[])

  return (
    <React.Fragment>
        <Header/>
        <main>
        <BaseContent/>
        <UnlockOriginalContent/>
        <FrequentAskQuestion/>
        </main>

        <Footer/>  
    </React.Fragment>
  )
}

export default ForBuyersPage