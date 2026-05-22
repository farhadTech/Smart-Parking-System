export type SlotStatus = "Available" | "Occupied" | "Reserved" | "Maintenance";

export type ParkingSlot = {
  slot: string;
  status: SlotStatus;
  vehicle?: string;
  time?: string;
  zone: string;
};

export type ParkingLocation = {
  id: string;
  name: string;
  address: string;
  area: string;
  distance: string;
  lat: number;
  lng: number;
  totalSlots: number;
  availableSlots: number;
  occupiedSlots: number;
  reservedSlots: number;
  heatLevel: "Low" | "Medium" | "High";
  pricePerHour: number;
  slots: ParkingSlot[];
};

export const parkingLocations: ParkingLocation[] = [
  {
    id: "city-center",
    name: "City Center Garage",
    address: "Gulshan Avenue, Dhaka",
    area: "Gulshan",
    distance: "0.8 km",
    lat: 23.7806,
    lng: 90.4193,
    totalSlots: 18,
    availableSlots: 9,
    occupiedSlots: 6,
    reservedSlots: 2,
    heatLevel: "Medium",
    pricePerHour: 50,
    slots: [
      { slot: "G-A01", status: "Occupied", vehicle: "DHK-1234", time: "08:15", zone: "Gulshan A Block" },
      { slot: "G-A02", status: "Available", zone: "Gulshan A Block" },
      { slot: "G-A03", status: "Reserved", vehicle: "CTG-5678", zone: "Gulshan A Block" },
      { slot: "G-A04", status: "Available", zone: "Gulshan A Block" },
      { slot: "G-B01", status: "Occupied", vehicle: "DHK-3456", zone: "Gulshan B Block" },
      { slot: "G-B02", status: "Available", zone: "Gulshan B Block" },
    ],
  },
  {
    id: "banani-plaza",
    name: "Banani Plaza Parking",
    address: "Road 11, Banani, Dhaka",
    area: "Banani",
    distance: "1.4 km",
    lat: 23.7937,
    lng: 90.4066,
    totalSlots: 24,
    availableSlots: 15,
    occupiedSlots: 7,
    reservedSlots: 2,
    heatLevel: "Low",
    pricePerHour: 60,
    slots: [
      { slot: "BN-A01", status: "Available", zone: "Banani Ground Floor" },
      { slot: "BN-A02", status: "Available", zone: "Banani Ground Floor" },
      { slot: "BN-A03", status: "Occupied", vehicle: "BAN-1122", time: "09:30", zone: "Banani Ground Floor" },
      { slot: "BN-B01", status: "Available", zone: "Banani Level 1" },
      { slot: "BN-B02", status: "Reserved", vehicle: "DHK-8899", zone: "Banani Level 1" },
      { slot: "BN-B03", status: "Available", zone: "Banani Level 1" },
    ],
  },
  {
    id: "dhanmondi-mall",
    name: "Dhanmondi Mall Parking",
    address: "Dhanmondi 27, Dhaka",
    area: "Dhanmondi",
    distance: "4.2 km",
    lat: 23.7465,
    lng: 90.376,
    totalSlots: 30,
    availableSlots: 5,
    occupiedSlots: 22,
    reservedSlots: 3,
    heatLevel: "High",
    pricePerHour: 45,
    slots: [
      { slot: "DH-A01", status: "Occupied", vehicle: "DHA-1111", time: "10:00", zone: "Dhanmondi Basement" },
      { slot: "DH-A02", status: "Occupied", vehicle: "DHA-2222", time: "10:15", zone: "Dhanmondi Basement" },
      { slot: "DH-A03", status: "Available", zone: "Dhanmondi Basement" },
      { slot: "DH-B01", status: "Reserved", vehicle: "DHA-3333", zone: "Dhanmondi Level 1" },
      { slot: "DH-B02", status: "Occupied", vehicle: "DHA-4444", zone: "Dhanmondi Level 1" },
      { slot: "DH-B03", status: "Maintenance", zone: "Dhanmondi Level 1" },
    ],
  },
  {
    id: "uttara-hub",
    name: "Uttara Parking Hub",
    address: "Sector 7, Uttara, Dhaka",
    area: "Uttara",
    distance: "7.6 km",
    lat: 23.8759,
    lng: 90.3795,
    totalSlots: 40,
    availableSlots: 26,
    occupiedSlots: 10,
    reservedSlots: 4,
    heatLevel: "Low",
    pricePerHour: 40,
    slots: [
      { slot: "UT-A01", status: "Available", zone: "Uttara Sector 7" },
      { slot: "UT-A02", status: "Available", zone: "Uttara Sector 7" },
      { slot: "UT-A03", status: "Available", zone: "Uttara Sector 7" },
      { slot: "UT-B01", status: "Occupied", vehicle: "UTR-1010", time: "11:00", zone: "Uttara Level 1" },
      { slot: "UT-B02", status: "Reserved", vehicle: "UTR-2020", zone: "Uttara Level 1" },
      { slot: "UT-B03", status: "Available", zone: "Uttara Level 1" },
    ],
  },
];