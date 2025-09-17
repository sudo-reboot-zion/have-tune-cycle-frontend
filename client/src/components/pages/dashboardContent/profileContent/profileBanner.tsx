// components/ProfileBanner.tsx
"use client";

import React, { useState } from 'react';
import Image from 'next/image';

import { useUserProfile } from '@/hooks/useUserProfile';
import { toast } from 'sonner';
import { UserProfile } from '@/redux/features/userProfileSlice';

interface ProfileBannerProps {
  profile: UserProfile | null;
  onEditToggle: () => void;
  isEditing: boolean;
}

function ProfileBanner({ profile, onEditToggle, isEditing }: ProfileBannerProps) {
  const {
    getProfileImageUrl,
    getCoverImageUrl,
    handleImageUpload,
    isUploadingImage,
    uploadProgress,
  } = useUserProfile();

  const [imageErrors, setImageErrors] = useState({
    profile: false,
    cover: false,
  });

  const handleCoverImageUpload = async () => {
    if (!profile?.id) {
      toast.error('Profile not loaded');
      return;
    }

    try {
      await handleImageUpload(profile.id, 'cover_image');
    } catch  {
      toast.error('Couldnot upload image')
    }
  };

  const handleProfileImageUpload = async () => {
    if (!profile?.id) {
      toast.error('Profile not loaded');
      return;
    }

    try {
      await handleImageUpload(profile.id, 'profile_image');
    } catch  {
      // Error handled in hook
      toast.error('Failed to upload image')
    }
  };

  const handleImageError = (type: 'profile' | 'cover') => {
    setImageErrors(prev => ({ ...prev, [type]: true }));
  };

  if (!profile) {
    return (
      <div className='my-10 w-full rounded-[10px] bg-[#252B36] h-[50vh] relative animate-pulse'>
        <div className="w-full h-full bg-gray-700 rounded-[10px]"></div>
      </div>
    );
  }

  const coverImageUrl = getCoverImageUrl(profile.cover_image);
  const profileImageUrl = getProfileImageUrl(profile.profile_image);

  return (
    <div className='my-10 w-full rounded-[10px] bg-[#252B36] h-[50vh] relative text-white font-poppins overflow-hidden'>
      {/* Cover Image */}
      <div className="w-full h-full relative">
        <Image
          src={imageErrors.cover ? '/images/default-cover.svg' : coverImageUrl}
          className="w-full h-full object-cover rounded-[10px]"
          alt="Profile cover"
          width={1200}
          height={400}
          priority
          onError={() => handleImageError('cover')}
        />
        
        {/* Cover Image Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 rounded-[10px]" />
        
        {/* Edit Cover Button */}
        <button 
          onClick={handleCoverImageUpload}
          disabled={isUploadingImage}
          className={`
            absolute top-6 right-6 bg-[#7e856f] hover:bg-[#6d7460] 
            border font-bold text-[14px] px-4 py-2 capitalize rounded-lg 
            transition-all duration-300 transform hover:scale-105
            ${isUploadingImage ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          {isUploadingImage ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
              {uploadProgress}%
            </div>
          ) : (
            'Edit Cover'
          )}
        </button>
      </div>

      {/* Profile Information */}
      <div className='absolute bottom-0 w-full font-extralight text-white'>
        <div className='p-6 flex justify-between items-end'>
          <div className='flex items-end gap-6'>
            {/* Profile Image */}
            <div className='relative group'>
              <div className="relative w-32 h-32 rounded-full ring-4 ring-white/20 overflow-hidden">
                <Image
                  src={imageErrors.profile ? '/images/default-avatar.svg' : profileImageUrl}
                  className='w-full h-full object-cover'
                  alt="Profile picture"
                  width={128}
                  height={128}
                  priority
                  onError={() => handleImageError('profile')}
                />
                
                {/* Profile Image Upload Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer">
                  <button
                    onClick={handleProfileImageUpload}
                    disabled={isUploadingImage}
                    className="text-white text-sm font-bold"
                  >
                    {isUploadingImage ? '⏳' : '📸'}
                  </button>
                </div>
              </div>
              
              {/* Verification Badge */}
              {profile.is_verified && (
                <div className="absolute -top-1 -right-1 bg-blue-500 rounded-full p-1">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>

            {/* User Info */}
            <div className='font-bold text-[18px] space-y-2'>
              <div className="flex items-center gap-4">
                <div>
                  <h1 className="text-2xl font-bold flex items-center gap-2">
                    {profile.full_name}
                    {profile.role === 'artist' && (
                      <span className="text-yellow-400 text-lg">🎵</span>
                    )}
                  </h1>
                  <p className="text-[#7e856f] capitalize font-medium">
                    {profile.role}
                  </p>
                  {profile.bio && (
                    <p className="text-gray-300 text-sm font-normal max-w-md truncate">
                      {profile.bio}
                    </p>
                  )}
                </div>
                
                <div className="text-gray-400 text-sm">
                  <h2>{profile.email}</h2>
                  {profile.phone_number && (
                    <p>{profile.phone_number}</p>
                  )}
                </div>
              </div>

              {/* Social Links for Artists */}
              {profile.role === 'artist' && (
                <div className="flex items-center gap-3 mt-2">
                  {profile.spotify_link && (
                    <a 
                      href={profile.spotify_link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-green-400 hover:text-green-300 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
                      </svg>
                    </a>
                  )}
                  {profile.soundcloud_link && (
                    <a 
                      href={profile.soundcloud_link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-orange-400 hover:text-orange-300 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M1.175 12.225c-.051 0-.075.025-.075.075v1.65c0 .05.024.075.075.075.05 0 .075-.025.075-.075V12.3c0-.05-.025-.075-.075-.075zm1.65-.75c-.05 0-.075.025-.075.075v3.3c0 .05.025.075.075.075s.075-.025.075-.075v-3.3c0-.05-.025-.075-.075-.075zm1.65-.45c-.05 0-.075.025-.075.075v4.2c0 .05.025.075.075.075s.075-.025.075-.075v-4.2c0-.05-.025-.075-.075-.075zm1.65-.675c-.05 0-.075.025-.075.075v5.55c0 .05.025.075.075.075s.075-.025.075-.075v-5.55c0-.05-.025-.075-.075-.075zm1.65-.375c-.05 0-.075.025-.075.075v6.3c0 .05.025.075.075.075s.075-.025.075-.075v-6.3c0-.05-.025-.075-.075-.075zm1.65-.675c-.05 0-.075.025-.075.075v7.65c0 .05.025.075.075.075s.075-.025.075-.075v-7.65c0-.05-.025-.075-.075-.075zm1.65-.75c-.05 0-.075.025-.075.075v9.15c0 .05.025.075.075.075s.075-.025.075-.075v-9.15c0-.05-.025-.075-.075-.075zm1.65-.225c-.05 0-.075.025-.075.075v9.6c0 .05.025.075.075.075s.075-.025.075-.075v-9.6c0-.05-.025-.075-.075-.075zm1.65-.375c-.025 0-.05.025-.05.05v10.35c0 .025.025.05.05.05s.05-.025.05-.05V9.075c0-.025-.025-.05-.05-.05zm1.575-.75c-.025 0-.05.025-.05.05v11.85c0 .025.025.05.05.05s.05-.025.05-.05V8.325c0-.025-.025-.05-.05-.05zm1.65.675c-.025 0-.05.025-.05.05v10.5c0 .025.025.05.05.05s.05-.025.05-.05V9c0-.025-.025-.05-.05-.05z"/>
                      </svg>
                    </a>
                  )}
                  {profile.instagram_link && (
                    <a 
                      href={profile.instagram_link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-pink-400 hover:text-pink-300 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Edit Profile Button */}
          <div className='place-self-end'>
            <button
              onClick={onEditToggle}
              className={`
                px-6 py-3 text-[18px] capitalize font-bold rounded-lg transition-all duration-300
                transform hover:scale-105 ${
                  isEditing 
                    ? 'bg-red-500 hover:bg-red-600 text-white' 
                    : 'bg-[#499BFC] hover:bg-[#3a8ae3] text-white'
                }
              `}
            >
              {isEditing ? '✕ Cancel' : 'Edit Profile'}
            </button>
          </div>
        </div>

        {/* Upload Progress Bar */}
        {isUploadingImage && uploadProgress > 0 && (
          <div className="absolute bottom-4 left-6 right-6">
            <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-white">Uploading image...</span>
                <span className="text-sm text-white">{uploadProgress}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileBanner;