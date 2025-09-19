import SupportPage from '@/components/pages/dashboardContent/supportContent'
import ProtectedRoute from '@/lib/ProtectedRoute';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Support Page",
  description: "Leased Artist Hub",
};




function Page() {
  return (
    <ProtectedRoute>
      <SupportPage/>
    </ProtectedRoute>
  ) 
}

export default Page