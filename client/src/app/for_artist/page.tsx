import ArtistPage from '@/components/pages/artistpage'
import ProtectedRoute from '@/lib/ProtectedRoute'
import React from 'react'
import { Metadata } from 'next'


export const metadata: Metadata = {
  title: "Artist Manual ",
  description: "Leased Artist Hub",
};



function Page() {
  return (
    <ProtectedRoute>
      <ArtistPage/>
    </ProtectedRoute>
  ) 
}

export default Page