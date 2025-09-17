// utils/genreIcons.ts
import { 
  FaMicrophone,      // Hip Hop
  FaGuitar,          // Rock
  FaMusic,           // Pop
  FaSynagogue,       // Electronic
  FaPaintRoller,           // Classical
  FaDrum,            // Jazz
  FaCompactDisc,     // R&B
  FaVolumeUp,        // Dance
  FaHeart,           // Soul
  FaBolt,            // Alternative
  FaLeaf,            // Folk
  FaHome,            // Country
  FaWater,           // Blues
  FaMountain,        // World
  FaCloud,           // Ambient
  FaFire,            // Funk
  FaGlobe,           // Latin
  FaPalette,         // Reggae
  FaWind             // Default/Other
} from 'react-icons/fa';
import { IconType } from 'react-icons';

// Genre icon mapping based on your backend data
export const getGenreIcon = (genreName: string): IconType => {
  const iconMap: Record<string, IconType> = {
    // Hip Hop variations
    'hip hop': FaMicrophone,
    'hiphop': FaMicrophone,
    'rap': FaMicrophone,
    
    // Rock
    'rock': FaGuitar,
    
    // Pop
    'pop': FaMusic,
    
    // Electronic variations
    'electronic': FaSynagogue,
    'edm': FaSynagogue,
    'techno': FaSynagogue,
    
    // Classical
    'classical': FaPaintRoller,
    
    // Jazz
    'jazz': FaDrum,
    
    // R&B variations
    'r&b': FaCompactDisc,
    'rnb': FaCompactDisc,
    
    // Folk
    'folk': FaLeaf,
    
    // Country
    'country': FaHome,
    
    // Blues
    'blues': FaWater,
    
    // World
    'world': FaMountain,
    
    // Ambient
    'ambient': FaCloud,
    
    // Funk
    'funk': FaFire,
    
    // Latin
    'latin': FaGlobe,
    
    // Reggae
    'reggae': FaPalette,
    
    // Other variations
    'dance': FaVolumeUp,
    'soul': FaHeart,
    'alternative': FaBolt,
    'indie': FaBolt
  };
  
  const key = genreName?.toLowerCase() || '';
  return iconMap[key] || FaWind; // Default icon
};

// Genre colors for consistency
export const getGenreColor = (genreName: string): string => {
  const colorMap: Record<string, string> = {
    'hip hop': 'from-orange-500 to-red-500',
    'rock': 'from-red-500 to-pink-500',
    'pop': 'from-pink-500 to-purple-500',
    'electronic': 'from-cyan-500 to-blue-500',
    'classical': 'from-indigo-500 to-purple-500',
    'jazz': 'from-yellow-500 to-orange-500',
    'r&b': 'from-purple-500 to-pink-500',
    'folk': 'from-green-500 to-teal-500',
    'country': 'from-amber-500 to-orange-500',
    'blues': 'from-blue-500 to-indigo-500',
    'world': 'from-emerald-500 to-green-500',
    'ambient': 'from-gray-500 to-slate-500',
    'funk': 'from-yellow-500 to-red-500',
    'latin': 'from-red-500 to-orange-500',
    'reggae': 'from-green-500 to-yellow-500'
  };
  
  const key = genreName?.toLowerCase() || '';
  return colorMap[key] || 'from-purple-500 to-blue-500';
};

export const getGenreStyles = (genreName: string) => {
  return {
    icon: getGenreIcon(genreName),
    color: getGenreColor(genreName)
  };
};

// Genre display name formatter
export const formatGenreName = (genreName: string): string => {
  const formatMap: Record<string, string> = {
    'hip-hop': 'Hip Hop',
    'r&b': 'R&B',
    'rb': 'R&B',
    'edm': 'EDM'
  };
  
  const key = genreName?.toLowerCase() || '';
  return formatMap[key] || genreName?.charAt(0).toUpperCase() + genreName?.slice(1).toLowerCase() || '';
};