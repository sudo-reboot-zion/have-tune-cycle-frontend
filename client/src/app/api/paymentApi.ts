import { CreatePaymentIntentData, ConfirmPaymentData } from "@/types/payment.dt";
import apiClient from "./apiConfig";

export const paymentApi = {
  createPaymentIntent: async (data: CreatePaymentIntentData) => {
    return apiClient.post('payment/create-intent/', data);
  },

  confirmPayment: async (data: ConfirmPaymentData) => {
    return apiClient.post('payment/confirm/', data);
  },

  getUserPurchases: async () => {
    return apiClient.get('purchases/');
  },

  downloadTrack: async (purchaseId: string) => {
    return apiClient.get(`download/track/${purchaseId}/`, {
      responseType: 'blob',
    });
  },

  downloadLicense: async (purchaseId: string) => {
    return apiClient.get(`download/license/${purchaseId}/`, {
      responseType: 'blob',
    });
  }
};
