import StatisticCard from '@/components/common/cards/StatisticCard';
import React, {  useState } from 'react'




interface Listing {
  owner:string;
  price:bigint;
  tokenId: bigint;
  leaseYear:bigint;
  title:string;
  music: string;
  image:string;
  genre: string;
  isListed:boolean;
}

function DashBoardStatisticContent() { 

  const [listing, ] = useState<Listing[]>();



  return (
    <div className='py-10'>   
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-10'>    
                <StatisticCard key={1} name={"Total Songs Price"} amount={listing?.reduce((acc, item) => acc + Number(Number(item.price) / 1e18), 0).toString() || "0"} info={"One"} base={"Two"}/>
                <StatisticCard key={1} name={"Total Leased Price"} amount={listing?.filter(item => item.isListed).reduce((acc, item) => acc + Number(Number(item.price) / 1e18), 0).toString() || "0"} info={"One"} base={"Two"}/>
                <StatisticCard key={1} name={"Total Unleased Price"} amount={listing?.filter(item => !item.isListed).reduce((acc, item) => acc + Number(Number(item.price) / 1e18), 0).toString() || "0"} info={"One"} base={"Two"}/>    
        </div>

        
    </div>
  )
}

export default DashBoardStatisticContent