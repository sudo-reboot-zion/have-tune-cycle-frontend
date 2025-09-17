import { useCallback } from 'react';
import { 
  createPaymentIntent, 
  confirmPayment, 
  fetchUserPurchases,
  downloadPurchasedTrack,
  clearError,
  clearCurrentPayment 
} from '../redux/features/paymentSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import type { StripeCardElement, StripeCardNumberElement } from '@stripe/stripe-js';
import { toast } from 'sonner';
import { useStripe } from '@stripe/react-stripe-js';

export const usePayment = () => {
  const dispatch = useAppDispatch(); 
  const paymentState = useAppSelector((state) => state.payment); 

  const stripe = useStripe()

  const initializePayment = useCallback(async (trackId: string, licenseType = 'standard') => {
    try {
      const result = await dispatch(createPaymentIntent({ 
        track_id: trackId, 
        license_type: licenseType 
      })).unwrap(); 
      return result;
    } catch (error) {
      throw error;
    }
  }, [dispatch]);

  const processPayment = useCallback(async (
    clientSecret: string, 
    cardElement?: StripeCardElement | StripeCardNumberElement | { token: string }
  ) => {
    try {
      
      if (!stripe) {
        throw new Error('Stripe failed to load');
      }
      
      // Option 1: If you have a card element (most common)
      if (cardElement) {
        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement
          }
        });

        if (error) {
          throw new Error(error.message);
        }

        if (paymentIntent?.status === 'succeeded') {
          const result = await dispatch(confirmPayment({ 
            payment_intent_id: paymentIntent.id 
          })).unwrap(); 
          return { paymentIntent, result };
        }
      } else {
        // Option 2: Let Stripe handle the payment method collection
        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret);

        if (error) {
          throw new Error(error.message);
        }

        if (paymentIntent?.status === 'succeeded') {
          const result = await dispatch(confirmPayment({ 
            payment_intent_id: paymentIntent.id 
          })).unwrap(); 
          return { paymentIntent, result };
        }
      }
    } catch (error) {
      throw error;
    }
  }, [dispatch]);

  const confirmPaymentAction = useCallback(async (data: { payment_intent_id: string }) => {
    try {
      const result = await dispatch(confirmPayment(data)).unwrap();
      return result;
    } catch (error) {
      throw error;
    }
  }, [dispatch]);

  const purchaseTrack = useCallback(async (trackId: string, licenseType = 'standard') => {
    try {
      const paymentData = await initializePayment(trackId, licenseType);
      

      window.location.href = `/payment?client_secret=${paymentData.client_secret}&track_id=${trackId}`;
      
      return paymentData;
    } catch (error) {
      console.error('Purchase failed:', error);
      toast.error('');
    }
  }, [initializePayment]);

  const downloadTrack = useCallback(async (purchaseId: string) => {
    try {
      const result = await dispatch(downloadPurchasedTrack(purchaseId)).unwrap();
      return result;
    } catch (error) {
      throw error;
    }
  }, [dispatch]);

  const loadPurchases = useCallback(async () => {
    try {
      const result = await dispatch(fetchUserPurchases()).unwrap();
      return result;
    } catch (error) {
      throw error;
    }
  }, [dispatch]);

  const clearPaymentError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  const resetCurrentPayment = useCallback(() => {
    dispatch(clearCurrentPayment());
  }, [dispatch]);

  return {
    // State

    ...paymentState,

  
    // Actions
    initializePayment,
    confirmPayment: confirmPaymentAction,
    purchaseTrack,
    processPayment,
    downloadTrack,
    loadPurchases,
    clearPaymentError,
    resetCurrentPayment,

    client_secret: paymentState.currentPayment?.client_secret || null
    
    
  };
};