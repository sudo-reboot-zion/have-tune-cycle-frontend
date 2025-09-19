import React from 'react'

import MarketPlace from '@/components/pages/marketplacepage'
import ProtectedRoute from '@/lib/ProtectedRoute'
import {Metadata} from 'next'


export const metadata: Metadata = {
  title: "Market place",
  description : "Scan music for projects etc..."
}
function Page() {
  return (
    <ProtectedRoute>
      <MarketPlace/>
    </ProtectedRoute>
  ) 
}

export default Page