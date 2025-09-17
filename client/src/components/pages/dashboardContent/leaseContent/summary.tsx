"use client"

import Summarycard from '@/components/common/cards/SummaryCard';
import React, {useState } from 'react'

// interface Listing {
//   owner:string;
//   price:bigint;
//   tokenId: bigint;
//   leaseYear:bigint;
//   title:string;
//   music: string;
//   image:string;
//   genre: string;
//   isListed:boolean; 
// }

function Summary() {
  const [totalSongs, ] = useState<number>(0);
  const [totalListed, ] = useState<number>(0);
  const [totalUnlisted, ] = useState<number>(0);

  
//   useEffect(()=> {
//     const fetchUserData = async () => {
//         if(walletAddress){
//             const balance = await readUserListings(`${walletAddress}` as `0x${string}`);
//             if (balance) {
//               setListing(balance);
//               setTotalSongs(balance.length);
//               setTotalListed(balance.filter(item => item.isListed).length);
//               setTotalUnlisted(balance.filter(item => !item.isListed).length);
//             }
            
//         }
//     };
//     fetchUserData();
// },[walletAddress])
  return (
    <div className='mt-5 pb-10 text-white font-poppins '>

        <div className='mb-10'>
            <h1 className='text-3xl font-monoBold'>Summary</h1>
        </div>

        <div className='grid grid-cols-3 gap-10'>
            <Summarycard title='Total Songs' description='All your total songs' totalLeases={totalSongs}/>
            <Summarycard title='Total Leased Songs' description='All your leased songs' totalLeases={totalListed}/>
            <Summarycard title='Total Unleased Songs' description='All your unleased songs' totalLeases={totalUnlisted}/>          
        </div>

    </div>
  )
}

export default Summary