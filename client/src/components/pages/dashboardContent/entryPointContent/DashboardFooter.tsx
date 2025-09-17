import React, {  useState } from 'react'
import { IoInformationCircleOutline } from 'react-icons/io5'
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
function DashBoardFooter() {

  const [listing, ] = useState<Listing[]>();
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
    <div className='bg-[#252B36] w-full py-5 rounded-[10px]'>
    <div className='mx-5 space-y-5'>
    <div className='flex items-center gap-3 md:justify-between'>
       <h1 className='text-[15px] text-nowrap font-extralight capitalize lg:text-[20px] text-white font-poppins'>Last 30d transactions</h1>
       <IoInformationCircleOutline className='text-3xl text-[#A2A8B4]'/>
    </div>

      <div className="flex flex-col  space-y-5 lg:space-y-0 md:flex-row items-center md:items-center justify-between">

        <div className=' flex flex-row items-center md:flex-col lg:space-y-3 gap-5 lg:gap-0'> 
            <h1 className="text-[15px] font-monoBold lg:text-3xl">{totalSongs}</h1>
            <h1 className='text-brand-brew text-[15px] lg:text-3xl  font-bold'>Total Songs</h1>
        </div>

        <div className=' flex flex-row items-center md:flex-col lg:space-y-3 gap-5 lg:gap-0'> 
             <h1 className="text-[15px] font-monoBold lg:text-3xl">{totalListed}</h1>
            <h1 className='text-brand-brew  lg:text-3xl  capitalize font-bold'>Total Leased</h1>
        </div>

        <div className=' flex flex-row items-center md:flex-col lg:space-y-3 gap-5 lg:gap-0'> 
            <h1 className="text-[15px] font-monoBold text-[#FFA500] lg:text-3xl">{totalUnlisted}</h1>
            <h1 className='text-brand-brew text-[15px] lg:text-3xl text-nowrap font-bold capitalize'>Total Unleased</h1>
        </div>

        <div className=' flex flex-row items-center md:flex-col lg:space-y-3 gap-5 lg:gap-0'> 
            <h1 className="text-[15px] lg:text-3xl font-monoBold text-[#32D74B]">{listing?.filter(item => item.isListed).reduce((acc, item) => acc + Number(Number(item.price) / 1e18), 0).toString() || "0"} ETH</h1>
            <h1 className='text-[15px] text-brand-brew lg:text-3xl  font-bold capitalize'>earnings</h1>
        </div>
      </div>

        </div>
    </div>
  )
}

export default DashBoardFooter