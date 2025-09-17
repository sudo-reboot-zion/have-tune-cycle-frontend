import Header from '@/components/layouts/Header'
import React from 'react'
import BaseContent from './BaseContent'
import Footer from '@/components/layouts/Footer'
import OwnSound from './OwnSound'
import Unlock from './Unlock'
import NewOpportunities from './NewOpportunities'
import PerfectMatch from './PerfectMatch'
import WhatMakesUsGreat from './WhatMakesUsGreat'
import RecommendationHolder from './RecommendationHolder'

function LandingPage() {
  return (
    <React.Fragment>
        <Header/>
        <main>
        <BaseContent/>
        <OwnSound/>
        <Unlock/>
        <NewOpportunities/>
        <PerfectMatch/>
        <WhatMakesUsGreat/>
        <RecommendationHolder/>
        </main>
        <Footer/>
    </React.Fragment>
  )
}

export default LandingPage