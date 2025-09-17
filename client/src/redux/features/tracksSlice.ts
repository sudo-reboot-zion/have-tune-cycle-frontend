// store/slices/tracksSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { tracksApi } from '@/app/api/tracksApi';
import { TracksState, Genre, Mood, Track, UploadTrackData } from '@/types/tracks.dt';
import { AxiosError } from 'axios';

interface TrackFilters {
  search?: string;
  genre?: string;
  mood?: string;
  is_featured?: boolean;
  ordering?: string;
}

// Define a more specific type for upload response
interface UploadTrackResponse {
  message?: string;
  track?: Track;
  [key: string]: unknown;
}

const initialState: TracksState = {
  isUploading: false,
  uploadError: null,
  uploadSuccess: false,
  genres: [],
  moods: [],
  myTracks: [],
  // New tracks list state
  tracks: [],
  tracksLoading: false,
  tracksError: null,
  currentFilters: {},
  // Existing state
  genresLoading: false,
  moodsLoading: false,
  myTracksLoading: false,
  genresError: null,
  moodsError: null,
  myTracksError: null,
};

// Helper function to extract error message
const extractErrorMessage = (error: unknown, fallbackMessage: string): string => {
  const axiosError = error as AxiosError<{ error?: string; message?: string }>;
  return axiosError?.response?.data?.error || 
         axiosError?.response?.data?.message || 
         fallbackMessage;
};

// Existing async thunks...
export const uploadTrack = createAsyncThunk<
  UploadTrackResponse,
  UploadTrackData,
  { rejectValue: string }
>(
  'tracks/upload',
  async (trackData, { rejectWithValue }) => {
    try {
      const response = await tracksApi.uploadTrack(trackData);
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(extractErrorMessage(error, 'Upload failed'));
    }
  }
);

export const fetchGenres = createAsyncThunk<
  Genre[],
  void,
  { rejectValue: string }
>(
  'tracks/fetchGenres',
  async (_, { rejectWithValue }) => {
    try {
      const response = await tracksApi.getGenres();
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(extractErrorMessage(error, 'Failed to fetch genres'));
    }
  }
);

export const fetchMoods = createAsyncThunk<
  Mood[],
  void,
  { rejectValue: string }
>(
  'tracks/fetchMoods',
  async (_, { rejectWithValue }) => {
    try {
      const response = await tracksApi.getMoods();
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(extractErrorMessage(error, 'Failed to fetch moods'));
    }
  }
);

export const fetchMyTracks = createAsyncThunk<
  Track[],
  void,
  { rejectValue: string }
>(
  'tracks/fetchMyTracks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await tracksApi.getMyTracks();
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(extractErrorMessage(error, 'Failed to fetch tracks'));
    }
  }
);

// New async thunk for fetching tracks with filters
export const fetchTracks = createAsyncThunk<
  Track[],
  TrackFilters,
  { rejectValue: string }
>(
  'tracks/fetchTracks',
  async (filters, { rejectWithValue }) => {
    try {
      const response = await tracksApi.getTracks(filters);
      return response.data.results || response.data;
    } catch (error: unknown) {
      return rejectWithValue(extractErrorMessage(error, 'Failed to fetch tracks'));
    }
  }
);

const tracksSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {
    clearUploadState: (state) => {
      state.isUploading = false;
      state.uploadError = null;
      state.uploadSuccess = false;
    },
    clearErrors: (state) => {
      state.uploadError = null;
      state.genresError = null;
      state.moodsError = null;
      state.myTracksError = null;
      state.tracksError = null;
    },
    updateFilters: (state, action) => {
      state.currentFilters = { ...state.currentFilters, ...action.payload };
    },
    clearFilters: (state) => {
      state.currentFilters = {};
    },
  },
  extraReducers: (builder) => {
    // Upload track
    builder
      .addCase(uploadTrack.pending, (state) => {
        state.isUploading = true;
        state.uploadError = null;
        state.uploadSuccess = false;
      })
      .addCase(uploadTrack.fulfilled, (state) => {
        state.isUploading = false;
        state.uploadSuccess = true;
        state.uploadError = null;
      })
      .addCase(uploadTrack.rejected, (state, action) => {
        state.isUploading = false;
        state.uploadError = action.payload || 'Upload failed';
        state.uploadSuccess = false;
      });

    // Fetch genres
    builder
      .addCase(fetchGenres.pending, (state) => {
        state.genresLoading = true;
        state.genresError = null;
      })
      .addCase(fetchGenres.fulfilled, (state, action) => {
        state.genresLoading = false;
        state.genres = action.payload;
        state.genresError = null;
      })
      .addCase(fetchGenres.rejected, (state, action) => {
        state.genresLoading = false;
        state.genresError = action.payload || 'Failed to fetch genres';
      });

    // Fetch moods
    builder
      .addCase(fetchMoods.pending, (state) => {
        state.moodsLoading = true;
        state.moodsError = null;
      })
      .addCase(fetchMoods.fulfilled, (state, action) => {
        state.moodsLoading = false;
        state.moods = action.payload;
        state.moodsError = null;
      })
      .addCase(fetchMoods.rejected, (state, action) => {
        state.moodsLoading = false;
        state.moodsError = action.payload || 'Failed to fetch moods';
      });

    // Fetch my tracks
    builder
      .addCase(fetchMyTracks.pending, (state) => {
        state.myTracksLoading = true;
        state.myTracksError = null;
      })
      .addCase(fetchMyTracks.fulfilled, (state, action) => {
        state.myTracksLoading = false;
        state.myTracks = action.payload;
        state.myTracksError = null;
      })
      .addCase(fetchMyTracks.rejected, (state, action) => {
        state.myTracksLoading = false;
        state.myTracksError = action.payload || 'Failed to fetch tracks';
      });

    // Fetch tracks (new)
    builder
      .addCase(fetchTracks.pending, (state) => {
        state.tracksLoading = true;
        state.tracksError = null; // Fixed: was setting myTracksError instead of tracksError
      })
      .addCase(fetchTracks.fulfilled, (state, action) => {
        state.tracksLoading = false;
        state.tracks = action.payload;
        state.tracksError = null;
      })
      .addCase(fetchTracks.rejected, (state, action) => {
        state.tracksLoading = false;
        state.tracksError = action.payload || 'Failed to fetch tracks';
      });
  },
});

export const { clearUploadState, clearErrors, updateFilters, clearFilters } = tracksSlice.actions;
export default tracksSlice.reducer;