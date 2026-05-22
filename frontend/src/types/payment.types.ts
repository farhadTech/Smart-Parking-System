export type PaymentMethod = "CARD" | "BKASH" | "NAGAD";
export type PaymentStatus = "Paid" | "Pending" | "Failed" | "Refunded";

export type Payment = {
  id: string;
  bookingId: string;
  locationName: string;
  slot: string;
  vehicle: string;
  method: PaymentMethod;
  amount: number;
  subtotal?: number;
  discountAmount?: number;
  status: PaymentStatus;
  userRole: "USER" | "ADMIN";
  createdAt: string;
};