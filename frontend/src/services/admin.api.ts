import api from "./api";
import type { ParkingLocationResponse, ParkingSlotResponse, SlotStatus } from "./location.api";
import type { BookingResponse } from "./booking.api";
import type { PaymentResponse } from "./payment.api";

export type AdminUserResponse = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  role: "USER" | "ADMIN";
};

export const getAdminUsers = async (): Promise<AdminUserResponse[]> => {
  const response = await api.get<AdminUserResponse[]>( "/admin/users" );
  return response.data;
};

export const deleteAdminUser = async ( id: number ): Promise<void> => {
  await api.delete( `/admin/users/${ id }` );
};

export const getAdminParkingLocations = async (): Promise<
  ParkingLocationResponse[]
> => {
  const response = await api.get<ParkingLocationResponse[]>(
    "/admin/parking/locations"
  );
  return response.data;
};

export const getAdminLocationSlots = async (
  locationId: number
): Promise<ParkingSlotResponse[]> => {
  const response = await api.get<ParkingSlotResponse[]>(
    `/admin/parking/locations/${ locationId }/slots`
  );
  return response.data;
};

export const updateAdminSlotStatus = async (
  slotId: number,
  status: SlotStatus
): Promise<ParkingSlotResponse> => {
  const response = await api.patch<ParkingSlotResponse>(
    `/admin/parking/slots/${ slotId }/status`,
    { status }
  );
  return response.data;
};

export const getAdminBookings = async (): Promise<BookingResponse[]> => {
  const response = await api.get<BookingResponse[]>( "/bookings/admin/all" );
  return response.data;
};

export const getAdminPayments = async (): Promise<PaymentResponse[]> => {
  const response = await api.get<PaymentResponse[]>( "/payments/admin/all" );
  return response.data;
};