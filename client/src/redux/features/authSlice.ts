import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

import { AuthState } from "@/types/auth.dt";
import { LoginRequestProps, LoginResponseProps, RegisterRequstProps, RegisterResponseProps } from '@/types/auth.dt';
import { authApi } from '@/app/api/authApi';
import { extractErrorMessage } from '@/app/api/apiConfig';

const initialState: AuthState = {
    user: null,
    token: null,
    isLoading: false,
    isAuthenticated: false,
    error: null
}

export const registerUser = createAsyncThunk<
        RegisterResponseProps,
        RegisterRequstProps,
        {rejectValue:string}
    >(
    'auth/register',
    async(registerData, {rejectWithValue})=>{
        try {
            const response = await authApi.registerAPI(registerData)
            return response.data
        } catch (error:unknown) {
            return rejectWithValue(extractErrorMessage(error, 'Enter a valid information'));
        }
    }
)

export const loginUser=createAsyncThunk<
    LoginResponseProps,
    LoginRequestProps,
    {rejectValue:string}
>(
    'auth/login',
    async(loginData,{rejectWithValue})=>{
        try {
            const response = await authApi.loginAPI(loginData)
            return response.data
        } catch (error:unknown) {
            return rejectWithValue(extractErrorMessage(error, 'Enter a valid information'));
        }
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        logout:(state)=>{
            state.error=null
            state.isAuthenticated=false
            state.isLoading=false
            state.user=null
            state.token=null
            
            // Clear localStorage
            if (typeof window !== 'undefined') {
                localStorage.removeItem('authTokens')
                localStorage.removeItem('user')
            }
        },

        clearError:(state)=>{
            state.error=null
        },
        
        restoreAuth: (state, action)=>{
            const { user, token } = action.payload
            if (user && token && token.access && token.refresh) {
                state.user = user
                state.token = token
                state.isLoading = false
                state.isAuthenticated = true
                state.error = null
            }
        },
        
        setAuth:(state,action)=>{
            const { user, token } = action.payload
            if (user && token && token.access && token.refresh) {
                state.user = user
                state.token = token
                state.isAuthenticated = true
                state.error = null
                
                // Update localStorage
                if (typeof window !== 'undefined') {
                    localStorage.setItem('authTokens', JSON.stringify(token))
                    localStorage.setItem('user', JSON.stringify(user))
                }
            }
        }
    },

    extraReducers:(builder)=>{
        builder
        .addCase(registerUser.pending, (state)=>{
            state.isLoading = true
            state.error = null
        })
        .addCase(registerUser.fulfilled, (state,action)=>{
            const { user, access, refresh } = action.payload
            
            if (user && access && refresh) {
                state.user = user
                state.error = null
                state.isAuthenticated = true
                state.isLoading = false
                state.token = {
                    refresh,
                    access
                }
                
                // Store in localStorage
                if (typeof window !== 'undefined') {
                    localStorage.setItem('authTokens', JSON.stringify(state.token))
                    localStorage.setItem('user', JSON.stringify(user))
                }
            } else {
                console.error('Invalid registration response:', action.payload)
                state.error = 'Invalid server response'
                state.isLoading = false
            }
        })
        .addCase(registerUser.rejected, (state,action)=>{
            state.error = action.payload || 'Registration failed'
            state.isAuthenticated = false
            state.isLoading = false
            state.user = null
            state.token = null
        })

        .addCase(loginUser.pending, (state)=>{
            state.error=null
            state.isLoading=true
        })
        
        .addCase(loginUser.fulfilled, (state, action) => {
            const { user, access, refresh } = action.payload
            
            if (!user || !access || !refresh) {
                console.error('Invalid login response:', action.payload)
                state.error = 'Invalid server response'
                state.isLoading = false
                state.isAuthenticated = false
                return
            }
            
            state.user = user
            state.isLoading = false
            state.isAuthenticated = true
            state.error = null
            state.token = {
                refresh,
                access
            }
            
            // Store in localStorage
            if (typeof window !== 'undefined') {
                localStorage.setItem('authTokens', JSON.stringify(state.token))
                localStorage.setItem('user', JSON.stringify(user))
            }
        })

        .addCase(loginUser.rejected, (state, action)=>{
            state.error = action.payload || 'Login failed'
            state.isLoading = false
            state.isAuthenticated = false
            state.user = null
            state.token = null
        })
    }
})

export const {logout, clearError, setAuth, restoreAuth} = authSlice.actions
export default authSlice.reducer