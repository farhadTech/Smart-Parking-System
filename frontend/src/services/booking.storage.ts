import type { Booking } from "../types/booking.types";

const BOOKINGS_KEY = "smart_parking_bookings";

export const getBookings = (): Booking[] => {
  const data = localStorage.getItem( BOOKINGS_KEY );

  if ( !data ) return [];

  try {
    return JSON.parse( data ) as Booking[];
  } catch {
    return [];
  }
};

export const saveBooking = ( booking: Booking ) => {
  const bookings = getBookings();
  localStorage.setItem( BOOKINGS_KEY, JSON.stringify( [ booking, ...bookings ] ) );
};

export const cancelBooking = ( bookingId: string ) => {
  const bookings = getBookings().map( ( booking ) =>
    booking.id === bookingId
      ? {
        ...booking,
        status: "Cancelled" as const,
      }
      : booking
  );

  localStorage.setItem( BOOKINGS_KEY, JSON.stringify( bookings ) );
};
