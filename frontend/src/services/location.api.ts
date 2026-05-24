import { API_URL, authHeaders } from "./api.config";

export type SlotStatus =
  | "AVAILABLE"
  | "OCCUPIED"
  | "RESERVED"
  | "MAINTENANCE";

export type HeatLevel = "LOW" | "MEDIUM" | "HIGH";

export type ParkingSlotResponse = {
  id: number;
  slotCode: string;
  zone: string;
  vehicleNumber: string | null;
  status: SlotStatus;
};

export type ParkingLocationResponse = {
  id: number;
  name: string;
  area: string;
  address: string;
  latitude: number;
  longitude: number;
  totalSlots: number;
  availableSlots: number;
  occupiedSlots: number;
  reservedSlots: number;
  pricePerHour: number;
  distanceKm: number;
  heatLevel: HeatLevel;
  slots: ParkingSlotResponse[];
};

export const getLocations = async (): Promise<ParkingLocationResponse[]> => {
  const response = await fetch( `${ API_URL }/locations`, {
    headers: authHeaders(),
  } );

  if ( !response.ok ) {
    throw new Error( "Failed to fetch locations" );
  }

  return response.json();
};

export const getLocationById = async (
  id: number
): Promise<ParkingLocationResponse> => {
  const response = await fetch( `${ API_URL }/locations/${ id }`, {
    headers: authHeaders(),
  } );

  if ( !response.ok ) {
    throw new Error( "Failed to fetch location" );
  }

  return response.json();
};