import { GetTracksParams, UploadTrackData } from "@/types/tracks.dt";
import apiClient from "./apiConfig";

export const tracksApi = {

    uploadTrack: async (trackData: UploadTrackData)=>{
        const formData = new FormData();

        formData.append('title', trackData.title);
        formData.append('audio_file', trackData.audio_file);
        formData.append('genre', trackData.genre.toString());
        formData.append('mood', trackData.mood.toString());
        formData.append('base_price', trackData.base_price.toString())

        if(trackData.description) {
            formData.append('description', trackData.description);
        }

        if(trackData.cover_image) {
            formData.append('cover_image', trackData.cover_image);
        }

        if(trackData.tags) {
            formData.append('tags', trackData.tags);
        }

        if(trackData.bpm) {
            formData.append('key', trackData.bpm.toString());
        }

        if(trackData.key) {
            formData.append('key', trackData.key);
        }

        return apiClient.post('tracks/upload/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },


    streamPreview: async (trackId: string): Promise<string> => {
    const response = await apiClient.get(`stream/preview/${trackId}/`, {
      responseType: 'blob',
    });
    
    return URL.createObjectURL(response.data);
  },


    getGenres: async()=>{
        return apiClient.get('genres/');
    },

    getMoods: async()=>{
        return apiClient.get('moods/');
    },

    getMyTracks: async()=>{
        return apiClient.get('tracks/my-tracks/');
    },

    

    getTracks: async(params?:GetTracksParams)=>{
        return apiClient.get('tracks/', {params});
    }
}