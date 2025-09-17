import React from 'react'
import { Metadata } from 'next';
import DashboardEntryPoint from '@/components/pages/dashboardContent/entryPointContent';


export const metadata: Metadata = {
  title: "Dashboard",
  description: "Leased Artist Hub",
};



function Page() {
  return <DashboardEntryPoint/>
}

export default Page