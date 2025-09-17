// components/ProfilePage.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useUserProfile } from "@/hooks/useUserProfile";
import DashboardHeaderSearchInfo from "../entryPointContent/DashboardHeaderSearchInfo";

import { toast } from 'sonner';
import { UserProfile } from "@/redux/features/userProfileSlice";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ProfileBanner from "./profileBanner";
import PersonalInformation from "./personalInformation";

function ProfilePage() {
  const {
    profile,
    isLoading,
    isUpdating,
    error,
    fetchCurrentProfile,
    updateProfile,
    clearProfileError,
  } = useUserProfile();

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Fetch profile on component mount
    if (!profile) {
      fetchCurrentProfile();
    }
  }, [fetchCurrentProfile, profile]);

  useEffect(() => {
    // Clear error after 5 seconds
    if (error) {
      const timer = setTimeout(() => {
        clearProfileError();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, clearProfileError]);

  const handleUpdateUserDetails = async (updatedDetails: Partial<UserProfile>) => {
    if (!profile?.id) {
      toast.error('Profile not loaded. Please refresh the page.');
      return;
    }

    try {
      await updateProfile(profile.id, updatedDetails);
      setIsEditing(false);
    } catch  {
       toast.error('Error in updating profile')
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  if (isLoading && !profile) {
    return (
      <div className="p-10 h-screen bg-[#161212] flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error && !profile) {
    return (
      <div className="p-10 h-screen bg-[#161212] flex items-center justify-center">
        <div className="text-center text-white">
          <div className="text-red-400 mb-4 text-xl">
            ⚠️ Failed to load profile
          </div>
          <p className="text-gray-400 mb-6">{error}</p>
          <button
            onClick={fetchCurrentProfile}
            className="bg-[#499BFC] hover:bg-[#3a8ae3] px-6 py-3 rounded-lg font-bold transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-10 h-auto bg-[#161212] min-h-screen">
      <DashboardHeaderSearchInfo dashboard_location="Profile" />
      
      {/* Error Toast */}
      {error && (
        <div className="fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-pulse">
          <div className="flex items-center gap-2">
            <span>⚠️</span>
            <span>{error}</span>
            <button
              onClick={clearProfileError}
              className="ml-2 hover:bg-red-600 p-1 rounded"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Profile Banner */}
      <ProfileBanner 
        profile={profile} 
        onEditToggle={handleEditToggle}
        isEditing={isEditing}
      />

    
      <PersonalInformation
        profile={profile}
        onUpdateUserDetails={handleUpdateUserDetails}
        isEditing={isEditing}
        isUpdating={isUpdating}
        onCancelEdit={() => setIsEditing(false)}
      />

      {/* Loading Overlay */}
      {isUpdating && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
}

export default ProfilePage;