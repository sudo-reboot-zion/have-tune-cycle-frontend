"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import { FaImage, FaMusic } from 'react-icons/fa';

// Redux imports
import { uploadTrack, fetchGenres, fetchMoods, clearUploadState } from '@/redux/features/tracksSlice';
import { AppDispatch, RootState } from '@/redux/store';
import { FormData } from '@/types/tracks.dt';


function UploadForm() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  // Redux state
  const { 
    isUploading, 
    uploadError, 
    uploadSuccess,
    genres,
    moods,
    genresLoading,
    moodsLoading
  } = useSelector((state: RootState) => state.tracks);

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [, setAudioPreview] = useState<string>('');
  const [imagePreview, setImagePreview] = useState<string>('');

  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    base_price: '',
    genre: '',
    mood: '',
    tags: '',
    bpm: '',
    key: '',
    audio_file: null,
    cover_image: null,
  });

  // Load genres and moods on component mount
  useEffect(() => {
    dispatch(fetchGenres());
    dispatch(fetchMoods());
  }, [dispatch]);

  // Handle upload success
  useEffect(() => {
    if (uploadSuccess) {
      setShowSuccessPopup(true);
      setTimeout(() => {
        setShowSuccessPopup(false);
        dispatch(clearUploadState());
        router.push('/dashboard'); 
      }, 3000);
    }
  }, [uploadSuccess, dispatch, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: 'audio_file' | 'cover_image') => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, [fileType]: file }));
      
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      if (fileType === 'audio_file') {
        setAudioPreview(previewUrl);
      } else {
        setImagePreview(previewUrl);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!formData.audio_file) {
      alert('Please select an audio file');
      return;
    }

    const uploadData = {
      title: formData.title,
      description: formData.description || undefined,
      audio_file: formData.audio_file,
      cover_image: formData.cover_image || undefined,
      genre: Number(formData.genre),
      mood: Number(formData.mood),
      base_price: parseFloat(formData.base_price),
      tags: formData.tags || undefined,
      bpm: formData.bpm ? parseInt(formData.bpm) : undefined,
      key: formData.key || undefined,
    };

    dispatch(uploadTrack(uploadData));
  };

  // Form validation
  const isFormValid = formData.title && 
                     formData.base_price && 
                     formData.genre && 
                     formData.mood && 
                     formData.audio_file;

  return (
    <form onSubmit={handleSubmit} className='my-20 bg-primaryColor font-outfit font-extralight text-white rounded-[10px] p-10'>
 
      
      {/* Loading indicator */}
      {isUploading && (
        <div className="flex justify-center my-4">
          <div className="w-8 h-8 border-4 border-[#761EFE] border-t-transparent rounded-full animate-gradient-spin"></div>
        </div>
      )}

      {/* Error display */}
      {uploadError && (
        <div className="bg-red-500/20 border border-red-500 text-red-500 p-4 rounded-lg my-4">
          {uploadError}
        </div>
      )}

      {/* Success popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-[#252B36] p-10 rounded-lg text-center">
            <h2 className="text-2xl font-bold text-green-500">Success!</h2>
            <div className='w-full flex items-center justify-center'>
              <Image src="/images/yeey.svg" alt="congrats" width={80} height={80}/>
            </div>
            <p className="mt-4">Your music has been successfully uploaded.</p>
            <p className="mt-2">Redirecting to your tracks...</p>
          </div>
        </div>
      )}

      <div className='grid grid-cols-2 gap-10'>
        {/* Left Column */}
        <div>
          {/* Title */}
          <div className='flex flex-col py-5 space-y-3'>
            <label className='block text-[18px] font-bold'>Title *</label>
            <input
              type='text'
              name='title'
              value={formData.title}
              onChange={handleInputChange}
              className='p-3 outline-none bg-[#363c46] border border-[#363346] placeholder:font-bold'
              placeholder='Enter song title'
              required
            />
          </div>

          {/* Description */}
          <div className='flex flex-col py-5 space-y-3'>
            <label className='block text-[18px] font-bold'>Description</label>
            <textarea
              name='description'
              value={formData.description}
              onChange={handleInputChange}
              className='p-3 outline-none bg-[#363c46] border border-[#363346] placeholder:font-bold resize-none'
              placeholder='Describe your track...'
              rows={3}
            />
          </div>

          {/* Price */}
          <div className='flex flex-col py-5 space-y-3'>
            <label className='block text-[18px] font-bold'>Base Price (USD) *</label>
            <input
              type='number'
              step='0.01'
              min='0'
              name='base_price'
              value={formData.base_price}
              onChange={handleInputChange}
              className='p-3 outline-none bg-[#363c46] border border-[#363346] placeholder:font-bold'
              placeholder='25.00'
              required
            />
          </div>

          {/* Genre */}
          <div className='flex flex-col py-5 space-y-3'>
            <label className='block text-[18px] font-bold'>Genre *</label>
            <select
              name='genre'
              value={formData.genre}
              onChange={handleInputChange}
              className='p-3 outline-none bg-[#363c46] border border-[#363346]'
              required
            >
              <option value=''>Select Genre</option>
              {genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>
            {genresLoading && <p className="text-sm text-gray-400">Loading genres...</p>}
          </div>

          {/* Mood */}
          <div className='flex flex-col py-5 space-y-3'>
            <label className='block text-[18px] font-bold'>Mood *</label>
            <select
              name='mood'
              value={formData.mood}
              onChange={handleInputChange}
              className='p-3 outline-none bg-[#363c46] border border-[#363346]'
              required
            >
              <option value=''>Select Mood</option>
              {moods.map((mood) => (
                <option key={mood.id} value={mood.id}>
                  {mood.name}
                </option>
              ))}
            </select>
            {moodsLoading && <p className="text-sm text-gray-400">Loading moods...</p>}
          </div>
        </div>

        {/* Right Column */}
        <div>
          {/* Cover Image Upload */}
          <div className='flex flex-col py-5 space-y-3'>
            <label className='block text-[18px] font-bold'>Cover Image</label>
            <div className="relative">
              <input
                type='file'
                name='cover_image'
                onChange={(e) => handleFileChange(e, 'cover_image')}
                className="hidden"
                id="coverImageInput"
                accept='image/*'
              />
              <label
                htmlFor="coverImageInput"
                className="cursor-pointer bg-[#363c46] text-white px-4 py-2 rounded-lg border border-[#363346] transition-colors duration-200 flex items-center gap-2"
              >
                <FaImage /> Choose Image
              </label>
              {imagePreview && (
                <div className="mt-2">
                  <Image src={imagePreview} alt="Cover Preview" className="w-20 h-20 object-cover rounded-lg" width={80} height={80}/>
                </div>
              )}
            </div>
          </div>

          {/* Audio File Upload */}
          <div className='flex flex-col py-5 space-y-3'>
            <label className='block text-[18px] font-bold'>Audio File *</label>
            <div className="relative">
              <input
                type='file'
                name='audio_file'
                onChange={(e) => handleFileChange(e, 'audio_file')}
                className="hidden"
                id="musicFileInput"
                accept='audio/*'
                required
              />
              <label
                htmlFor="musicFileInput"
                className="cursor-pointer bg-[#363c46] text-white px-4 py-2 rounded-lg border border-[#363346] transition-colors duration-200 flex items-center gap-2"
              >
                <FaMusic /> Choose Audio File
              </label>
              {formData.audio_file && (
                <p className="mt-2 text-sm text-gray-400">{formData.audio_file.name}</p>
              )}
            </div>
          </div>

          {/* Optional Fields */}
          <div className='flex flex-col py-5 space-y-3'>
            <label className='block text-[18px] font-bold'>Tags</label>
            <input
              type='text'
              name='tags'
              value={formData.tags}
              onChange={handleInputChange}
              className='p-3 outline-none bg-[#363c46] border border-[#363346] placeholder:font-bold'
              placeholder='hip-hop, chill, instrumental'
            />
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div className='flex flex-col py-5 space-y-3'>
              <label className='block text-[18px] font-bold'>BPM</label>
              <input
                type='number'
                name='bpm'
                value={formData.bpm}
                onChange={handleInputChange}
                className='p-3 outline-none bg-[#363c46] border border-[#363346] placeholder:font-bold'
                placeholder='120'
              />
            </div>

            <div className='flex flex-col py-5 space-y-3'>
              <label className='block text-[18px] font-bold'>Key</label>
              <input
                type='text'
                name='key'
                value={formData.key}
                onChange={handleInputChange}
                className='p-3 outline-none bg-[#363c46] border border-[#363346] placeholder:font-bold'
                placeholder='C major'
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className='flex flex-col py-5 space-y-3'>
            <label className='block text-[18px] font-bold'>Upload Song</label>
            <div className='place-self-start'>
              <button 
                disabled={!isFormValid || isUploading}
                className={`px-6 py-3 rounded-lg font-bold transition-all duration-200 ${
                  !isFormValid || isUploading
                    ? "bg-gray-500 cursor-not-allowed text-gray-300" 
                    : "bg-[#761EFE] hover:bg-[#5a17c4] text-white"
                }`}
                type="submit"
              >
                {isUploading ? 'Uploading...' : 'Upload Track'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default UploadForm;