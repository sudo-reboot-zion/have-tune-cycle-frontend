"use client"

import React from 'react'


import IntegratedArtistDashboard from '../../artistpage/IntegratedArtistDashboard'
import EarningsAnalytics from '../../artistpage/EarningAnalytics'


function DashboardEntryPoint() {
  return (

    <div className=' p-0 lg:p-10  h-auto'>
        <IntegratedArtistDashboard/>
         <EarningsAnalytics/>
    </div>
  )
}

export default DashboardEntryPoint
