"use client"

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { fetchMyTracks } from '@/redux/features/tracksSlice';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FaPlay, FaPause, FaDownload, FaEye, FaDollarSign, FaMusic, FaPlus } from 'react-icons/fa';
import { IoInformationCircleOutline } from 'react-icons/io5';
import { Track } from '@/types/tracks.dt';

interface DashboardStats {
  totalTracks: number;
  totalEarnings: number;
  totalDownloads: number;
  totalPlays: number;
  avgPrice: number;
  recentSales: Array<{
    track_title: string;
    price_paid: number;
    purchased_at: string;
    buyer_name: string;
  }>;
}

function IntegratedArtistDashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { myTracks, myTracksLoading, myTracksError } = useSelector((state: RootState) => state.tracks);
  
  const [playingTrack, setPlayingTrack] = useState<string | null>(null);
  const [stats, setStats] = useState<DashboardStats>({
    totalTracks: 0,
    totalEarnings: 0,
    totalDownloads: 0,
    totalPlays: 0,
    avgPrice: 0,
    recentSales: []
  });

  useEffect(() => {
    dispatch(fetchMyTracks());
  }, [dispatch]);

  // Calculate stats from tracks
  useEffect(() => {
    if (myTracks.length > 0) {
      const totalTracks = myTracks.length;
      const totalEarnings = myTracks.reduce((sum, track) => sum + (track.purchase_count * parseFloat(track.base_price.toString())), 0);
      const totalDownloads = myTracks.reduce((sum, track) => sum + track.purchase_count, 0);
      const totalPlays = myTracks.reduce((sum, track) => sum + track.play_count, 0);
      const avgPrice = myTracks.reduce((sum, track) => sum + parseFloat(track.base_price.toString()), 0) / totalTracks;

      setStats({
        totalTracks,
        totalEarnings,
        totalDownloads,
        totalPlays,
        avgPrice,
        recentSales: []
      });
    }
  }, [myTracks]);

  const handlePlay = async (trackId: string) => {
    if (playingTrack === trackId) {
      setPlayingTrack(null);
    } else {
      setPlayingTrack(trackId);
      // Here you would actually play the preview using your streaming API
    }
  };

  const StatisticCard = ({ name, amount, info, icon, color = "text-white" }: {
    name: string;
    amount: string;
    info: string;
    icon: React.ReactNode;
    color?: string;
  }) => (
    <div className='w-full rounded-lg font-outfit font-extralight bg-[#252B36] p-6 space-y-4'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <div className={`${color} text-2xl`}>{icon}</div>
          <h1 className='text-sm font-medium text-gray-300 capitalize'>{name}</h1>
        </div>
        <IoInformationCircleOutline className='text-lg text-[#A2A8B4]'/>
      </div>
      <div>
        <h1 className={`text-3xl font-bold ${color}`}>{amount}</h1>
        <p className='text-sm text-gray-400 mt-1'>{info}</p>
      </div>
    </div>
  );

  const TrackRow = ({ track }: { track: Track }) => (
    <div className='bg-[#1a1a1a] rounded-lg p-4 hover:bg-[#222] transition-colors duration-200'>
      <div className='flex items-center gap-4'>
        {/* Cover Image */}
        <div className='relative w-16 h-16 rounded-lg overflow-hidden bg-[#333] flex-shrink-0'>
          {track.cover_image ? (
            <Image 
              src={track.cover_image} 
              alt={track.title}
              fill
              className='object-cover'
            />
          ) : (
            <div className='w-full h-full flex items-center justify-center'>
              <FaMusic className='text-gray-500 text-xl' />
            </div>
          )}
          
          {/* Play Button Overlay */}
          <button
            onClick={() => handlePlay(track.public_id)}
            className='absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-center justify-center'
          >
            {playingTrack === track.public_id ? (
              <FaPause className='text-white text-lg' />
            ) : (
              <FaPlay className='text-white text-lg ml-1' />
            )}
          </button>
        </div>

        {/* Track Info */}
        <div className='flex-grow'>
          <h3 className='font-poppins text-white text-lg'>{track.title}</h3>
          <div className='flex items-center gap-4 text-sm text-gray-400 mt-1'>
            <span>{track.genre_name}</span>
            <span>•</span>
            <span>{track.duration_formatted}</span>
            <span>•</span>
            <span>Uploaded {new Date(track.uploaded_at).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Stats */}
        <div className='flex items-center gap-6 text-sm'>
          <div className='text-center'>
            <div className='text-blue-400 font-semibold'>{track.play_count}</div>
            <div className='text-gray-400'>Plays</div>
          </div>
          <div className='text-center'>
            <div className='text-green-400 font-semibold'>{track.purchase_count}</div>
            <div className='text-gray-400'>Sales</div>
          </div>
          <div className='text-center'>
            <div className='text-purple-400 font-semibold'>${track.base_price}</div>
            <div className='text-gray-400'>Price</div>
          </div>
        </div>

        {/* Actions */}
        <div className='flex items-center gap-2'>
          <button className='p-2 hover:bg-[#333] rounded-lg transition-colors duration-200'>
            <FaEye className='text-gray-400 hover:text-white' />
          </button>
          <button className='p-2 hover:bg-[#333] rounded-lg transition-colors duration-200'>
            <FaDownload className='text-gray-400 hover:text-white' />
          </button>
        </div>
      </div>
    </div>
  );

  if (myTracksLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-8 h-8 border-4 border-[#761EFE] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className='p-6 lg:p-10 space-y-8'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='lg:text-3xl font-bold text-white font-poltwaski '>Artist Dashboard</h1>
          <p className='text-gray-400 mt-1 font-poppins'>Manage your music and track your success</p>
        </div>
        <button
          onClick={() => router.push('dashboard/upload')}
          className='bg-[#761EFE] hover:bg-[#5a17c4]  lg:px-6 lg:py-3 rounded-lg font-poppins text-white flex items-center gap-2 transition-colors duration-200'
        >
          <FaPlus /> Upload New Track
        </button>
      </div>

      {/* Statistics Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        <StatisticCard 
          name="Total Tracks" 
          amount={stats.totalTracks.toString()} 
          info={`${myTracks.filter(t => t.status === 'approved').length} approved`}
          icon={<FaMusic />}
          color="text-blue-400"
        />
        <StatisticCard 
          name="Total Earnings" 
          amount={`$${stats.totalEarnings.toFixed(2)}`} 
          info="From all sales"
          icon={<FaDollarSign />}
          color="text-green-400"
        />
        <StatisticCard 
          name="Total Sales" 
          amount={stats.totalDownloads.toString()} 
          info="Licenses sold"
          icon={<FaDownload />}
          color="text-purple-400"
        />
        <StatisticCard 
          name="Total Plays" 
          amount={stats.totalPlays.toString()} 
          info="Preview plays"
          icon={<FaPlay />}
          color="text-orange-400"
        />
      </div>

      {/* My Tracks Section */}
      <div className='bg-[#252B36] rounded-lg p-6'>
        <div className='flex items-center justify-between mb-6'>
          <div>
            <h2 className='text-xl font-bold text-white'>My Tracks</h2>
            <p className='text-gray-400 text-sm mt-1'>Manage and monitor your uploaded music</p>
          </div>
          <button
            onClick={() => router.push('dashboard/upload')}
            className='text-[#761EFE] hover:text-[#5a17c4] font-semibold transition-colors duration-200'
          >
            View All
          </button>
        </div>

        {myTracksError && (
          <div className="bg-red-500/20 border border-red-500 text-red-500 p-4 rounded-lg mb-6">
            Error loading tracks: {myTracksError}
          </div>
        )}

        {myTracks.length === 0 ? (
          <div className='text-center py-12'>
            <FaMusic className='text-gray-500 text-4xl mx-auto mb-4' />
            <h3 className='text-xl font-semibold text-gray-300 mb-2'>No tracks uploaded yet</h3>
            <p className='text-gray-400 mb-6'>Start building your music library and earning from your creations</p>
            <button
              onClick={() => router.push('dashboard/upload')}
              className='bg-[#761EFE] hover:bg-[#5a17c4] px-6 py-3 rounded-lg font-semibold text-white transition-colors duration-200'
            >
              Upload Your First Track
            </button>
          </div>
        ) : (
          <div className='space-y-3'>
            {myTracks.slice(0, 5).map((track) => (
              <TrackRow key={track.public_id} track={track} />
            ))}
            
            {myTracks.length > 5 && (
              <div className='text-center pt-4'>
                <button
                  onClick={() => router.push('/for_artist/tracks')}
                  className='text-[#761EFE] hover:text-[#5a17c4] font-semibold transition-colors duration-200'
                >
                  View All {myTracks.length} Tracks
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Quick Stats Footer */}
      <div className='bg-[#252B36] rounded-lg p-6'>
        <div className='flex items-center gap-3 mb-6'>
          <h2 className='text-xl font-bold font-poppins text-white'>Performance Overview</h2>
          <IoInformationCircleOutline className='text-lg text-[#A2A8B4]'/>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className='text-center'> 
            <h1 className="text-2xl font-bold text-blue-400">{stats.totalTracks}</h1>
            <p className='text-gray-400 font-semibold'>Total Tracks</p>
          </div>

          <div className='text-center'> 
            <h1 className="text-2xl font-bold text-green-400">${stats.totalEarnings.toFixed(2)}</h1>
            <p className='text-gray-400 font-semibold'>Total Earnings</p>
          </div>

          <div className='text-center'> 
            <h1 className="text-2xl font-bold text-orange-400">{stats.totalPlays}</h1>
            <p className='text-gray-400 font-semibold'>Total Plays</p>
          </div>

          <div className='text-center'> 
            <h1 className="text-2xl font-bold text-purple-400">${stats.avgPrice.toFixed(2)}</h1>
            <p className='text-gray-400 font-semibold'>Avg Price</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IntegratedArtistDashboard;