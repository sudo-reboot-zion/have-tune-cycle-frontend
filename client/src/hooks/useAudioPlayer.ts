// hooks/useAudioPlayer.ts
import { useState, useCallback, useRef, useEffect } from 'react';
import { tracksApi } from '@/app/api/tracksApi';
import { AudioPlayerState } from '@/types/tracks.dt';



export const useAudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [currentTrackId, setCurrentTrackId] = useState<string | null>(null);
  
  const [state, setState] = useState<AudioPlayerState>({
    isPlaying: false,
    isLoading: false,
    duration: 0,
    currentTime: 0,
    volume: 1,
    error: null,
  });

  // Load track preview
  const loadTrack = useCallback(async (trackId: string) => {
    if (currentTrackId === trackId && audioUrl) {
      return; // Track already loaded
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // Clean up previous audio URL
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }

      const blobUrl = await tracksApi.streamPreview(trackId);
      setAudioUrl(blobUrl);
      setCurrentTrackId(trackId);
      
      setState(prev => ({ ...prev, isLoading: false }));

    } 

 catch (error) {
  let errorMessage = 'Failed to load audio';
  
  if (error instanceof Error) {
    errorMessage = error.message;
  } else if (error && typeof error === 'object' && 'response' in error) {
    const responseError = error as { response?: { data?: { error?: string } } };
    errorMessage = responseError.response?.data?.error || 'Failed to load audio';
  }
  
  setState(prev => ({ 
    ...prev, 
    isLoading: false, 
    error: errorMessage
  }));
}


  },    [currentTrackId, audioUrl]);

  // Play/pause toggle
  const togglePlayPause = useCallback(() => {
    if (!audioRef.current || !audioUrl) return;
    
    if (state.isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  }, [state.isPlaying, audioUrl]);

  // Seek to specific time
  const seekTo = useCallback((time: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = time;
  }, []);

  // Set volume
  const setVolume = useCallback((volume: number) => {
    if (!audioRef.current) return;
    const clampedVolume = Math.max(0, Math.min(1, volume));
    audioRef.current.volume = clampedVolume;
    setState(prev => ({ ...prev, volume: clampedVolume }));
  }, []);

  // Stop playback and cleanup
  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, []);

  // Clean up on unmount or track change
  const cleanup = useCallback(() => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setAudioUrl(null);
    setCurrentTrackId(null);
    setState({
      isPlaying: false,
      isLoading: false,
      duration: 0,
      currentTime: 0,
      volume: 1,
      error: null,
    });
  }, [audioUrl]);

  // Audio event handlers
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !audioUrl) return;

    const handleLoadedMetadata = () => {
      setState(prev => ({ ...prev, duration: audio.duration }));
    };

    const handleTimeUpdate = () => {
      setState(prev => ({ ...prev, currentTime: audio.currentTime }));
    };

    const handlePlay = () => {
      setState(prev => ({ ...prev, isPlaying: true }));
    };

    const handlePause = () => {
      setState(prev => ({ ...prev, isPlaying: false }));
    };

    const handleError = () => {
      setState(prev => ({ 
        ...prev, 
        error: 'Error playing audio',
        isLoading: false,
        isPlaying: false
      }));
    };

    const handleEnded = () => {
      setState(prev => ({ ...prev, isPlaying: false, currentTime: 0 }));
    };

    // Set audio source
    audio.src = audioUrl;
    
    // Add event listeners
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('error', handleError);
    audio.addEventListener('ended', handleEnded);

    return () => {
      // Cleanup event listeners
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [audioUrl]);

  // Cleanup on unmount
  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  return {
    // State
    isPlaying: state.isPlaying,
    isLoading: state.isLoading,
    duration: state.duration,
    currentTime: state.currentTime,
    volume: state.volume,
    error: state.error,
    currentTrackId,
    
    // Actions
    loadTrack,
    togglePlayPause,
    seekTo,
    setVolume,
    stop,
    cleanup,
    
    // Audio element ref (for custom controls)
    audioRef,
  };
};