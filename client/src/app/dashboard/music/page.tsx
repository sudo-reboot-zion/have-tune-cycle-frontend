import React from 'react'
import MusicUploadPage from '@/components/pages/dashboardContent/musicContent'
import ProtectedRoute from '@/lib/ProtectedRoute'
import {Metadata} from 'next'


export const metadata: Metadata = {
  title: "Music Information",
  description: "Leased Artist Hub",
};


function Page() {
  return (
    <ProtectedRoute>
      <MusicUploadPage/>
    </ProtectedRoute>
  )
       
}

export default Page