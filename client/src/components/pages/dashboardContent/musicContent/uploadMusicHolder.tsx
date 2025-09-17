"use client";

import TableTitle from './tableTitle';
import Link from 'next/link';




function UploadMusicHolder() {
 return (
    <div className='my-10 h-auto p-10 rounded-2xl w-full'>
    {/* <SearchFilterColumn  /> */}


      <TableTitle />



          {/* <MusicContentForUpload
            key={index}
            image={data.image}
            title={data.title}
            index={index+1}
            genre={data.genre}
            leaseYear={data.leaseYear}
            isListed={data.isListed}
            owner={data.owner}
            price={data.price}
            tokenId={data.tokenId}
            artiste={data.artiste || ""}
            music={data.music}
          /> */}


      <Link href="/dashboard/upload" className='flex justify-center py-10 text-white'>
        <button className="text-[18px] bg-btn-gradient py-6 px-6 font-extrabold">upload</button>
      </Link>

    </div>
  );
}

export default UploadMusicHolder;