import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';


type CardPropsMusic = {
  mainImage: string;
  subImage: string;
  title: string;
  artist: string;
  price: string;
  duration: string;
  musicUrl?: string;
  onClick: () => void;
};

function MusicPlayerCard({ mainImage, subImage, artist, duration, title, onClick, musicUrl }: CardPropsMusic) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);


  useEffect(() => {
    console.log("Music URL:", musicUrl);
  }, [musicUrl]);

  const togglePlay = () => {
    console.log("Play button clicked");
    if (!audioRef.current) {
      console.error("audioRef is not set");
      return;
    }
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((error) => {
        console.error("Failed to play audio:", error);
        setIsPlaying(false);
      });
    }
    setIsPlaying(!isPlaying);
  };


  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, [musicUrl]);

  return (
    <div className="w-96 border border-brand-mouve rounded-[10px] h-auto py-5 bg-music-card-gradient font-poppins mb-10">
      <div className="mx-5">
        <div className="shadow-2xl">
          <Image
            src={mainImage}
            alt=""
            width={200}
            height={150}
            className="w-full rounded-[15px] h-[30vh]"
            style={{ objectFit: 'cover' }}
          />
        </div>

        <div className="flex items-center justify-between mt-5">
          <div>
            <Image
              src={subImage}
              alt=""
              width={50}
              height={50}
              style={{ objectFit: 'cover' }}
            />
          </div>

          <div>
            <h1 className="text-[20px] font-bold capitalize">{title}</h1>
            <p className="font-light text-[#ccc]">{artist}</p>
          </div>

          <button onClick={togglePlay} className="cursor-pointer">
            <Image
              src={isPlaying ? '/images/playbutton.svg' : '/images/pause.png' } 
              alt="Play Button"
              width={50}
              height={50}
              style={{ objectFit: 'cover' }}
            />
          </button>
        </div>

        <div className="flex items justify-between capitalize font-bold py-5">
          <div>
            <h1>{duration} ETH</h1>
          </div>
        </div>

        <div className="mt-5">
          <button
            className="bg-btn-gradient w-full p-8 text-2xl font-bold rounded-[5px] capitalize"
            onClick={onClick}
          >
            Purchase
          </button>
        </div>
      </div>

    
      {musicUrl && (
        <audio
          ref={audioRef}
          src={musicUrl}
          onEnded={() => setIsPlaying(false)}
        />
      )}
    </div>
  );
}

export default MusicPlayerCard;