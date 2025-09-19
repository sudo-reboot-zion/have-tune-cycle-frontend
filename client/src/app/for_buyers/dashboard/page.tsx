import BuyerDashboardOverview from '@/components/pages/buyerspage/buyersBoardContent'
import ProtectedRoute from '@/lib/ProtectedRoute';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Buyers Dashboard Review",
  description: "Leased Artist Hub",
};


function Page() {
  return (
    <ProtectedRoute>
      <BuyerDashboardOverview/>
    </ProtectedRoute>
  ) 
}

export default Page