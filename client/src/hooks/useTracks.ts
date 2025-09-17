import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect } from 'react';

import { 
  uploadTrack, 
  fetchGenres, 
  fetchMoods, 
  fetchMyTracks,
  fetchTracks,
  clearUploadState,
  clearErrors,
  updateFilters,
  clearFilters
} from '../redux/features/tracksSlice';
import { UploadTrackData } from '@/types/tracks.dt';
import { AppDispatch, RootState } from '@/redux/store';

interface TrackFilters {
  search?: string;
  genre?: string;
  mood?: string;
  is_featured?: boolean;
  ordering?: string;
}

export const useTracksUpload = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  const { isUploading, uploadError, uploadSuccess } = useSelector(
    (state: RootState) => state.tracks
  );

  const handleUpload = useCallback((trackData: UploadTrackData) => {
    dispatch(uploadTrack(trackData));
  }, [dispatch]);

  const clearUpload = useCallback(() => {
    dispatch(clearUploadState());
  }, [dispatch]);

  return {
    isUploading,
    uploadError,
    uploadSuccess,
    handleUpload,
    clearUpload
  };
};

export const useTracksMetadata = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  const { 
    genres, 
    moods, 
    genresLoading, 
    moodsLoading,
    genresError,
    moodsError 
  } = useSelector((state: RootState) => state.tracks);

  const loadGenres = useCallback(() => {
    dispatch(fetchGenres());
  }, [dispatch]);

  const loadMoods = useCallback(() => {
    dispatch(fetchMoods());
  }, [dispatch]);

  useEffect(() => {
    if (genres.length === 0 && !genresLoading) {
      loadGenres();
    }
    if (moods.length === 0 && !moodsLoading) {
      loadMoods();
    }
  }, [genres.length, moods.length, genresLoading, moodsLoading, loadGenres, loadMoods]);

  return {
    genres,
    moods,
    genresLoading,
    moodsLoading,
    genresError,
    moodsError,
    loadGenres,
    loadMoods
  };
};

export const useMyTracks = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  const { 
    myTracks, 
    myTracksLoading, 
    myTracksError 
  } = useSelector((state: RootState) => state.tracks);

  const loadMyTracks = useCallback(() => {
    dispatch(fetchMyTracks());
  }, [dispatch]);

  return {
    myTracks,
    myTracksLoading,
    myTracksError,
    loadMyTracks
  };
};

// New hook for tracks listing with filters
export const useTracksList = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  const { 
    tracks, 
    tracksLoading, 
    tracksError,
    currentFilters 
  } = useSelector((state: RootState) => state.tracks);

  const loadTracks = useCallback((filters: TrackFilters = {}) => {
    dispatch(fetchTracks(filters));
  }, [dispatch]);

  const setFilters = useCallback((filters: Partial<TrackFilters>) => {
    dispatch(updateFilters(filters));
    const updatedFilters = { ...currentFilters, ...filters };
    dispatch(fetchTracks(updatedFilters));
  }, [dispatch, currentFilters]);

  const resetFilters = useCallback(() => {
    dispatch(clearFilters());
    dispatch(fetchTracks({}));
  }, [dispatch]);

  const refreshTracks = useCallback(() => {
    dispatch(fetchTracks(currentFilters));
  }, [dispatch, currentFilters]);

  // Initial load
  useEffect(() => {
    if (tracks.length === 0 && !tracksLoading) {
      loadTracks(currentFilters);
    }
  }, [tracks.length, tracksLoading, currentFilters, loadTracks]);

  return {
    tracks,
    tracksLoading,
    tracksError,
    currentFilters,
    loadTracks,
    setFilters,
    resetFilters,
    refreshTracks
  };
};

export const useTracksErrors = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  const { 
    uploadError, 
    genresError, 
    moodsError, 
    myTracksError,
    tracksError 
  } = useSelector((state: RootState) => state.tracks);

  const clearAllErrors = useCallback(() => {
    dispatch(clearErrors());
  }, [dispatch]);

  return {
    uploadError,
    genresError,
    moodsError,
    myTracksError,
    tracksError,
    clearAllErrors
  };
};