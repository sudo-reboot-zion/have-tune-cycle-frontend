import React, { useState, useEffect } from "react";
import { UserProfile } from "@/redux/features/userProfileSlice";

interface PersonalInformationProps {
  profile: UserProfile | null;
  onUpdateUserDetails: (updatedDetails: Partial<UserProfile>) => Promise<void>;
  isEditing: boolean;
  isUpdating: boolean;
  onCancelEdit: () => void;
}

function PersonalInformation({ 
  profile, 
  onUpdateUserDetails, 
  isEditing, 
  isUpdating, 
  onCancelEdit 
}: PersonalInformationProps) {
  // Local state that matches the UserProfile structure
  const [localDetails, setLocalDetails] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    bio: '',
  });

  // Update local state when profile changes
  useEffect(() => {
    if (profile) {
      setLocalDetails({
        first_name: profile.first_name || '',
        last_name: profile.last_name || '',
        email: profile.email || '',
        phone_number: profile.phone_number || '',
        bio: profile.bio || '',
      });
    }
  }, [profile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setLocalDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await onUpdateUserDetails(localDetails);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  // Show loading state
  if (!profile) {
    return (
      <div className="py-10 bg-[#252B36] rounded-[10px] p-10 text-white font-poppins">
        <div className="text-center">Loading personal information...</div>
      </div>
    );
  }

  return (
    <div className="py-10 bg-[#252B36] rounded-[10px] p-10 text-white font-poppins">
      <div>
        <h1 className="text-3xl font-monoBold capitalize">Personal Information</h1>
      </div>

      <div className="grid grid-cols-2 gap-10">
        <div>
          <div className="flex flex-col py-5 space-y-3">
            <label htmlFor="first_name" className="block text-[18px] font-bold">
              First Name
            </label>
            <input
              type="text"
              name="first_name"
              value={localDetails.first_name}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`p-3 outline-none bg-[#363c46] border border-[#363346] placeholder:font-bold rounded-md ${
                !isEditing ? 'opacity-60 cursor-not-allowed' : ''
              }`}
              placeholder="John"
            />
          </div>

          <div className="flex flex-col py-5 space-y-3">
            <label htmlFor="bio" className="block text-[18px] font-bold">
              Bio
            </label>
            <textarea
              name="bio"
              value={localDetails.bio}
              onChange={handleInputChange}
              disabled={!isEditing}
              rows={4}
              className={`p-3 outline-none bg-[#363c46] border border-[#363346] placeholder:font-bold rounded-md resize-none ${
                !isEditing ? 'opacity-60 cursor-not-allowed' : ''
              }`}
              placeholder="Tell us about yourself..."
            />
          </div>
        </div>

        <div>
          <div className="flex flex-col py-5 space-y-3">
            <label htmlFor="last_name" className="block text-[18px] font-bold">
              Last Name
            </label>
            <input
              type="text"
              name="last_name"
              value={localDetails.last_name}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`p-3 outline-none bg-[#363c46] border border-[#363346] placeholder:font-bold rounded-md ${
                !isEditing ? 'opacity-60 cursor-not-allowed' : ''
              }`}
              placeholder="Doe"
            />
          </div>

          <div className="flex flex-col py-5 space-y-3">
            <label htmlFor="phone_number" className="block text-[18px] font-bold">
              Mobile Phone
            </label>
            <input
              type="tel"
              name="phone_number"
              value={localDetails.phone_number}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`p-3 outline-none bg-[#363c46] border border-[#363346] placeholder:font-bold rounded-md ${
                !isEditing ? 'opacity-60 cursor-not-allowed' : ''
              }`}
              placeholder="+233 548600000000"
            />
          </div>

          <div className="flex flex-col py-5 space-y-3">
            <label htmlFor="email" className="block text-[18px] font-bold">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={localDetails.email}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`p-3 outline-none bg-[#363c46] border border-[#363346] placeholder:font-bold rounded-md ${
                !isEditing ? 'opacity-60 cursor-not-allowed' : ''
              }`}
              placeholder="johndoe@gmail.com"
            />
          </div>
        </div>
      </div>

      {/* Read-only fields for reference */}
      <div className="mt-10 pt-8 border-t border-gray-600">
        <h2 className="text-xl font-bold mb-4 text-gray-300">Account Information</h2>
        <div className="grid grid-cols-2 gap-10">
          <div className="flex flex-col space-y-3">
            <label className="block text-[16px] font-medium text-gray-400">
              Username
            </label>
            <div className="p-3 bg-[#1a1f28] border border-[#363346] rounded-md text-gray-300">
              {profile.username}
            </div>
          </div>
          <div className="flex flex-col space-y-3">
            <label className="block text-[16px] font-medium text-gray-400">
              Role
            </label>
            <div className="p-3 bg-[#1a1f28] border border-[#363346] rounded-md text-gray-300 capitalize">
              {profile.role}
              {profile.is_verified && (
                <span className="ml-2 text-blue-400">✓ Verified</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons - only show when editing */}
      {isEditing && (
        <div className="flex justify-center gap-4 py-10">
          <button
            onClick={onCancelEdit}
            disabled={isUpdating}
            className="text-2xl py-3 font-outfit px-12 font-extralight bg-gray-600 rounded-lg transition-all duration-300 hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isUpdating}
            className={`
              text-2xl py-3 font-outfit px-12 font-extralight bg-primaryColor rounded-lg transition-all duration-300
              ${isUpdating 
                ? 'bg-gray-600 cursor-not-allowed opacity-50' 
                : 'bg-btn-gradient hover:opacity-90 transform hover:scale-105'
              }
            `}
          >
            {isUpdating ? (
              <div className="flex items-center gap-3">
                <div className="animate-spin w-6 h-6 border-2 border-white border-t-transparent rounded-full"></div>
                Saving...
              </div>
            ) : (
              'Save Changes'
            )}
          </button>
        </div>
      )}
    </div>
  );
}

export default PersonalInformation;