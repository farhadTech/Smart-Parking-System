package com.sps.backend.service;

import com.sps.backend.dto.ParkingLocationResponse;
import com.sps.backend.dto.ParkingSlotResponse;
import com.sps.backend.entity.ParkingLocation;
import com.sps.backend.entity.ParkingSlot;
import com.sps.backend.entity.SlotStatus;
import com.sps.backend.repository.ParkingLocationRepository;
import com.sps.backend.repository.ParkingSlotRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ParkingLocationService {

    private final ParkingLocationRepository locationRepository;
    private final ParkingSlotRepository slotRepository;

    public List<ParkingLocationResponse> getAllLocations() {
        return locationRepository.findAll()
                .stream()
                .map(this::toLocationResponse)
                .toList();
    }

    public ParkingLocationResponse getLocationById(Long id) {
        ParkingLocation location = locationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Parking location not found"));

        return toLocationResponse(location);
    }

    public List<ParkingSlotResponse> getSlotsByLocation(Long locationId) {
        return slotRepository.findByLocationId(locationId)
                .stream()
                .map(this::toSlotResponse)
                .toList();
    }

    public List<ParkingSlotResponse> getAvailableSlotsByLocation(Long locationId) {
        return slotRepository.findByLocationIdAndStatus(locationId, SlotStatus.AVAILABLE)
                .stream()
                .map(this::toSlotResponse)
                .toList();
    }

    private ParkingLocationResponse toLocationResponse(ParkingLocation location) {
        return ParkingLocationResponse.builder()
                .id(location.getId())
                .name(location.getName())
                .area(location.getArea())
                .address(location.getAddress())
                .latitude(location.getLatitude())
                .longitude(location.getLongitude())
                .totalSlots(location.getTotalSlots())
                .availableSlots(location.getAvailableSlots())
                .occupiedSlots(location.getOccupiedSlots())
                .reservedSlots(location.getReservedSlots())
                .pricePerHour(location.getPricePerHour())
                .distanceKm(location.getDistanceKm())
                .heatLevel(location.getHeatLevel())
                .slots(
                        location.getSlots()
                                .stream()
                                .map(this::toSlotResponse)
                                .toList()
                )
                .build();
    }

    private ParkingSlotResponse toSlotResponse(ParkingSlot slot) {
        return ParkingSlotResponse.builder()
                .id(slot.getId())
                .slotCode(slot.getSlotCode())
                .zone(slot.getZone())
                .vehicleNumber(slot.getVehicleNumber())
                .status(slot.getStatus())
                .build();
    }
}