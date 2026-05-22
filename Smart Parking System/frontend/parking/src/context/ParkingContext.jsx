import {
  createContext,
  useContext,
  useState,
} from "react";

const ParkingContext =
  createContext();

const initialSlots =
  Array.from(
    {length: 12},
    (_, i) => ({
      id: `P-${i + 1}`,

      status:
        i % 3 === 0
          ? "Occupied"
          : "Available",

      zone:
        "A Block",

      price: 50,
    })
  );

export function ParkingProvider ({
  children,
}) {

  const [
    slots,
    setSlots,
  ] = useState(
    initialSlots
  );

  const [
    reservations,
    setReservations,
  ] = useState([]);

  // Book slot only
  const bookSlot = (
    slotId,
    vehicleNumber
  ) => {

    const slot =
      slots.find(
        (s) =>
          s.id ===
          slotId
      );

    // Prevent invalid booking
    if (
      !slot ||
      slot.status !==
      "Available"
    ) {
      return false;
    }

    // Mark slot occupied
    setSlots((prev) =>
      prev.map((slot) =>
        slot.id ===
          slotId
          ? {
            ...slot,
            status:
              "Occupied",
          }
          : slot
      )
    );

    return true;
  };

  // Create reservation AFTER payment
  const addReservation =
    (booking) => {

      const reservation =
      {
        ...booking,

        reservationId:
          "RS-" +
          Math.floor(
            Math.random() *
            100000
          ),

        startTime:
          new Date(),

        status:
          "Confirmed",
      };

      setReservations(
        (prev) => [
          reservation,
          ...prev,
        ]
      );
    };

  // Cancel booking
  const cancelBooking =
    (
      reservationId
    ) => {

      const reservation =
        reservations.find(
          (r) =>
            r.reservationId ===
            reservationId
        );

      if (
        !reservation
      ) {
        return;
      }

      // Make slot available again
      setSlots((prev) =>
        prev.map(
          (slot) =>
            slot.id ===
              reservation.slotId
              ? {
                ...slot,
                status:
                  "Available",
              }
              : slot
        )
      );

      // Remove reservation
      setReservations(
        (prev) =>
          prev.filter(
            (r) =>
              r.reservationId !==
              reservationId
          )
      );
    };

  return (
    <ParkingContext.Provider
      value={{
        slots,
        reservations,
        bookSlot,
        addReservation,
        cancelBooking,
      }}
    >
      {children}
    </ParkingContext.Provider>
  );
}

export const useParking =
  () =>
    useContext(
      ParkingContext
    );