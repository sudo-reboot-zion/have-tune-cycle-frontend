import ForBuyersPage from '@/components/pages/buyerspage';
import ProtectedRoute from '@/lib/ProtectedRoute';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Buyers",
  description: "Leased Artist Hub",
};


function Page() {
  return (
    <ProtectedRoute>
       <ForBuyersPage/>
    </ProtectedRoute>
  )
}

export default Page