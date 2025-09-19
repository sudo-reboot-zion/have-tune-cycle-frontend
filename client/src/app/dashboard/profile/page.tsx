import ProfilePage from '@/components/pages/dashboardContent/profileContent'
import React from 'react'
import {Metadata} from 'next'
import ProtectedRoute from '@/lib/ProtectedRoute';

export const metadata: Metadata = {
  title: "Artist Profile Page",
  description: "Leased Artist Hub",
};


function Page() {

  return  (
    <ProtectedRoute>
      <ProfilePage/>
    </ProtectedRoute> )
}

export default Page