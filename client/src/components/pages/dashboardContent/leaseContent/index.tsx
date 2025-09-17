import React from 'react'

import Summary from './summary'
import DashboardHeaderSearchInfo from '../entryPointContent/DashboardHeaderSearchInfo'


function LeasePage() {
  return (
    <div className=' p-10  h-auto '>
         <DashboardHeaderSearchInfo dashboard_location="Lease Music"/>
         {/* <LeaseHolder/> */}
         <Summary/>
      </div>
  )
}

export default LeasePage