const BASE_URL =
  "http://localhost:8080/api";

export const parkingService = {
  async getSlots () {
    const response =
      await fetch(
        `${BASE_URL}/slots`
      );

    return response.json();
  },

  async bookSlot (slotId) {
    const response =
      await fetch(
        `${BASE_URL}/slots/book/${slotId}`,
        {
          method: "POST",
        }
      );

    return response.json();
  },

  async getReservations () {
    const response =
      await fetch(
        `${BASE_URL}/reservations`
      );

    return response.json();
  },
};