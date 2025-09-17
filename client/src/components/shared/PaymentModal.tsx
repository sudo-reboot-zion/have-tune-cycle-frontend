"use client";
import React, { useEffect, useState } from "react";
import { CardElement, useElements } from "@stripe/react-stripe-js";
import { LuLoader, LuX, LuCreditCard, LuShoppingCart, LuMusic } from "react-icons/lu";
import { toast } from "sonner";
import Image from "next/image";

import { Track } from "@/types/tracks.dt";
import { usePayment } from "@/hooks/usePayment";
import { PaymentError } from "@/types/payment.dt";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  track: Track | null;
  onSuccess: (purchaseId: string, trackId?: string) => void; // Updated to accept parameters
  onError?: (error: string) => void; // Optional error callback
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  track,
  onSuccess,
  onError,
}) => {
  const elements = useElements();
  const {
    initializePayment,
    processPayment,
    clearPaymentError,
    client_secret,
    isProcessing,
    error,
  } = usePayment();

  const [localClientSecret, setLocalClientSecret] = useState<string | null>(null);

  // init payment intent when modal opens
  useEffect(() => {
    const fetchIntent = async () => {
      if (isOpen && track) {
        try {
          const result = await initializePayment(track.public_id);
          if (result?.client_secret) {
            setLocalClientSecret(result.client_secret);
          }
        } catch (err: unknown) {
          const error = err as PaymentError;
          const errorMessage = error.message || "Failed to initialize payment";
          toast.error(errorMessage);
          onError?.(errorMessage);
        }
      }
    };
    fetchIntent();
  }, [isOpen, track, initializePayment, onError]);

  // show errors via toast
  useEffect(() => {
    if (error) {
      toast.error(error);
      onError?.(error);
      clearPaymentError();
    }
  }, [error, clearPaymentError, onError]);

  // handle payment click
  const handlePayment = async () => {
    const secret = client_secret || localClientSecret;
    if (!elements || !secret) return;

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) return;

    try {
      const result = await processPayment(secret, cardElement);
      if (result?.paymentIntent?.status === "succeeded") {
        toast.success("Payment successful! 🎉", {
          duration: 4000,
        });
        
        // Call onSuccess with the purchase ID and track ID
        const purchaseId = result.paymentIntent.id;
        onSuccess(purchaseId, track?.public_id);
        onClose();
      }
    } catch (err: unknown) {
      const error = err as PaymentError
      const errorMessage = error.message || "Payment failed.";
      toast.error(errorMessage);
      onError?.(errorMessage);
    }
  };

  if (!isOpen || !track) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <LuShoppingCart className="w-6 h-6 text-blue-600" />
            Complete Purchase
          </h2>
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors group disabled:opacity-50"
          >
            <LuX className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Track Info Card */}
          <div className="flex gap-4 mb-6 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-100">
            <div className="w-20 h-20 bg-gray-200 rounded-xl overflow-hidden flex-shrink-0 shadow-md">
              {track.cover_image ? (
                <Image
                  src={track.cover_image}
                  alt={track.title}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <LuMusic className="w-8 h-8 text-white/80" />
                </div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-lg text-gray-900 truncate mb-1">
                {track.title}
              </h3>
              <p className="text-sm text-gray-600 truncate mb-2">
                by {track.artist_full_name || track.artist_name}
              </p>
              <div className="flex items-center gap-2">
                {track.genre_name && (
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
                    {track.genre_name}
                  </span>
                )}
                <span className="bg-purple-100 text-purple-800 text-xs font-medium px-3 py-1 rounded-full">
                  Standard License
                </span>
              </div>
            </div>
          </div>

          {/* Price Section */}
          <div className="flex justify-between items-center mb-6 p-4 bg-gray-50 rounded-xl">
            <span className="text-lg font-semibold text-gray-700">Total Amount:</span>
            <span className="text-2xl font-bold text-gray-900">
              ${track.base_price}
            </span>
          </div>

          {/* Loading state for payment initialization */}
          {isProcessing && !client_secret && !localClientSecret && (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <LuLoader className="w-8 h-8 animate-spin text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Preparing Payment...
              </h3>
              <p className="text-sm text-gray-500">
                Please wait while we set up your secure payment
              </p>
            </div>
          )}

          {/* Payment Form */}
          {(client_secret || localClientSecret) && (
            <div className="space-y-6">
              {/* Card Element */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <LuCreditCard className="inline w-5 h-5 mr-2 text-gray-600" />
                  Payment Information
                </label>
                <div className="p-4 border-2 border-gray-200 rounded-xl bg-white transition-all duration-200 focus-within:ring-4 focus-within:ring-blue-100 focus-within:border-blue-400 hover:border-gray-300">
                  <CardElement 
                    options={{ 
                      hidePostalCode: true,
                      style: {
                        base: {
                          fontSize: '16px',
                          color: '#1f2937',
                          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                          fontSmoothing: 'antialiased',
                          '::placeholder': {
                            color: '#9ca3af',
                          },
                          iconColor: '#6b7280',
                        },
                        invalid: {
                          color: '#ef4444',
                          iconColor: '#ef4444',
                        },
                        complete: {
                          color: '#059669',
                          iconColor: '#059669',
                        },
                      },
                    }} 
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  disabled={isProcessing}
                  className="flex-1 py-3 px-6 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className={`flex-1 py-3 px-6 font-bold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg ${
                    isProcessing
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none'
                      : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-blue-200 hover:shadow-xl transform hover:-translate-y-0.5'
                  }`}
                >
                  {isProcessing ? (
                    <>
                      <LuLoader className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <LuShoppingCart className="w-5 h-5" />
                      Pay ${track.base_price}
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Security Notice */}
          <div className="mt-6 p-3 bg-green-50 rounded-lg border border-green-200">
            <p className="text-xs text-green-700 text-center font-medium flex items-center justify-center gap-2">
              🔒 Your payment is protected by 256-bit SSL encryption
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;