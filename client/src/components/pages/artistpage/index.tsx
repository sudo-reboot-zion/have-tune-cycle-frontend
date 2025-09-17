import Footer from '@/components/layouts/Footer'
import Header from '@/components/layouts/Header'
import React from 'react'
import BaseContent from './BaseContent'
import HowItWorksHolder from './HowItWork'
import EarningPrice from './EarningPrice'

function ArtistPage() {
  return (
    <React.Fragment>
        <Header/>
         <main>
            <BaseContent/>
            <HowItWorksHolder/>
            <EarningPrice/>
         </main>
        <Footer/>
    </React.Fragment>
  )
}

export default ArtistPage