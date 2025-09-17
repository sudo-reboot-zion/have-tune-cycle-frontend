import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import paginationReducer from '../redux/features/paginationSlice';
import authReducer from '../redux/features/authSlice';
import trackReducer from '../redux/features/tracksSlice'
import paymentReducer from '../redux/features/paymentSlice'
import userProfileReducer from '../redux/features/userProfileSlice'




export const store = configureStore({
    reducer: {
        pagination: paginationReducer,
        auth: authReducer,
        tracks: trackReducer,
        payment: paymentReducer,
        userProfile: userProfileReducer
    }
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;



export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;