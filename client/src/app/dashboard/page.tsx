import React from 'react'
import { Metadata } from 'next';
import DashboardEntryPoint from '@/components/pages/dashboardContent/entryPointContent';
import ProtectedRoute from '@/lib/ProtectedRoute';


export const metadata: Metadata = {
  title: "Dashboard Summary",
  description: "Leased Artist Hub",
};



function Page() {

  return  (
    <ProtectedRoute>
      <DashboardEntryPoint/>
    </ProtectedRoute>
  )
}

export default Page