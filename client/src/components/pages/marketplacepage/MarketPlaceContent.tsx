'use client'

import GenresSection from '@/components/common/GenreSection';
import SearchPanel from '@/components/common/SearchPanel';
import TracksSection from '@/components/common/TracksSection';
import { useTracksList, useTracksMetadata } from '@/hooks/useTracks';
import { Track } from '@/types/tracks.dt';

import React, { useState, useEffect, useCallback } from 'react';

interface Genre {
  id: number;
  name: string;
  slug: string;
  description: string;
}

function MarketPlaceContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
  const [debouncedSearch, setDebouncedSearch] = useState('');
  
  const { genres, genresLoading } = useTracksMetadata();
  const { 
    tracks, 
    tracksLoading, 
    tracksError,
    currentFilters,
    setFilters,
    resetFilters 
  } = useTracksList();

  // Debounce search input - wait 500ms after user stops typing
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Apply search filter when debounced search changes
  useEffect(() => {
    if (debouncedSearch !== (currentFilters.search || '')) {
      setFilters({ 
        search: debouncedSearch || undefined 
      });
    }
  }, [debouncedSearch, currentFilters.search, setFilters]);

  const handleSearch = useCallback((searchTerm: string) => {
    setSearchQuery(searchTerm);
    // Note: The actual API call will be triggered by the useEffect above after debouncing
  }, []);

  const handleGenreClick = useCallback((genre: Genre) => {
    const newSelectedGenre = selectedGenre?.id === genre.id ? null : genre;
    setSelectedGenre(newSelectedGenre);
    
    // Apply genre filter immediately (no debouncing needed for clicks)
    setFilters({ 
      genre: newSelectedGenre?.slug || undefined 
    });
  }, [selectedGenre, setFilters]);

  const handleClearFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedGenre(null);
    setDebouncedSearch('');
    resetFilters();
  }, [resetFilters]);

  const handleTrackPlay = useCallback((track: Track) => {
    console.log('Playing track:', track.title);
    // Implement audio playback logic here
    // You can use the track.preview_file URL for streaming
  }, []);

  const handleTrackPurchase = useCallback((track: Track) => {
    console.log('Purchase track:', track.title);
    // Implement purchase flow here
    // Navigate to purchase page or open purchase modal
  }, []);

  const handleTrackLike = useCallback((track: Track) => {
    console.log('Liked track:', track.title);
    // Implement like/favorite functionality
  }, []);

  // Calculate total active filters for display
  const activeFiltersCount = Object.values(currentFilters).filter(Boolean).length;
  const hasActiveFilters = activeFiltersCount > 0;

  return (
    <div className="min-h-screen">
      {/* Marketplace Header Section */}
      <section className="bg-secondaryColor shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-poltwaski text-white mb-2">
              Music Marketplace
            </h1>
            <p className="text-lg font-poppins text-white">
              Discover and license high-quality music for your projects
            </p>
          </div>
          
          {/* Search Panel */}
          <SearchPanel
            onSearch={handleSearch}
            placeholder="Search tracks, artists, tags..."
            className="mb-6"
          />
          
          {/* Search Status & Filter Summary */}
          <div className="text-center space-y-2">
            {/* Current search query display */}
            {searchQuery && (
              <div className="text-sm text-white/80">
                {debouncedSearch !== searchQuery ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/60 border-t-white rounded-full animate-spin"></div>
                    Searching for: &quot;<span className="font-medium">{searchQuery}</span>&quot;
                  </span>
                ) : (
                  <span>
                    Showing results for: &quot;<span className="font-medium">{searchQuery}</span>&quot;
                  </span>
                )}
              </div>
            )}
            
            {/* Active filters summary */}
            {hasActiveFilters && (
              <div className="flex items-center justify-center gap-4 text-sm text-white/80">
                <span>
                  {activeFiltersCount} active filter{activeFiltersCount !== 1 ? 's' : ''}
                </span>
                <button
                  onClick={handleClearFilters}
                  className="text-white hover:text-white/80 underline font-medium transition-colors"
                >
                  Clear all
                </button>
              </div>
            )}
            
            {/* Loading indicator for search */}
            {tracksLoading && (
              <div className="flex items-center justify-center gap-2 text-sm text-white/80">
                <div className="w-4 h-4 border-2 border-white/60 border-t-white rounded-full animate-spin"></div>
                Loading tracks...
              </div>
            )}
            
            {/* Error display */}
            {tracksError && (
              <div className="text-sm text-red-200 bg-red-500/20 px-4 py-2 rounded-lg inline-block">
                Error: {tracksError}
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Genres Section */}
        <GenresSection
          genres={genres}
          onGenreClick={handleGenreClick}
          selectedGenre={selectedGenre}
          loading={genresLoading}
        />
        
        {/* Tracks Section */}
        <div className="mt-12">
          {/* Results summary */}
          {!tracksLoading && tracks.length > 0 && (
            <div className="mb-6 text-center text-gray-600">
              <p>
                Found <span className="font-semibold text-white font-poppins">{tracks.length}</span> track{tracks.length !== 1 ? 's' : ''}
                {selectedGenre && (
                  <span> in <span className="font-semibold text-gray-900">{selectedGenre.name}</span></span>
                )}
                {searchQuery && debouncedSearch === searchQuery && (
                  <span> matching &quot;<span className="font-semibold text-gray-900">{searchQuery}</span>&quot;</span>
                )}
              </p>
            </div>
          )}
          
          {/* No results message */}
          {!tracksLoading && tracks.length === 0 && hasActiveFilters && (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.044-5.709-2.573M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No tracks found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search terms or filters to find what you&apos;re looking for.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Clear all filters
                </button>
              </div>
            </div>
          )}
          
          {/* Tracks List */}
          <TracksSection
            tracks={tracks}
            loading={tracksLoading}
            onTrackPlay={handleTrackPlay}
            onTrackPurchase={handleTrackPurchase}
            onTrackLike={handleTrackLike}
          />
        </div>
      </section>
    </div>
  );
}

export default MarketPlaceContent;