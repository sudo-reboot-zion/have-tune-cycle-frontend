import { DiDotnet } from 'react-icons/di'
import React from 'react'
import Image from 'next/image'


interface SongsIdProps{
  index: number;
  owner:string;
  price:bigint;
  tokenId: bigint;
  leaseYear:bigint;
  title:string;
  music: string;
  image:string;
  genre: string;
  artiste: string;
  isListed:boolean;
}

function MusicContentForUpload({image,genre,title,isListed,price,leaseYear,index,artiste}:SongsIdProps) {
  return (
    <div className='flex items-center gap-10 py-4 border-b border-gray-300'>
    <div className='flex-1 text-center'>{index}</div>
    <div className="flex-1 flex items-center gap-3">
      <Image src={image} alt={`${image}.txt`} width={30} height={30} />
      <h1 className='text-nowrap'>{title}</h1>
    </div>

    <div className='flex-1 w-14 px-2 p-1  bg-[#274539]  border-4 rounded-full border-[#70d84d]'>
        <h1 className='text-center text-[#70d84d] font-bold'>{genre}</h1>
    </div>

    <div className='flex-1'>25.02.2014</div>

    <div className='flex-1'>{isListed ? "Leased" : "Available"}</div>

    <div className="flex-1 flex items-center gap-1">
      <DiDotnet className="text-3xl text-blue-500" />
      <h1>{artiste}</h1>
    </div>

    <div className='flex-1'>{(Number(price)/1e18).toString()} Eth</div>

    <div className='flex-1'>{leaseYear.toString()} y</div>
  </div>
  )
}

export default MusicContentForUpload