package com.sps.backend.config;

import com.sps.backend.entity.*;
import com.sps.backend.repository.ParkingLocationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final ParkingLocationRepository locationRepository;

    @Override
    public void run(String... args) {
        if (locationRepository.count() > 0) {
            return;
        }

        createLocation(
                "City Center Garage",
                "Gulshan",
                "Gulshan Avenue, Dhaka",
                23.7806,
                90.4193,
                50.0,
                0.8,
                HeatLevel.MEDIUM
        );

        createLocation(
                "Banani Plaza Parking",
                "Banani",
                "Road 11, Banani, Dhaka",
                23.7937,
                90.4066,
                60.0,
                1.2,
                HeatLevel.LOW
        );

        createLocation(
                "Dhanmondi Lake Parking",
                "Dhanmondi",
                "Dhanmondi 27, Dhaka",
                23.7465,
                90.3760,
                45.0,
                2.5,
                HeatLevel.HIGH
        );

        createLocation(
                "Uttara Sector Parking",
                "Uttara",
                "Sector 7, Uttara, Dhaka",
                23.8759,
                90.3795,
                40.0,
                4.1,
                HeatLevel.LOW
        );
    }

    private void createLocation(
            String name,
            String area,
            String address,
            Double latitude,
            Double longitude,
            Double pricePerHour,
            Double distanceKm,
            HeatLevel heatLevel
    ) {
        ParkingLocation location = ParkingLocation.builder()
                .name(name)
                .area(area)
                .address(address)
                .latitude(latitude)
                .longitude(longitude)
                .pricePerHour(pricePerHour)
                .distanceKm(distanceKm)
                .heatLevel(heatLevel)
                .slots(new ArrayList<>())
                .build();

        List<ParkingSlot> slots = new ArrayList<>();

        for (int i = 1; i <= 18; i++) {
            SlotStatus status;

            if (i % 7 == 0) {
                status = SlotStatus.MAINTENANCE;
            } else if (i % 5 == 0) {
                status = SlotStatus.RESERVED;
            } else if (i % 3 == 0) {
                status = SlotStatus.OCCUPIED;
            } else {
                status = SlotStatus.AVAILABLE;
            }

            String zone = i <= 6 ? "A Block" : i <= 12 ? "B Block" : "C Block";
            String slotCode = zone.charAt(0) + "-" + String.format("%02d", ((i - 1) % 6) + 1);

            ParkingSlot slot = ParkingSlot.builder()
                    .slotCode(slotCode)
                    .zone(zone)
                    .status(status)
                    .vehicleNumber(status == SlotStatus.OCCUPIED ? "DHK-" + (1000 + i) : null)
                    .location(location)
                    .build();

            slots.add(slot);
        }

        long available = slots.stream().filter(s -> s.getStatus() == SlotStatus.AVAILABLE).count();
        long occupied = slots.stream().filter(s -> s.getStatus() == SlotStatus.OCCUPIED).count();
        long reserved = slots.stream().filter(s -> s.getStatus() == SlotStatus.RESERVED).count();

        location.setSlots(slots);
        location.setTotalSlots(slots.size());
        location.setAvailableSlots((int) available);
        location.setOccupiedSlots((int) occupied);
        location.setReservedSlots((int) reserved);

        locationRepository.save(location);
    }
}