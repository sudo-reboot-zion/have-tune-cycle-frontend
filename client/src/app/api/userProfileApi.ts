import { UserProfile } from '@/redux/features/userProfileSlice';
import apiClient from './apiConfig';


export const userProfileApi = {
  // Fetch user profile by ID
  fetchUserProfile: async (userId: string) => {
    return apiClient.get(`user/${userId}/`);
  },

  // Get current authenticated user profile
  getCurrentUserProfile: async () => {
    return apiClient.get('auth/me/');
  },

  // Update user profile
  updateUserProfile: async (userId: string, profileData: Partial<UserProfile>) => {
    // Remove readonly fields
    const {  ...updateData } = profileData;
    return apiClient.patch(`user/${userId}/`, updateData);
  },

  // Upload image with progress tracking
  uploadImage: async (
    userId: string,
    file: File,
    type: 'profile_image' | 'cover_image',
    onProgress?: (progress: number) => void
  ) => {
    const formData = new FormData();
    formData.append(type, file);

    return apiClient.patch(`user/${userId}/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total && onProgress) {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(progress);
        }
      },
    });
  },

  // Upload multiple images at once
  uploadMultipleImages: async (
    userId: string,
    files: { profile?: File; cover?: File },
    onProgress?: (progress: number) => void
  ) => {
    const formData = new FormData();
    
    if (files.profile) {
      formData.append('profile_image', files.profile);
    }
    if (files.cover) {
      formData.append('cover_image', files.cover);
    }

    return apiClient.patch(`user/${userId}/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total && onProgress) {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(progress);
        }
      },
    });
  },

  // Utility functions (these don't need API calls)
  validateImageFile: (file: File): { valid: boolean; error?: string } => {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

    if (!allowedTypes.includes(file.type)) {
      return {
        valid: false,
        error: 'Invalid file type. Please upload JPEG, PNG, or WebP images.',
      };
    }

    if (file.size > maxSize) {
      return {
        valid: false,
        error: 'File size too large. Please upload images smaller than 10MB.',
      };
    }

    return { valid: true };
  },

  // Image compression utility
  compressImage: async (file: File, maxWidth: number = 1200, quality: number = 0.8): Promise<File> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      const img = new Image();

      img.onload = () => {
        const { width, height } = img;
        const ratio = Math.min(maxWidth / width, maxWidth / height);
        
        canvas.width = width * ratio;
        canvas.height = height * ratio;

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(
          (blob) => {
            const compressedFile = new File([blob!], file.name, {
              type: file.type,
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          },
          file.type,
          quality
        );
      };

      img.src = URL.createObjectURL(file);
    });
  },

  // Get full image URL helper
  getImageUrl: (imagePath?: string | null): string | null => {
    if (!imagePath) return null;
    
    // If it's already a full URL, return as is
    if (imagePath.startsWith('http')) return imagePath;
    
    // If it's a relative path, construct full URL
    const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:8000';
    return `${baseUrl}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
  },
};