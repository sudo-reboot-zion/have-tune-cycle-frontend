import { LoginRequestProps, RegisterRequstProps } from "@/types/auth.dt";
import apiClient from "./apiConfig";
import { AxiosError } from "axios";

export const authApi = {
    registerAPI: async (registerData: RegisterRequstProps) => {
        const requiredFields = ['first_name', 'last_name', 'email', 'username', 'password', 'confirm_password', 'role'];
        const missingFields = requiredFields.filter(field => !registerData[field as keyof RegisterRequstProps]);
        
        if (missingFields.length > 0) {
            throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
        }
        
        // Clean and validate the data
        const cleanedData = {
            first_name: registerData.first_name.trim(),
            last_name: registerData.last_name.trim(),
            email: registerData.email.trim().toLowerCase(),
            username: registerData.username.trim(),
            password: registerData.password,
            confirm_password: registerData.confirm_password,
            role: registerData.role,
            bio: registerData.bio?.trim() || '' 
        };
        
        try { 
            const response = await apiClient.post('auth/register/', cleanedData);
            return response;
            
        } catch (error: unknown) {
            const axiosError = error as AxiosError;

            if (axiosError.response) {
                if (typeof axiosError.response.data === 'string') {
                    try {
                        // const parsedData = JSON.parse(axiosError.response.data);
                      
                    } catch {
                        console.log('Could not parse response data as JSON');
                    }
                }
            } else if (axiosError.request) {
                // Request was made but no response was received
                console.log('No response received');
            } else {
                // Something happened in setting up the request
                console.log('Request setup error');
            }
            
            throw error;
        }
    },
    
    loginAPI: async (loginData: LoginRequestProps) => {
        try {
            const response = await apiClient.post('auth/login/', loginData);
            return response;
        } catch (error: unknown) {
            throw error;
        }
    },
    
    refreshAPI: async (refreshToken: string) => {
        try {
            const response = await apiClient.post('auth/refresh/', {
                refresh: refreshToken
            });
            return response;
        } catch (error: unknown) {
            throw error;
        }
    }
}