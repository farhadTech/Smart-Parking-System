export const parkingSlots = Array.from({length: 12}, (_, i) => ({
  id: `P-${i + 1}`,
  status: i % 3 === 0 ? "occupied" : "available",
}));

export const stats = [
  {title: "Total Slots", value: 120},
  {title: "Occupied", value: 80},
  {title: "Available", value: 40},
];
