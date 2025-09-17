import React from 'react'

import SupportHolder from './supportHolder'
import GetSupport from './getSupport'
import { Metadata } from 'next';
import DashboardHeaderSearchInfo from '../entryPointContent/DashboardHeaderSearchInfo';


export const metadata: Metadata = {
  title: "Support Content",
  description: "Leased Artist Hub",
};


function SupportPage() {
  return (
    <div className=' p-10  h-auto bg-[#161212]'>
       <DashboardHeaderSearchInfo dashboard_location="Support"/>
       <GetSupport/>
        <SupportHolder/>
    </div>
  )
}

export default SupportPage