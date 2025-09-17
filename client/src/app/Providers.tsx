'use client';

import { store, AppDispatch } from '@/redux/store';
import React, { ReactNode, useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { setupApiInterceptors } from '@/app/api/apiConfig';
import { logout, setAuth, restoreAuth, clearError } from '@/redux/features/authSlice';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);


function AppInitializer() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setupApiInterceptors(store, { logout, setAuth, restoreAuth, clearError });
    console.log('API interceptors initialized');

    try {
      const storedTokens = localStorage.getItem('authTokens');
      const storedUser = localStorage.getItem('user');
      
      if (
        storedTokens &&
        storedUser &&
        storedTokens !== 'undefined' &&
        storedUser !== 'undefined'
      ) {
        const parsedUser = JSON.parse(storedUser);
        const parsedTokens = JSON.parse(storedTokens);
        
        if (parsedUser && parsedTokens) {
          dispatch(
            restoreAuth({
              user: parsedUser,
              token: parsedTokens,
            })
          );
          console.log('Auth restored from localStorage');
        }
      }
    } catch (error) {
      console.error('Error restoring auth from localStorage:', error);
      localStorage.removeItem('authTokens');
      localStorage.removeItem('user');
    }
  }, [dispatch]);

  return null;
}

function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <AppInitializer />
      <Elements stripe={stripePromise}>
        {children}
      </Elements>
    </Provider>
  );
}

export default Providers;
