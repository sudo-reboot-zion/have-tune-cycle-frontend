import Footer from '@/components/layouts/Footer'
import Header from '@/components/layouts/Header'
import React from 'react'
import MarketPlaceContent from './MarketPlaceContent'

function MarketPlace() {
  return (
    <React.Fragment>
         <Header/>
         <main>
            <MarketPlaceContent/>
         </main>
         <Footer/>
    </React.Fragment>
  )
}

export default MarketPlace