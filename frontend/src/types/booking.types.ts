export type BookingStatus = "Active" | "Upcoming" | "Completed" | "Cancelled";

export type PaymentMethod = "CARD" | "BKASH" | "NAGAD";

export type Booking = {
  id: string;
  locationName: string;
  locationAddress: string;
  slot: string;
  zone: string;
  vehicle: string;
  duration: string;
  amount: number;
  pricePerHour: number;
  status: BookingStatus;
  paymentMethod: PaymentMethod;
  userRole: "USER" | "ADMIN";
  createdAt: string;
};
