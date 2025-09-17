import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { paymentApi } from '../../app/api/paymentApi';
import { 
  PaymentState, 
  CreatePaymentIntentData, 
  PaymentIntentResponse,
  ConfirmPaymentData,
  Purchase 
} from '@/types/payment.dt';
import { AxiosError } from 'axios';

const initialState: PaymentState = {
  isProcessing: false,
  currentPayment: null,
  purchases: [],
  error: null,
};

// Helper function to extract error message
const extractErrorMessage = (error: unknown, fallbackMessage: string): string => {
  const axiosError = error as AxiosError<{ error?: string; message?: string }>;
  return axiosError?.response?.data?.error || 
         axiosError?.response?.data?.message || 
         fallbackMessage;
};

// Async thunks with better typing
export const createPaymentIntent = createAsyncThunk<
  PaymentIntentResponse, 
  CreatePaymentIntentData, 
  { rejectValue: string }
>(
  'payment/createIntent',
  async (data, { rejectWithValue }) => {
    try {
      const response = await paymentApi.createPaymentIntent(data);
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(extractErrorMessage(error, 'Payment intent creation failed'));
    }
  }
);

export const confirmPayment = createAsyncThunk<
  { success: boolean; purchase_id: string; message: string },
  ConfirmPaymentData,
  { rejectValue: string }
>(
  'payment/confirmPayment',
  async (data, { rejectWithValue }) => {
    try {
      const response = await paymentApi.confirmPayment(data);
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(extractErrorMessage(error, 'Payment confirmation failed'));
    }
  }
);

export const fetchUserPurchases = createAsyncThunk<
  Purchase[], 
  void,
  { rejectValue: string }
>(
  'payment/fetchPurchases',
  async (_, { rejectWithValue }) => {
    try {
      const response = await paymentApi.getUserPurchases();
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(extractErrorMessage(error, 'Failed to fetch purchases'));
    }
  }
);

export const downloadPurchasedTrack = createAsyncThunk<
  { purchaseId: string; filename: string },
  string,
  { rejectValue: string }
>(
  'payment/downloadTrack',
  async (purchaseId, { rejectWithValue }) => {
    try {
      const response = await paymentApi.downloadTrack(purchaseId);
      
      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      
      // Get filename from response headers or use default
      const contentDisposition = response.headers['content-disposition'];
      const filename = contentDisposition 
        ? contentDisposition.split('filename=')[1]?.replace(/"/g, '')
        : 'track.mp3';
      
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
      return { purchaseId, filename };
    } catch (error: unknown) {
      return rejectWithValue(extractErrorMessage(error, 'Download failed'));
    }
  }
);

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentPayment: (state) => {
      state.currentPayment = null;
    },
    setProcessing: (state, action: PayloadAction<boolean>) => {
      state.isProcessing = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Create Payment Intent
      .addCase(createPaymentIntent.pending, (state) => {
        state.isProcessing = true;
        state.error = null;
      })
      .addCase(createPaymentIntent.fulfilled, (state, action) => {
        state.isProcessing = false;
        state.currentPayment = action.payload;
      })
      .addCase(createPaymentIntent.rejected, (state, action) => {
        state.isProcessing = false;
        state.error = action.payload || 'Payment failed';
      })
      
      // Confirm Payment
      .addCase(confirmPayment.pending, (state) => {
        state.isProcessing = true;
      })
      .addCase(confirmPayment.fulfilled, (state) => {
        state.isProcessing = false;
        state.currentPayment = null;
        // Optionally add to purchases array if needed
      })
      .addCase(confirmPayment.rejected, (state, action) => {
        state.isProcessing = false;
        state.error = action.payload || 'Payment confirmation failed';
      })
      
      // Fetch Purchases
      .addCase(fetchUserPurchases.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchUserPurchases.fulfilled, (state, action) => {
        state.purchases = action.payload;
      })
      .addCase(fetchUserPurchases.rejected, (state, action) => {
        state.error = action.payload || 'Failed to fetch purchases';
      })
      
      // Download Track
      .addCase(downloadPurchasedTrack.pending, (state) => {
        state.error = null;
      })
      .addCase(downloadPurchasedTrack.fulfilled, () => {
        // Success - download started
      })
      .addCase(downloadPurchasedTrack.rejected, (state, action) => {
        state.error = action.payload || 'Download failed';
      });
  },
});

export const { clearError, clearCurrentPayment, setProcessing } = paymentSlice.actions;
export default paymentSlice.reducer;