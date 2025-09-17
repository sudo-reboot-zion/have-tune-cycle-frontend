'use client'
import React, { useState, useEffect, ReactNode } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { fetchUserPurchases } from '@/redux/features/paymentSlice';
import { usePayment } from '@/hooks/usePayment';
import { paymentApi } from '@/app/api/paymentApi'; 
import Link from 'next/link';
import { 
  FaDownload, 
  FaMusic, 
  FaDollarSign,
  FaPlay,
  FaPause,
  FaFileDownload,
  FaCertificate,
  FaEye,
  FaFilter
} from 'react-icons/fa';
import { useAuth } from '@/hooks/useAuth';
import PurchaseHistoryModal from '../../../common/PurchaseHistoryModel';
import { Purchase } from '@/types/payment.dt';



const EntireBuyerStuff = () => {
  const dispatch = useAppDispatch();
  const { purchases, error, isProcessing } = useAppSelector((state) => state.payment);
  const { downloadTrack } = usePayment();
  const {user} = useAuth()
  const [playingTrack, setPlayingTrack] = useState<string | null >(null);
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  // Fetch purchases on component mount
  useEffect(() => {
    dispatch(fetchUserPurchases());
  }, [dispatch]);

  // Calculate real stats from purchases
  const stats = {
    totalPurchases: purchases.length,
    totalSpent: purchases.reduce((sum, purchase) => sum + parseFloat(purchase.price_paid.toString()), 0),
    downloadsThisMonth: purchases.filter(purchase => {
      const purchaseDate = new Date(purchase.purchased_at);
      const now = new Date();
      return purchaseDate.getMonth() === now.getMonth() && purchaseDate.getFullYear() === now.getFullYear();
    }).length,
    uniqueArtists: [...new Set(purchases.map(p => p.track_artist))].length
  };

  // Get recent purchases (last 8 for better display)
  const recentPurchases = purchases
    .slice()
    .sort((a, b) => new Date(b.purchased_at).getTime() - new Date(a.purchased_at).getTime())
    .slice(0, 8);

  const handleDownload = async (purchaseId: string) => {
    try {
      await downloadTrack(purchaseId);
    } catch (error) {
      console.error('Download failed:', error);
      // You could show a toast notification here
    }
  };

  const handleDownloadAllTracks = async () => {
    try {
      for (const purchase of purchases) {
        await handleDownload(purchase.public_id);
        // Small delay to prevent overwhelming the server
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    } catch (error) {
      console.error('Error downloading all tracks:', error);
    }
  };

  const handleDownloadAllCertificates = async () => {
    try {
      for (const purchase of purchases) {
        await handleCertificateDownload(purchase.public_id);
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    } catch (error) {
      console.error('Error downloading all certificates:', error);
    }
  };

  const handleCertificateDownload = async (purchaseId: string) => {
    try {
      // Use your existing paymentApi directly
      const response = await paymentApi.downloadLicense(purchaseId);
      
      // Create blob URL for download
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      
      // Get filename from Content-Disposition header if available
      const contentDisposition = response.headers['content-disposition'];
      let filename = 'license-certificate.pdf';
      
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
        if (filenameMatch && filenameMatch[1]) {
          filename = filenameMatch[1].replace(/['"]/g, '');
        }
      }

      // Trigger download
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Certificate download failed:', error);
      // You could show a toast notification here
    }
  };

  // Get license type distribution from real data
  const licenseStats = purchases.reduce((acc, purchase) => {
    const license = purchase.license_name || 'Standard';
    acc[license] = (acc[license] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Get top artists from purchases
  const topArtists = Object.entries(
    purchases.reduce((acc, purchase) => {
      const artist = purchase.track_artist;
      acc[artist] = (acc[artist] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  )
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);

  const StatCard = ({ icon, title, value, subtitle, color = "text-blue-400" }: {
    icon: ReactNode;
    title: string;
    value: string | number;
    subtitle: string;
    color?: string;
  }) => (
    <div className="bg-[#252B36] rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`${color} text-2xl`}>{icon}</div>
        <span className="text-green-400 text-sm">+12%</span>
      </div>
      <div>
        <h3 className="text-2xl font-bold text-white">{value}</h3>
        <p className="text-gray-400 text-sm">{title}</p>
        <p className="text-gray-500 text-xs mt-1">{subtitle}</p>
      </div>
    </div>
  );

  const PurchaseRow = ({ purchase }: { purchase: Purchase }) => (
    <div className="bg-[#1a1a1a] rounded-lg p-4 hover:bg-[#222] transition-colors">
      <div className="flex items-center gap-4">
        {/* Track Info */}
        <div className="w-12 h-12 bg-[#252B36] rounded-lg flex items-center justify-center">
          <FaMusic className="text-blue-400" />
        </div>
        <div className="flex-1">
          <h4 className="text-white font-medium">{purchase.track_title}</h4>
          <p className="text-gray-400 text-sm">by {purchase.track_artist}</p>
          <p className="text-gray-500 text-xs">
            {new Date(purchase.purchased_at).toLocaleDateString()}
          </p>
        </div>
        
        {/* Price */}
        <div className="text-right">
          <p className="text-white font-medium">${parseFloat(purchase.price_paid.toString()).toFixed(2)}</p>
          <p className="text-gray-400 text-sm">{purchase.license_name}</p>
        </div>
        
        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => handleDownload(purchase.public_id)}
            disabled={isProcessing}
            className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
            title="Download Track"
          >
            <FaDownload size={14} />
          </button>
          
          {/* Certificate Download Button */}
          <button
            onClick={() => handleCertificateDownload(purchase.public_id)}
            disabled={isProcessing}
            className="p-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors disabled:opacity-50"
            title="Download License Certificate"
          >
            <FaCertificate size={14} />
          </button>
          
          <button
            onClick={() => setPlayingTrack(playingTrack === purchase.public_id ? null : purchase.public_id)}
            className="p-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            title="Play/Pause"
          >
            {playingTrack === purchase.public_id ? <FaPause size={14} /> : <FaPlay size={14} />}
          </button>
        </div>
      </div>
    </div>
  );

  if (error) {
    return (
      <div className="min-h-screen bg-[#1A1A1A] text-white p-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-red-900/20 border border-red-500 rounded-lg p-4">
            <h2 className="text-red-400 font-semibold mb-2">Error Loading Dashboard</h2>
            <p className="text-red-300">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white">
      {/* Header */}
      <header className="bg-[#252B36] shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl  text-white font-poltwaski">Buyer Dashboard</h1>
              <p className="text-gray-400 mt-1 font-outfit">Manage your music library and projects</p>
            </div>
            <div className="flex items-center gap-4">
              <Link 
                href="/market_place"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                Browse Marketplace
              </Link>

              <div className="w-10 h-10 bg-primaryColor rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">
                  {user
                    ? `${user.first_name?.charAt(0) ?? ""}${user.last_name?.charAt(0) ?? ""}`
                    : ""}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<FaMusic />}
            title="Total Purchases"
            value={stats.totalPurchases}
            subtitle="All time tracks"
            color="text-blue-400"
          />
          <StatCard
            icon={<FaDollarSign />}
            title="Total Spent"
            value={`$${stats.totalSpent.toFixed(2)}`}
            subtitle="Lifetime investment"
            color="text-green-400"
          />
          <StatCard
            icon={<FaMusic />}
            title="Unique Artists"
            value={stats.uniqueArtists}
            subtitle="Different creators"
            color="text-purple-400"
          />
          <StatCard
            icon={<FaFileDownload />}
            title="This Month"
            value={stats.downloadsThisMonth}
            subtitle="New downloads"
            color="text-orange-400"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Purchases */}
          <div className="lg:col-span-2">
            <div className="bg-[#252B36] rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Recent Purchases</h2>
                <div className="flex gap-2">
                  <button className="p-2 bg-[#1a1a1a] hover:bg-[#222] rounded-lg transition-colors">
                    <FaFilter className="text-gray-400" size={14} />
                  </button>
                  <Link 
                    href="/purchases"
                    className="px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm transition-colors"
                  >
                    View All
                  </Link>
                </div>
              </div>
              
              {purchases.length === 0 ? (
                <div className="text-center py-12">
                  <FaMusic className="mx-auto text-gray-500 text-4xl mb-4" />
                  <h3 className="text-gray-400 text-lg mb-2">No purchases yet</h3>
                  <p className="text-gray-500 mb-4">Start building your music library</p>
                  <Link 
                    href="/market_place"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                  >
                    Browse Tracks
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentPurchases.map((purchase) => (
                    <PurchaseRow key={purchase?.public_id} purchase={purchase} />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - ONLY REAL DATA */}
          <div className="space-y-6">
            {/* License Distribution */}
            <div className="bg-[#252B36] rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">License Types</h3>
              <div className="space-y-3">
                {Object.entries(licenseStats).map(([license, count]) => (
                  <div key={license} className="flex items-center justify-between">
                    <span className="text-gray-300">{license}</span>
                    <span className="text-blue-400 font-medium">{count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Artists */}
            {topArtists.length > 0 && (
              <div className="bg-[#252B36] rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Top Artists</h3>
                <div className="space-y-3">
                  {topArtists.map(([artist, count]) => (
                    <div key={artist} className="bg-[#1a1a1a] rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-white font-medium">{artist}</span>
                        <span className="text-blue-400 text-sm">{count} track{count > 1 ? 's' : ''}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Activity */}
            {purchases.length > 0 && (
              <div className="bg-[#252B36] rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {purchases
                    .slice()
                    .sort((a, b) => new Date(b.purchased_at).getTime() - new Date(a.purchased_at).getTime())
                    .slice(0, 3)
                    .map((purchase) => (
                      <div key={purchase.public_id} className="flex items-center gap-3 p-3 bg-[#1a1a1a] rounded-lg">
                        <FaMusic className="text-blue-400" />
                        <div className="flex-1">
                          <p className="text-white text-sm font-medium truncate">{purchase.track_title}</p>
                          <p className="text-gray-400 text-xs">{new Date(purchase.purchased_at).toLocaleDateString()}</p>
                        </div>
                        <span className="text-green-400 text-sm">${parseFloat(purchase.price_paid.toString()).toFixed(2)}</span>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="bg-[#252B36] rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link 
                  href="/marketplace"
                  className="w-full flex items-center gap-3 p-3 bg-[#1a1a1a] hover:bg-[#222] rounded-lg transition-colors"
                >
                  <FaMusic className="text-blue-400" />
                  <span className="text-white">Browse More Tracks</span>
                </Link>
                <button 
                  onClick={handleDownloadAllTracks}
                  disabled={isProcessing || purchases.length === 0}
                  className="w-full flex items-center gap-3 p-3 bg-[#1a1a1a] hover:bg-[#222] rounded-lg transition-colors text-left disabled:opacity-50"
                >
                  <FaFileDownload className="text-green-400" />
                  <span className="text-white">Download All Purchases</span>
                </button>
                <button 
                  onClick={handleDownloadAllCertificates}
                  disabled={isProcessing || purchases.length === 0}
                  className="w-full flex items-center gap-3 p-3 bg-[#1a1a1a] hover:bg-[#222] rounded-lg transition-colors text-left disabled:opacity-50"
                >
                  <FaCertificate className="text-purple-400" />
                  <span className="text-white">Download All Certificates</span>
                </button>
                <button 
                  onClick={() => setShowHistoryModal(true)}
                  className="w-full flex items-center gap-3 p-3 bg-[#1a1a1a] hover:bg-[#222] rounded-lg transition-colors text-left"
                >
                  <FaEye className="text-purple-400" />
                  <span className="text-white">View Purchase History</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Purchase History Modal */}
      <PurchaseHistoryModal
        isOpen={showHistoryModal}
        onClose={() => setShowHistoryModal(false)}
        purchases={purchases}
        onDownloadTrack={handleDownload}
        onDownloadCertificate={handleCertificateDownload}
      />
    </div>
  );
};

export default EntireBuyerStuff;