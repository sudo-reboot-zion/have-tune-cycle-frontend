import { tracksApi } from '@/app/api/tracksApi';
import { Track, TracksSectionProps } from '@/types/tracks.dt';
import Image from 'next/image';
import React, { useState, useRef } from 'react';
import { LuPlay, LuPause, LuHeart, LuShoppingCart, LuClock, LuEye, LuVolume2, LuCheck } from 'react-icons/lu';
import PaymentModal from '../shared/PaymentModal';
import { toast } from 'sonner';

const TracksSection: React.FC<TracksSectionProps> = ({
  tracks,
  loading = false,
  onTrackPlay,
  onTrackLike
}) => {
  const [playingTrack, setPlayingTrack] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [paymentModalTrack, setPaymentModalTrack] = useState<Track | null>(null);
  const [purchasedTracks, setPurchasedTracks] = useState<Set<string>>(new Set());
  const [isModalClosing, setIsModalClosing] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Audio player functions
  const handlePlayPause = async (track: Track) => {
    if (playingTrack === track.public_id) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setPlayingTrack(null);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      
      try {
        const audioUrl = await tracksApi.streamPreview(track.public_id);
        const audio = new Audio(audioUrl);
        audioRef.current = audio;
        
        audio.addEventListener('loadedmetadata', () => {
          setDuration(audio.duration);
        });
        
        audio.addEventListener('timeupdate', () => {
          setCurrentTime(audio.currentTime);
        });
        
        audio.addEventListener('ended', () => {
          setPlayingTrack(null);
          setCurrentTime(0);
        });
        
        audio.play();
        setPlayingTrack(track.public_id);
        onTrackPlay(track);
      } catch (error) {
        console.error('Failed to load preview:', error);
        toast.error('Failed to load track preview');
      }
    }
  };

  const handlePurchaseClick = (track: Track) => {
    // Check if already purchased
    if (purchasedTracks.has(track.public_id)) {
      toast.info('You have already purchased this track');
      return;
    }
    
    setIsModalClosing(false);
    setPaymentModalTrack(track);
  };

  const handleCloseModal = () => {
    setIsModalClosing(true);
    // Add a small delay to allow modal animation
    setTimeout(() => {
      setPaymentModalTrack(null);
      setIsModalClosing(false);
    }, 300);
  };

  const handlePaymentSuccess = (purchaseId: string, trackId?: string) => {
    // Handle successful purchase
    console.log('Purchase successful:', purchaseId);
    
    // Add track to purchased tracks set
    if (trackId) {
      setPurchasedTracks(prev => new Set(prev).add(trackId));
    } else if (paymentModalTrack) {
      setPurchasedTracks(prev => new Set(prev).add(paymentModalTrack.public_id));
    }
    
    // Show success message
    toast.success('🎉 Purchase successful! You can now download your track.', {
      duration: 5000,
      action: {
        label: 'View Purchases',
        onClick: () => {
          // Navigate to purchases page
          window.location.href = '/dashboard/purchases';
        }
      }
    });
    
    // Close modal
    handleCloseModal();
    
    // Optional: Trigger any parent callbacks
    // onTrackPurchaseSuccess?.(paymentModalTrack, purchaseId);
  };

  const handlePaymentError = (error: string) => {
    console.error('Payment failed:', error);
    toast.error(`Payment failed: ${error}`);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(price);
  };

  const formatUploadDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="py-8">
        <h2 className="text-2xl text-white font-poltwaski mb-6">
          Latest Tracks
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden animate-pulse">
              <div className="w-full h-48 bg-gray-200"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Empty state
  if (!tracks || tracks.length === 0) {
    return (
      <div className="py-12 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <LuPlay className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No tracks found</h3>
          <p className="text-gray-500">Try adjusting your search or filters to find what you&apos;re looking for.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl text-white font-poltwaski lg:text-3xl">
            Latest Tracks
          </h2>
          {/* <span className="text-sm text-white font-outfit">
            {tracks.length} track{tracks.length !== 1 ? 's' : ''} found
          </span> */}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {tracks.map((track: Track) => {
            const isPlaying = playingTrack === track.public_id;
            const isPurchased = purchasedTracks.has(track.public_id);
            const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

            return (
              <div
                key={track.public_id}
                className={`bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group ${
                  isPlaying ? 'ring-2 ring-blue-500 shadow-lg' : ''
                } ${isPurchased ? 'ring-2 ring-green-500' : ''}`}
              >
                {/* Cover Image */}
                <div className="relative">
                  <div className="w-full h-48 bg-gray-200 overflow-hidden">
                    {track.cover_image ? (
                      <Image
                        src={track.cover_image}
                        alt={`${track.title} cover`}
                        fill
                        className={`w-full h-full object-cover transition-all duration-300 ${
                          isPlaying ? 'scale-105 brightness-110' : 'group-hover:scale-105'
                        }`}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                        <LuPlay className="w-12 h-12 text-white opacity-60" />
                      </div>
                    )}
                  </div>
                  
                  {/* Play/Pause Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      onClick={() => handlePlayPause(track)}
                      className={`w-16 h-16 bg-white shadow-xl hover:bg-gray-50 rounded-full flex items-center justify-center transition-all duration-200 ${
                        isPlaying 
                          ? 'opacity-100 scale-100' 
                          : 'opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100'
                      }`}
                    >
                      {isPlaying ? (
                        <LuPause className="w-7 h-7 text-gray-700" />
                      ) : (
                        <LuPlay className="w-7 h-7 text-gray-700 ml-1" />
                      )}
                    </button>
                  </div>
                  
                  {/* Progress Bar */}
                  {isPlaying && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-black bg-opacity-20">
                      <div 
                        className="h-full bg-blue-500 transition-all duration-100"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  )}
                  
                  {/* Featured Badge */}
                  {track.is_featured && (
                    <div className="absolute top-3 left-3">
                      <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">
                        Featured
                      </span>
                    </div>
                  )}
                  
                  {/* Purchased Badge */}
                  {isPurchased && (
                    <div className="absolute top-3 left-3">
                      <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                        <LuCheck className="w-3 h-3" />
                        Owned
                      </span>
                    </div>
                  )}
                  
                  {/* Price Tag */}
                  {!isPurchased && (
                    <div className="absolute top-3 right-3">
                      <span className="bg-black bg-opacity-70 text-white text-sm font-semibold px-2 py-1 rounded">
                        {formatPrice(track.base_price)}
                      </span>
                    </div>
                  )}

                  {/* Now Playing Indicator */}
                  {isPlaying && (
                    <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                      <LuVolume2 className="w-3 h-3" />
                      <span>Playing</span>
                    </div>
                  )}
                </div>
                
                {/* Track Info */}
                <div className="p-4">
                  {/* Title and Artist */}
                  <div className="mb-2">
                    <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-1 truncate">
                      {track.title}
                    </h3>
                    <p className="text-gray-600 text-sm truncate">
                      by {track.artist_full_name || track.artist_name}
                    </p>
                  </div>
                  
                  {/* Genre and Mood */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {track.genre_name}
                    </span>
                    <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                      {track.mood_name}
                    </span>
                  </div>
                  
                  {/* Track Details */}
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <LuClock className="w-3 h-3" />
                        {isPlaying ? formatTime(currentTime) : track.duration_formatted}
                      </span>
                      <span className="flex items-center gap-1">
                        <LuEye className="w-3 h-3" />
                        {track.play_count.toLocaleString()}
                      </span>
                    </div>
                    <span>{formatUploadDate(track.uploaded_at)}</span>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    {isPurchased ? (
                      <button
                        onClick={() => {
                          // Navigate to downloads or show download modal
                          window.location.href = '/dashboard/purchases';
                        }}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 px-3 rounded-md transition-colors flex items-center justify-center gap-2"
                      >
                        <LuCheck className="w-4 h-4" />
                        Download
                      </button>
                    ) : (
                      <button
                        onClick={() => handlePurchaseClick(track)}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-3 rounded-md transition-colors flex items-center justify-center gap-2"
                      >
                        <LuShoppingCart className="w-4 h-4" />
                        Buy Now
                      </button>
                    )}
                    
                    {onTrackLike && (
                      <button
                        onClick={() => onTrackLike(track)}
                        className="bg-gray-100 hover:bg-red-50 hover:text-red-600 text-gray-700 p-2 rounded-md transition-colors"
                      >
                        <LuHeart className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        track={paymentModalTrack}
        isOpen={!!paymentModalTrack && !isModalClosing}
        onClose={handleCloseModal}
        onSuccess={handlePaymentSuccess}
        onError={handlePaymentError}
      />
    </>
  );
};

export default TracksSection;