import { authSlice } from '@/redux/features/authSlice';
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { EnhancedStore } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';


const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json'
    }
});

type AuthActions = typeof authSlice.actions;

export const setupApiInterceptors = (
    store: EnhancedStore<RootState>, 
    authActions: AuthActions
) => {
    apiClient.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
            const state = store.getState();
            const token = state.auth.token?.access;
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    apiClient.interceptors.response.use(
        (response: AxiosResponse) => response,
        async (error) => {
            const originalRequest = error.config;

            if (error.response?.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;

                const state = store.getState();
                const refreshToken = state.auth.token?.refresh;

                if (refreshToken) {
                    try {
                        const refreshResponse = await axios.post(
                            `${process.env.NEXT_PUBLIC_API_URL}auth/refresh/`,
                            { refresh: refreshToken }
                        );

                        const newTokens = {
                            access: refreshResponse.data.access,
                            refresh: refreshToken
                        };

                        store.dispatch(authActions.setAuth({
                            user: state.auth.user,
                            token: newTokens
                        }));

                        originalRequest.headers.Authorization = `Bearer ${newTokens.access}`;
                        return apiClient(originalRequest);

                    } catch (refreshError) {
                        store.dispatch(authActions.logout());
                        if (typeof window !== 'undefined') {
                            window.location.href = "/";
                        }
                        return Promise.reject(refreshError);
                    }
                } else {
                    store.dispatch(authActions.logout());
                    if (typeof window !== 'undefined') {
                        window.location.href = '/';
                    }
                    return Promise.reject(new Error('No refresh token available'));
                }
            }
            return Promise.reject(error);
        }
    );
};

export default apiClient;


export const extractErrorMessage = (error: unknown, fallbackMessage: string): string => {
  const axiosError = error as AxiosError<{ error?: string; message?: string }>;
  return axiosError?.response?.data?.error || 
         axiosError?.response?.data?.message || 
         fallbackMessage;
};