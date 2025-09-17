import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserProfile {
  id: string;
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  username: string;
  role: 'artist' | 'buyer';
  bio?: string;
  profile_image?: string;
  cover_image?: string;
  spotify_link?: string;
  soundcloud_link?: string;
  instagram_link?: string;
  is_verified: boolean;
  phone_number?: string;
  created_at: string;
  updated: string;
}

export interface UserProfileState {
  profile: UserProfile | null;
  isLoading: boolean;
  isUpdating: boolean;
  isUploadingImage: boolean;
  error: string | null;
  uploadProgress: number;
}

const initialState: UserProfileState = {
  profile: null,
  isLoading: false,
  isUpdating: false,
  isUploadingImage: false,
  error: null,
  uploadProgress: 0,
};

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    // Fetch user profile
    fetchUserProfileStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchUserProfileSuccess: (state, action: PayloadAction<UserProfile>) => {
      state.isLoading = false;
      state.profile = action.payload;
      state.error = null;
    },
    fetchUserProfileFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // Update user profile
    updateUserProfileStart: (state) => {
      state.isUpdating = true;
      state.error = null;
    },
    updateUserProfileSuccess: (state, action: PayloadAction<UserProfile>) => {
      state.isUpdating = false;
      state.profile = action.payload;
      state.error = null;
    },
    updateUserProfileFailure: (state, action: PayloadAction<string>) => {
      state.isUpdating = false;
      state.error = action.payload;
    },

    // Image upload
    uploadImageStart: (state) => {
      state.isUploadingImage = true;
      state.uploadProgress = 0;
      state.error = null;
    },
    uploadImageProgress: (state, action: PayloadAction<number>) => {
      state.uploadProgress = action.payload;
    },
    uploadImageSuccess: (state, action: PayloadAction<{ type: 'profile' | 'cover'; url: string }>) => {
      state.isUploadingImage = false;
      state.uploadProgress = 100;
      if (state.profile) {
        if (action.payload.type === 'profile') {
          state.profile.profile_image = action.payload.url;
        } else {
          state.profile.cover_image = action.payload.url;
        }
      }
    },
    uploadImageFailure: (state, action: PayloadAction<string>) => {
      state.isUploadingImage = false;
      state.uploadProgress = 0;
      state.error = action.payload;
    },

    // Clear error
    clearError: (state) => {
      state.error = null;
    },

    // Reset upload progress
    resetUploadProgress: (state) => {
      state.uploadProgress = 0;
    },
  },
});

export const {
  fetchUserProfileStart,
  fetchUserProfileSuccess,
  fetchUserProfileFailure,
  updateUserProfileStart,
  updateUserProfileSuccess,
  updateUserProfileFailure,
  uploadImageStart,
  uploadImageProgress,
  uploadImageSuccess,
  uploadImageFailure,
  clearError,
  resetUploadProgress,
} = userProfileSlice.actions;

export default userProfileSlice.reducer;