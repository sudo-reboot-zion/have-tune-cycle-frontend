import {GenresSectionProps } from '@/types/tracks.dt';
import React from 'react';
import { 
  LuMusic, 
  LuZap, 
  LuGuitar, 
  LuHeart, 
  LuPiano, 
  LuMic, 
  LuTreePine, 
  LuCrown,
  LuWaves, 
  LuMountain, 
  LuDrum, 
  LuSparkles, 
  LuRadio, 
  LuGlobe, 
  LuSun
} from 'react-icons/lu';




// Map genre slugs to their corresponding icons
const genreIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'hip-hop': LuMic,
  'electronic': LuZap,
  'rock': LuGuitar,
  'pop': LuHeart,
  'jazz': LuPiano,
  'rb': LuSparkles,
  'folk': LuTreePine,
  'classical': LuCrown,
  'reggae': LuWaves,
  'country': LuMountain,
  'blues': LuDrum,
  'funk': LuRadio,
  'ambient': LuSun,
  'latin': LuGlobe,
  'world': LuMusic,
};

const GenresSection: React.FC<GenresSectionProps> = ({
  genres,
  onGenreClick,
  selectedGenre,
  loading = false
}) => {
  if (loading) {
    return (
      <div className="py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Browse by Genre
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm animate-pulse"
            >
              <div className="w-12 h-12 bg-gray-200 rounded-full mb-3"></div>
              <div className="w-16 h-4 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <h2 className="text-2xl font-poltwaski text-white mb-6 text-center lg:text-4xl">
        Browse by Genre
      </h2>
      
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4">
        {genres.map((genre) => {
          const IconComponent = genreIcons[genre.slug] || LuMusic;
          const isSelected = selectedGenre?.id === genre.id;
          
          return (
            <button
              key={genre.id}
              onClick={() => onGenreClick(genre)}
              className={`
                flex flex-col items-center p-4 rounded-lg shadow-sm transition-all duration-200
                hover:shadow-md hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500
                ${isSelected 
                  ? 'bg-blue-50 border-2 border-blue-500 text-blue-700' 
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                }
              `}
              title={genre.description}
            >
              <div className={`
                p-3 rounded-full mb-3 transition-colors
                ${isSelected 
                  ? 'bg-blue-100' 
                  : 'bg-gray-100 group-hover:bg-gray-200'
                }
              `}>
                <IconComponent 
                  className={`w-6 h-6 ${isSelected ? 'text-blue-600' : 'text-gray-600'}`}
                />
              </div>
              
              <span className={`
                text-sm font-medium text-center leading-tight
                ${isSelected ? 'text-blue-700' : 'text-gray-700'}
              `}>
                {genre.name}
              </span>
            </button>
          );
        })}
      </div>
      
      {/* Show selected genre info */}
      {selectedGenre && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="text-center">
            <h3 className="font-semibold text-blue-900 mb-1">
              {selectedGenre.name}
            </h3>
            <p className="text-sm text-blue-700">
              {selectedGenre.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenresSection;