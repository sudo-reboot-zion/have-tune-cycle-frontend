
import ProfilePage from '@/components/pages/dashboardContent/profileContent'
import ProtectedRoute from '@/lib/ProtectedRoute'
import { Metadata } from 'next';
import React from 'react'


export const metadata: Metadata = {
  title: "Buyers ProfilePage",
  description: "Leased Artist Hub",
};


function Page() {
  return (
    <ProtectedRoute>
      <ProfilePage/>
  </ProtectedRoute>
  ) 
}

export default Page