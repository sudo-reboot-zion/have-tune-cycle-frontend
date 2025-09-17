import { Track } from "./tracks.dt";

export interface CreatePaymentIntentData {
  track_id: string;
  license_type?: string;
}

export interface PaymentError {
  message?: string;
}

export interface PaymentIntentResponse {
  client_secret: string;
  amount: number;
  track_title: string;
  license_type: string;
}

export interface ConfirmPaymentData {
  payment_intent_id: string;
}

export interface Purchase {
  public_id: string;
  track_title: string;
  track_artist: string;
  license_name: string;
  price_paid: number;
  currency: string;
  payment_status: string;
  can_download: boolean;
  download_count: number;
  max_downloads: number;
  purchased_at: string;
}

export interface PaymentState {
  isProcessing: boolean;
  currentPayment: PaymentIntentResponse | null;
  purchases: Purchase[];
  error: string | null;
}

export interface PaymentModalProps {
  track: Track | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (purchaseId: string) => void;
  onError?:(purchaseId:string)=>void;
}