// types/tracks.dt.ts

export interface FileUploadState {
  audioFile: File | null;
  coverImage: File | null;
  audioPreview: string;
  imagePreview: string;
}

export interface FileValidationOptions {
  maxSize?: number; // in MB
  allowedTypes?: string[];
}

export interface AudioPlayerState {
  isPlaying: boolean;
  isLoading: boolean;
  duration: number;
  currentTime: number;
  volume: number;
  error: string | null;
}

export interface BaseTrackData {
  title: string;
  description?: string;
  genre: number;
  mood: number;
  tags?: string;
  bpm?: number;
  key?: string;
}

export interface FormData extends Omit<BaseTrackData, "genre" | "mood" | "bpm" | "base_price"> {
  base_price: string;
  genre: number | "";
  mood: number | "";
  bpm: string;
  tags: string;
  audio_file: File | null;
  cover_image: File | null;
}

export interface UploadTrackData extends BaseTrackData {
  base_price: number;
  audio_file: File;
  cover_image?: File;
}

// API params for filtering tracks
export interface GetTracksParams {
  search?: string;
  genre?: string; // Changed to string for slug
  mood?: string;  // Changed to string for slug
  is_featured?: boolean;
  ordering?: string;
  page?: number;
  limit?: number;
}

// Filters interface for Redux state
export interface TrackFilters {
  search?: string;
  genre?: string;
  mood?: string;
  is_featured?: boolean;
  ordering?: string;
}

export interface Genre {
  id: number;
  name: string;
  slug: string;
  description: string;
}

export interface Mood {
  id: number;
  name: string;
  slug: string;
  description: string;
}

// Complete track interface matching your backend serializer
export interface Track {
  public_id: string;
  title: string;
  artist_name: string;
  artist_full_name: string;
  genre_name: string;
  mood_name: string;
  base_price: number;
  duration_formatted: string;
  cover_image: string | null;
  preview_file: string | null;
  tag_list: string[];
  play_count: number;
  is_featured: boolean;
  uploaded_at: string;
  // Additional fields that might be in detailed view
  status?: string;
  purchase_count: number;
  description?: string;
  artist_bio?: string;
  duration?: number;
  bitrate?: number;
  sample_rate?: number;
  bpm?: number;
  key?: string;
  tags?: string;
  is_exclusive?: boolean;
}

// Updated TracksState interface
export interface TracksState {
  // Upload state
  isUploading: boolean;
  uploadError: string | null;
  uploadSuccess: boolean;
  
  // Data
  genres: Genre[];
  moods: Mood[];
  myTracks: Track[];
  tracks: Track[]; // Added for marketplace tracks
  
  // Loading states
  genresLoading: boolean;
  moodsLoading: boolean;
  myTracksLoading: boolean;
  tracksLoading: boolean; // Added for marketplace tracks
  
  // Errors
  genresError: string | null;
  moodsError: string | null;
  myTracksError: string | null;
  tracksError: string | null; // Added for marketplace tracks
  
  // Filters
  currentFilters: TrackFilters; // Added for current filter state
}

export interface MarketplaceFiltersProps {
  searchQuery: string;
  selectedGenre: string;
  selectedMood: string;
  priceFilter: {
    min: number;
    max: number;
  };
  sortBy: string;
}

export interface GenresSectionProps {
  genres: Genre[];
  onGenreClick: (genre: Genre) => void;
  selectedGenre?: Genre | null;
  loading?: boolean;
}

export interface TracksSectionProps {
  tracks: Track[];
  loading?: boolean;
  onTrackPlay: (track: Track) => void;
  onTrackPurchase: (track: Track) => void;
  onTrackLike?: (track: Track) => void;
}
