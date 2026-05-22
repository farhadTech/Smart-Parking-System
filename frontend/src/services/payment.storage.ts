import type { Payment } from "../types/payment.types";

const PAYMENTS_KEY = "smart_parking_payments";

export const getPayments = (): Payment[] => {
  const data = localStorage.getItem( PAYMENTS_KEY );

  if ( !data ) return [];

  try {
    return JSON.parse( data ) as Payment[];
  } catch {
    return [];
  }
};

export const savePayment = ( payment: Payment ): void => {
  const payments = getPayments();

  localStorage.setItem( PAYMENTS_KEY, JSON.stringify( [ payment, ...payments ] ) );
};

export const refundPayment = ( paymentId: string ): void => {
  const payments = getPayments().map( ( payment ) =>
    payment.id === paymentId
      ? {
        ...payment,
        status: "Refunded" as const,
      }
      : payment
  );

  localStorage.setItem( PAYMENTS_KEY, JSON.stringify( payments ) );
};