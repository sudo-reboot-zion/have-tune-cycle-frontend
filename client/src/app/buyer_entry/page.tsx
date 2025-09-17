import ForBuyersPage from '@/components/pages/buyerspage';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Buyers",
  description: "Leased Artist Hub",
};



function Page() {
  return <ForBuyersPage/>
}

export default Page