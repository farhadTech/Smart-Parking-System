import api from "./api";

export type BookingStatus = "ACTIVE" | "UPCOMING" | "COMPLETED" | "CANCELLED";

export type BookingResponse = {
  id: number;
  bookingCode: string;
  userName: string;
  userEmail: string;
  locationId: number;
  locationName: string;
  locationArea: string;
  locationAddress: string;
  slotId: number;
  slotCode: string;
  zone: string;
  vehicleNumber: string;
  durationHours: number;
  amount: number;
  startTime: string;
  endTime: string;
  createdAt: string;
  status: BookingStatus;
};

export type CreateBookingRequest = {
  locationId: number;
  slotId: number;
  vehicleNumber: string;
  durationHours: number;
};

export const getMyBookings = async (): Promise<BookingResponse[]> => {
  const response = await api.get<BookingResponse[]>( "/bookings/my" );
  return response.data;
};

export const getAllBookings = async (): Promise<BookingResponse[]> => {
  const response = await api.get<BookingResponse[]>( "/bookings/admin/all" );
  return response.data;
};

export const createBooking = async (
  data: CreateBookingRequest
): Promise<BookingResponse> => {
  const response = await api.post<BookingResponse>( "/bookings", data );
  return response.data;
};

export const cancelBooking = async (
  bookingId: number
): Promise<BookingResponse> => {
  const response = await api.patch<BookingResponse>(
    `/bookings/${ bookingId }/cancel`
  );

  return response.data;
};

export const completeBooking = async (
  bookingId: number
): Promise<BookingResponse> => {
  const response = await api.patch<BookingResponse>(
    `/bookings/admin/${ bookingId }/complete`
  );

  return response.data;
};