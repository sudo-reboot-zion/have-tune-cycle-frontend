// "use client"
// import React, { useEffect, useState } from 'react'



// import { Listing } from '@/types/global.dt';




// function LeaseHolder() {

//   const [listing, setListing] = useState<Listing[]>([]);
//   const [, setLoading] = useState(false);



// //   useEffect(()=> { 
// //     const fetchUserData = async () => {
// //         if(walletAddress){
// //             const balance = await readUserListings(`${walletAddress}` as `0x{string}`);
// //             if (balance) {
// //               setListing(balance);
// //               dispatch(setTotalItems(balance.length))
// //               dispatch(setItemsPerpage(6))
// //             }
// //         }
// //     };
// //     fetchUserData();
// // },[walletAddress,nftTx, dispatch])

// const  handleSubmit  = async (index: number) => {
//  console.log('gee')
// };
 




  
//   return (
// <div className='my-10 h-auto p-10 rounded-2xl w-full bg-[#252B36] text-white'>
//   <div className='py-5'>
//     {/* <SearchFilterColumn
//       filterFunction={filteredListings ? (item, query) =>
//         item.title.toLowerCase().includes(query.toLowerCase()) ||
//         item.genre.toLowerCase().includes(query.toLowerCase()) ||
//         item.owner.toLowerCase().includes(query.toLowerCase())
//         : () => false
//       }
//     /> */}
//   </div>

//   <div className='pb-5'>
//     <h1 className='text-3xl font-extralight font-poppins'>Unleased Music</h1>
//   </div>

//   {/* Conditionally render the grid or the NotFoundContent */}

//         {/* <LeasedCard
//           key={data.title}
//           imageSrc={data.image}
//           amount={(Number(data.price) / 1e18).toString()}
//           duration={data.leaseYear.toString()}
//           title={data.title}
//           onClick={() => handleSubmit(data.originalIndex)}
//           artiste={data.artiste || 'unknown artiste'}
//           musicUrl={data.music}
//         /> */}
   
// </div>

//   )
// }

// export default LeaseHolder