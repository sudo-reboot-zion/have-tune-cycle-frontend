import { Purchase } from '@/types/payment.dt';
import React, { useState, useEffect } from 'react';
import { 
  FaTimes, 
  FaDownload, 
  FaCertificate, 
  FaMusic, 
  FaSearch,
  FaCalendarAlt
} from 'react-icons/fa';


interface PurchaseHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  purchases: Purchase[];
  onDownloadTrack: (purchaseId: string) => void;
  onDownloadCertificate: (purchaseId: string) => void;
}

const PurchaseHistoryModal: React.FC<PurchaseHistoryModalProps> = ({
  isOpen,
  onClose,
  purchases,
  onDownloadTrack,
  onDownloadCertificate
}) => {
  const [filteredPurchases, setFilteredPurchases] = useState(purchases);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [filterBy, setFilterBy] = useState('all');
  const [isDownloadingAll, setIsDownloadingAll] = useState(false);

  useEffect(() => {
    let filtered = [...purchases];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(purchase => 
        purchase.track_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        purchase.track_artist.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // License type filter
    if (filterBy !== 'all') {
      filtered = filtered.filter(purchase => 
        purchase.license_name?.toLowerCase() === filterBy.toLowerCase()
      );
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.purchased_at).getTime() - new Date(a.purchased_at).getTime();
        case 'price':
          return parseFloat(b.price_paid.toString()) - parseFloat(a.price_paid.toString());
        case 'title':
          return a.track_title.localeCompare(b.track_title);
        case 'artist':
          return a.track_artist.localeCompare(b.track_artist);
        default:
          return 0;
      }
    });

    setFilteredPurchases(filtered);
  }, [purchases, searchTerm, sortBy, filterBy]);

  const handleDownloadAll = async () => {
    setIsDownloadingAll(true);
    try {
      // Download all tracks with delay to prevent overwhelming the server
      for (const purchase of filteredPurchases) {
        await onDownloadTrack(purchase.public_id);
        // Small delay between downloads
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    } catch (error) {
      console.error('Error downloading all tracks:', error);
    } finally {
      setIsDownloadingAll(false);
    }
  };

  const handleDownloadAllCertificates = async () => {
    setIsDownloadingAll(true);
    try {
      for (const purchase of filteredPurchases) {
        await onDownloadCertificate(purchase.public_id);
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    } catch (error) {
      console.error('Error downloading all certificates:', error);
    } finally {
      setIsDownloadingAll(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#252B36] rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div>
            <h2 className="text-2xl font-bold text-white">Purchase History</h2>
            <p className="text-gray-400 mt-1">{purchases.length} total purchases</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <FaTimes className="text-gray-400" size={20} />
          </button>
        </div>

        {/* Filters and Actions */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search and Filters */}
            <div className="flex flex-1 gap-4 items-center">
              <div className="relative flex-1 max-w-md">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
                <input
                  type="text"
                  placeholder="Search tracks or artists..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-[#1a1a1a] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                />
              </div>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 bg-[#1a1a1a] border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              >
                <option value="date">Sort by Date</option>
                <option value="price">Sort by Price</option>
                <option value="title">Sort by Title</option>
                <option value="artist">Sort by Artist</option>
              </select>

              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="px-3 py-2 bg-[#1a1a1a] border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              >
                <option value="all">All Licenses</option>
                <option value="basic">Basic</option>
                <option value="standard">Standard</option>
                <option value="premium">Premium</option>
                <option value="exclusive">Exclusive</option>
              </select>
            </div>

            {/* Bulk Actions */}
            <div className="flex gap-2">
              <button
                onClick={handleDownloadAll}
                disabled={isDownloadingAll || filteredPurchases.length === 0}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                <FaDownload size={14} />
                {isDownloadingAll ? 'Downloading...' : 'Download All Tracks'}
              </button>
              <button
                onClick={handleDownloadAllCertificates}
                disabled={isDownloadingAll || filteredPurchases.length === 0}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                <FaCertificate size={14} />
                All Certificates
              </button>
            </div>
          </div>
        </div>

        {/* Purchase List */}
        <div className="flex-1 overflow-y-auto p-6 max-h-[60vh]">
          {filteredPurchases.length === 0 ? (
            <div className="text-center py-12">
              <FaMusic className="mx-auto text-gray-500 text-4xl mb-4" />
              <h3 className="text-gray-400 text-lg mb-2">No purchases found</h3>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredPurchases.map((purchase) => (
                <div key={purchase.public_id} className="bg-[#1a1a1a] rounded-lg p-4 hover:bg-[#222] transition-colors">
                  <div className="flex items-center gap-4">
                    {/* Track Info */}
                    <div className="w-12 h-12 bg-[#252B36] rounded-lg flex items-center justify-center">
                      <FaMusic className="text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-medium">{purchase.track_title}</h4>
                      <p className="text-gray-400 text-sm">by {purchase.track_artist}</p>
                      <div className="flex items-center gap-4 mt-1">
                        <p className="text-gray-500 text-xs flex items-center gap-1">
                          <FaCalendarAlt size={10} />
                          {new Date(purchase.purchased_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </p>
                        <span className="text-xs bg-blue-600 px-2 py-1 rounded">{purchase.license_name}</span>
                      </div>
                    </div>
                    
                    {/* Price */}
                    <div className="text-right">
                      <p className="text-white font-medium">${parseFloat(purchase.price_paid.toString()).toFixed(2)}</p>
                      <p className="text-gray-400 text-sm">
                        Downloads: {purchase.download_count || 0}/{purchase.max_downloads || '∞'}
                      </p>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => onDownloadTrack(purchase.public_id)}
                        disabled={isDownloadingAll}
                        className="p-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg transition-colors"
                        title="Download Track"
                      >
                        <FaDownload size={14} />
                      </button>
                      <button
                        onClick={() => onDownloadCertificate(purchase.public_id)}
                        disabled={isDownloadingAll}
                        className="p-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white rounded-lg transition-colors"
                        title="Download Certificate"
                      >
                        <FaCertificate size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-700 bg-[#1a1a1a]">
          <div className="flex items-center justify-between">
            <div className="text-gray-400 text-sm">
              Showing {filteredPurchases.length} of {purchases.length} purchases
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseHistoryModal;