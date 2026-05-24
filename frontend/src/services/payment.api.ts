import api from "./api";

export type PaymentMethod = "CARD" | "BKASH" | "NAGAD" | "CASH";
export type PaymentStatus = "PAID" | "PENDING" | "FAILED" | "REFUNDED";

export type CreatePaymentRequest = {
  bookingId: number;
  method: PaymentMethod;
};

export type PaymentResponse = {
  id: number;
  transactionId: string;
  bookingId: number;
  bookingCode: string;
  userName: string;
  userEmail: string;
  locationName: string;
  slotCode: string;
  vehicleNumber: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  paidAt: string;
};

export const createPayment = async (
  data: CreatePaymentRequest
): Promise<PaymentResponse> => {
  const response = await api.post<PaymentResponse>( "/payments", data );
  return response.data;
};

export const getMyPayments = async (): Promise<PaymentResponse[]> => {
  const response = await api.get<PaymentResponse[]>( "/payments/my" );
  return response.data;
};

export const getAllPayments = async (): Promise<PaymentResponse[]> => {
  const response = await api.get<PaymentResponse[]>( "/payments/admin/all" );
  return response.data;
};

export const refundPayment = async (
  paymentId: number
): Promise<PaymentResponse> => {
  const response = await api.patch<PaymentResponse>(
    `/payments/admin/${ paymentId }/refund`
  );
  return response.data;
};