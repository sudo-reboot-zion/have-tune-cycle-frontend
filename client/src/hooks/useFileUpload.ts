import { FileUploadState, FileValidationOptions } from '@/types/tracks.dt';
import { useState, useCallback } from 'react';



const DEFAULT_AUDIO_OPTIONS: FileValidationOptions = {
  maxSize: 50, // 50MB
  allowedTypes: ['audio/mp3', 'audio/wav', 'audio/flac', 'audio/m4a', 'audio/mpeg']
};

const DEFAULT_IMAGE_OPTIONS: FileValidationOptions = {
  maxSize: 10, // 10MB
  allowedTypes: ['image/jpeg', 'image/png', 'image/jpg', 'image/webp']
};

export const useFileUpload = () => {
  const [files, setFiles] = useState<FileUploadState>({
    audioFile: null,
    coverImage: null,
    audioPreview: '',
    imagePreview: ''
  });

  const [errors, setErrors] = useState<{
    audioError: string | null;
    imageError: string | null;
  }>({
    audioError: null,
    imageError: null
  });

  const validateFile = useCallback((
    file: File, 
    options: FileValidationOptions
  ): string | null => {
    // Check file type
    if (options.allowedTypes && !options.allowedTypes.includes(file.type)) {
      return `File type ${file.type} is not allowed`;
    }

    // Check file size
    if (options.maxSize && file.size > options.maxSize * 1024 * 1024) {
      return `File size must be less than ${options.maxSize}MB`;
    }

    return null;
  }, []);

  const handleAudioUpload = useCallback((file: File) => {
    const error = validateFile(file, DEFAULT_AUDIO_OPTIONS);
    
    if (error) {
      setErrors(prev => ({ ...prev, audioError: error }));
      return false;
    }

    // Clear previous preview
    if (files.audioPreview) {
      URL.revokeObjectURL(files.audioPreview);
    }

    const previewUrl = URL.createObjectURL(file);
    
    setFiles(prev => ({
      ...prev,
      audioFile: file,
      audioPreview: previewUrl
    }));

    setErrors(prev => ({ ...prev, audioError: null }));
    return true;
  }, [files.audioPreview, validateFile]);

  const handleImageUpload = useCallback((file: File) => {
    const error = validateFile(file, DEFAULT_IMAGE_OPTIONS);
    
    if (error) {
      setErrors(prev => ({ ...prev, imageError: error }));
      return false;
    }

    // Clear previous preview
    if (files.imagePreview) {
      URL.revokeObjectURL(files.imagePreview);
    }

    const previewUrl = URL.createObjectURL(file);
    
    setFiles(prev => ({
      ...prev,
      coverImage: file,
      imagePreview: previewUrl
    }));

    setErrors(prev => ({ ...prev, imageError: null }));
    return true;
  }, [files.imagePreview, validateFile]);

  const clearFiles = useCallback(() => {
    // Clean up object URLs
    if (files.audioPreview) {
      URL.revokeObjectURL(files.audioPreview);
    }
    if (files.imagePreview) {
      URL.revokeObjectURL(files.imagePreview);
    }

    setFiles({
      audioFile: null,
      coverImage: null,
      audioPreview: '',
      imagePreview: ''
    });

    setErrors({
      audioError: null,
      imageError: null
    });
  }, [files.audioPreview, files.imagePreview]);

  const removeAudioFile = useCallback(() => {
    if (files.audioPreview) {
      URL.revokeObjectURL(files.audioPreview);
    }
    
    setFiles(prev => ({
      ...prev,
      audioFile: null,
      audioPreview: ''
    }));
    
    setErrors(prev => ({ ...prev, audioError: null }));
  }, [files.audioPreview]);

  const removeCoverImage = useCallback(() => {
    if (files.imagePreview) {
      URL.revokeObjectURL(files.imagePreview);
    }
    
    setFiles(prev => ({
      ...prev,
      coverImage: null,
      imagePreview: ''
    }));
    
    setErrors(prev => ({ ...prev, imageError: null }));
  }, [files.imagePreview]);

  return {
    // File state
    audioFile: files.audioFile,
    coverImage: files.coverImage,
    audioPreview: files.audioPreview,
    imagePreview: files.imagePreview,
    
    // Errors
    audioError: errors.audioError,
    imageError: errors.imageError,
    
    // Actions
    handleAudioUpload,
    handleImageUpload,
    clearFiles,
    removeAudioFile,
    removeCoverImage,
  };
};