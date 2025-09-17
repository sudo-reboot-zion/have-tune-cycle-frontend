"use client"

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { fetchMyTracks } from '@/redux/features/tracksSlice';
import { 
  FaDollarSign, 
  FaDownload, 
  FaPlay, 
  FaArrowUp, 
  FaCalendarAlt,
  FaCrown,
  FaChartLine
} from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, PieLabelRenderProps } from 'recharts';

interface EarningsData {
  month: string;
  earnings: number;
  sales: number;
}

interface TopTrack {
  title: string;
  earnings: number;
  sales: number;
  plays: number;
  conversionRate: number;
}

function EarningsAnalytics() {
  const dispatch = useDispatch<AppDispatch>();
  const { myTracks, myTracksLoading } = useSelector((state: RootState) => state.tracks);
  
  const [earningsData, setEarningsData] = useState<EarningsData[]>([]);
  const [topTracks, setTopTracks] = useState<TopTrack[]>([]);
  const [totalStats, setTotalStats] = useState({
    totalEarnings: 0,
    monthlyGrowth: 0,
    totalSales: 0,
    avgSalePrice: 0,
    conversionRate: 0
  });

  useEffect(() => {
    dispatch(fetchMyTracks());
  }, [dispatch]);

  useEffect(() => {
    if (myTracks.length > 0) {
      // Calculate total earnings
      const totalEarnings = myTracks.reduce((sum, track) => {
        return sum + (track.purchase_count * parseFloat(track.base_price.toString()));
      }, 0);

      const totalSales = myTracks.reduce((sum, track) => sum + track.purchase_count, 0);
      const totalPlays = myTracks.reduce((sum, track) => sum + track.play_count, 0);
      const avgSalePrice = totalSales > 0 ? totalEarnings / totalSales : 0;
      const conversionRate = totalPlays > 0 ? (totalSales / totalPlays) * 100 : 0;

      setTotalStats({
        totalEarnings,
        monthlyGrowth: 12.5, // Mock data - would come from API
        totalSales,
        avgSalePrice,
        conversionRate
      });

      // Generate mock monthly data (in real app, this would come from API)
      const mockEarningsData: EarningsData[] = [
        { month: 'Jan', earnings: totalEarnings * 0.1, sales: Math.floor(totalSales * 0.1) },
        { month: 'Feb', earnings: totalEarnings * 0.15, sales: Math.floor(totalSales * 0.15) },
        { month: 'Mar', earnings: totalEarnings * 0.2, sales: Math.floor(totalSales * 0.2) },
        { month: 'Apr', earnings: totalEarnings * 0.25, sales: Math.floor(totalSales * 0.25) },
        { month: 'May', earnings: totalEarnings * 0.3, sales: Math.floor(totalSales * 0.3) },
        { month: 'Jun', earnings: totalEarnings, sales: totalSales },
      ];
      setEarningsData(mockEarningsData);

      // Calculate top performing tracks
      const tracksWithEarnings = myTracks.map(track => ({
        title: track.title,
        earnings: track.purchase_count * parseFloat(track.base_price.toString()),
        sales: track.purchase_count,
        plays: track.play_count,
        conversionRate: track.play_count > 0 ? (track.purchase_count / track.play_count) * 100 : 0
      })).sort((a, b) => b.earnings - a.earnings);

      setTopTracks(tracksWithEarnings.slice(0, 5));
    }
  }, [myTracks]);

  const COLORS = ['#761EFE', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'];

  const StatCard = ({ 
    title, 
    value, 
    change, 
    icon, 
    color 
  }: { 
    title: string; 
    value: string; 
    change: string; 
    icon: React.ReactNode; 
    color: string 
  }) => (
    <div className='bg-[#252B36] rounded-lg p-6 space-y-4'>
      <div className='flex items-center justify-between'>
        <div className={`${color} text-2xl`}>{icon}</div>
        <span className='text-green-400 text-sm font-medium'>{change}</span>
      </div>
      <div>
        <h3 className='text-gray-400 text-sm font-medium'>{title}</h3>
        <p className='text-2xl font-bold text-white mt-1'>{value}</p>
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
    <div className='space-y-8'>
      {/* Stats Overview */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        <StatCard
          title="Total Earnings"
          value={`$${totalStats.totalEarnings.toFixed(2)}`}
          change={`+${totalStats.monthlyGrowth}%`}
          icon={<FaDollarSign />}
          color="text-green-400"
        />
        <StatCard
          title="Total Sales"
          value={totalStats.totalSales.toString()}
          change="+8.2%"
          icon={<FaDownload />}
          color="text-blue-400"
        />
        <StatCard
          title="Avg Sale Price"
          value={`$${totalStats.avgSalePrice.toFixed(2)}`}
          change="+3.1%"
          icon={<FaChartLine />}
          color="text-purple-400"
        />
        <StatCard
          title="Conversion Rate"
          value={`${totalStats.conversionRate.toFixed(1)}%`}
          change="+1.8%"
          icon={<FaArrowUp />}
          color="text-orange-400"
        />
      </div>

      {/* Charts Row */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* Earnings Trend */}
        <div className='bg-[#252B36] rounded-lg p-6'>
          <div className='flex items-center gap-2 mb-6'>
            <FaCalendarAlt className='text-[#761EFE]' />
            <h3 className='text-xl font-bold text-white'>Earnings Trend</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={earningsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="month" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1a1a1a', 
                  border: '1px solid #333',
                  borderRadius: '8px'
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="earnings" 
                stroke="#761EFE" 
                strokeWidth={3}
                dot={{ fill: '#761EFE', strokeWidth: 2, r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Sales Distribution */}
        <div className='bg-[#252B36] rounded-lg p-6'>
          <div className='flex items-center gap-2 mb-6'>
            <FaCrown className='text-yellow-400' />
            <h3 className='text-xl font-bold text-white'>Top Tracks Revenue</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={topTracks}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="earnings"
                label={(props) => {
                const { value, name, x, y } = props as PieLabelRenderProps;
                if (!name) return null;

                return (
                    <text
                    x={x}
                    y={y}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="#fff"
                    fontSize={12}
                    >
      {`${name}: $${Number(value ?? 0).toFixed(0)}`}
    </text>
  );
}}
  
              >
                {topTracks.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [`$${value.toFixed(2)}`, 'Earnings']}
                contentStyle={{ 
                  backgroundColor: '#1a1a1a', 
                  border: '1px solid #333',
                  borderRadius: '8px'
                }} 
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Performing Tracks */}
      <div className='bg-[#252B36] rounded-lg p-6'>
        <h3 className='text-xl font-bold text-white mb-6'>Top Performing Tracks</h3>
        <div className='space-y-4'>
          {topTracks.map((track, index) => (
            <div key={track.title} className='flex items-center gap-4 p-4 bg-[#1a1a1a] rounded-lg'>
              <div className='w-8 h-8 bg-[#761EFE] rounded-full flex items-center justify-center font-bold text-white'>
                {index + 1}
              </div>
              
              <div className='flex-grow'>
                <h4 className='text-white font-semibold'>{track.title}</h4>
                <div className='flex items-center gap-4 text-sm text-gray-400'>
                  <span className='flex items-center gap-1'>
                    <FaPlay /> {track.plays} plays
                  </span>
                  <span className='flex items-center gap-1'>
                    <FaDownload /> {track.sales} sales
                  </span>
                  <span>{track.conversionRate.toFixed(1)}% conversion</span>
                </div>
              </div>
              
              <div className='text-right'>
                <div className='text-green-400 font-bold text-lg'>${track.earnings.toFixed(2)}</div>
                <div className='text-gray-400 text-sm'>Total earnings</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly Sales Chart */}
      <div className='bg-[#252B36] rounded-lg p-6'>
        <h3 className='text-xl font-bold text-white mb-6'>Monthly Sales Volume</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={earningsData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="month" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1a1a1a', 
                border: '1px solid #333',
                borderRadius: '8px'
              }} 
            />
            <Bar dataKey="sales" fill="#761EFE" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default EarningsAnalytics;