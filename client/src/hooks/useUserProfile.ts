// hooks/useUserProfile.ts
import { useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import {
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
  UserProfile,
} from '../redux/features/userProfileSlice';
import { userProfileApi } from '../app/api/userProfileApi';
import { RootState, useAppDispatch, useAppSelector } from '@/redux/store';

import { extractErrorMessage } from '@/app/api/apiConfig';



export const useUserProfile = () => {
  const dispatch = useAppDispatch();
  const {
    profile,
    isLoading,
    isUpdating,
    isUploadingImage,
    error,
    uploadProgress,
  } = useAppSelector((state: RootState) => state.userProfile);

  // Fetch user profile
  const fetchProfile = useCallback(async (userId: string) => {
    dispatch(fetchUserProfileStart());
    try {
      const response = await userProfileApi.fetchUserProfile(userId);
      dispatch(fetchUserProfileSuccess(response.data));
    } catch (error: unknown) {
      const errorMessage = extractErrorMessage(error, 'Failed to fetch profile');
      dispatch(fetchUserProfileFailure(errorMessage));
      toast.error(errorMessage);
    }
  }, [dispatch]);

  // Fetch current user profile
  const fetchCurrentProfile = useCallback(async () => {
    dispatch(fetchUserProfileStart());
    try {
      const response = await userProfileApi.getCurrentUserProfile();
      dispatch(fetchUserProfileSuccess(response.data));
    } catch (error: unknown) {
      const errorMessage = extractErrorMessage(error, 'Failed to fetch profile');
      dispatch(fetchUserProfileFailure(errorMessage));
      toast.error(errorMessage);
    }
  }, [dispatch]);

  // Update user profile
  const updateProfile = useCallback(async (
    userId: string,
    updates: Partial<UserProfile>
  ) => {
    dispatch(updateUserProfileStart());
    try {
      const response = await userProfileApi.updateUserProfile(userId, updates);
      dispatch(updateUserProfileSuccess(response.data));
      toast.success('Profile updated successfully!');
      return response.data;
    } catch (error: unknown) {
      const errorMessage = extractErrorMessage(error, 'Failed to update profile');
      dispatch(updateUserProfileFailure(errorMessage));
      toast.error(errorMessage);
      throw error;
    }
  }, [dispatch]);

  // Upload image with progress
  const uploadImage = useCallback(async (
    userId: string,
    file: File,
    type: 'profile_image' | 'cover_image'
  ) => {
    // Validate file
    const validation = userProfileApi.validateImageFile(file);
    if (!validation.valid) {
      toast.error(validation.error!);
      return;
    }

    dispatch(uploadImageStart());
    dispatch(resetUploadProgress());

    try {
      // Compress image if it's too large
      let processedFile = file;
      if (file.size > 2 * 1024 * 1024) { // If larger than 2MB
        toast.info('Optimizing image...');
        processedFile = await userProfileApi.compressImage(file);
      }

      const response = await userProfileApi.uploadImage(
        userId,
        processedFile,
        type,
        (progress) => {
          dispatch(uploadImageProgress(progress));
        }
      );

      const imageUrl = response.data[type] || userProfileApi.getImageUrl(response.data[type]);
      dispatch(uploadImageSuccess({ type: type === 'profile_image' ? 'profile' : 'cover', url: imageUrl }));
      toast.success(`${type === 'profile_image' ? 'Profile' : 'Cover'} image updated successfully!`);
      
      return imageUrl;
    } catch (error: unknown) {
      const errorMessage = extractErrorMessage(error, 'Failed to upload image');
      dispatch(uploadImageFailure(errorMessage));
      toast.error(errorMessage);
      throw error;
    }
  }, [dispatch]);

  // Handle image file selection
  const handleImageUpload = useCallback((
    userId: string,
    type: 'profile_image' | 'cover_image'
  ) => {
    return new Promise<string | undefined>((resolve) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/jpeg,image/jpg,image/png,image/webp';
      input.multiple = false;

      input.onchange = async (event) => {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (file) {
          try {
            const imageUrl = await uploadImage(userId, file, type);
            resolve(imageUrl);
          } catch {
            // Removed unused error parameter
            resolve(undefined);
          }
        } else {
          resolve(undefined);
        }
      };

      input.click();
    });
  }, [uploadImage]);

  // Clear error
  const clearProfileError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  // Get fallback image URLs
  const getFallbackImages = useCallback(() => {
    return {
      profileImage: '/images/default-avatar.png',
      coverImage: '/images/default-cover.jpg',
    };
  }, []);

  // Get profile image URL with fallback
  const getProfileImageUrl = useCallback((imageUrl?: string | null) => {
    return userProfileApi.getImageUrl(imageUrl) || getFallbackImages().profileImage;
  }, [getFallbackImages]);

  // Get cover image URL with fallback
  const getCoverImageUrl = useCallback((imageUrl?: string | null) => {
    return userProfileApi.getImageUrl(imageUrl) || getFallbackImages().coverImage;
  }, [getFallbackImages]);

  // Auto-fetch profile on mount if user is authenticated
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token && !profile) {
      fetchCurrentProfile();
    }
  }, [fetchCurrentProfile, profile]);

  return {
    // State
    profile,
    isLoading,
    isUpdating,
    isUploadingImage,
    error,
    uploadProgress,

    // Actions
    fetchProfile,
    fetchCurrentProfile,
    updateProfile,
    uploadImage,
    handleImageUpload,
    clearProfileError,

    // Utilities
    getFallbackImages,
    getProfileImageUrl,
    getCoverImageUrl,

    // Computed values
    isProfileLoaded: !!profile,
    hasProfileImage: !!profile?.profile_image,
    hasCoverImage: !!profile?.cover_image,
  };
};