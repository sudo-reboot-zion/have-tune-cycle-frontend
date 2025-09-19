import UploadMusicPage from '@/components/pages/dashboardContent/uploadContent'
import ProtectedRoute from '@/lib/ProtectedRoute';
import { Metadata } from 'next';
import React from 'react'


export const metadata: Metadata = {
  title: "Upload Music",
  description: "Leased Artist Hub",
};




function Page() {
  return (
     <ProtectedRoute>
       <UploadMusicPage/>
     </ProtectedRoute> 
      )
}

export default Page