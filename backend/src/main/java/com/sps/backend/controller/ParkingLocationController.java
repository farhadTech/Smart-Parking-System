package com.sps.backend.controller;

import com.sps.backend.dto.ParkingLocationResponse;
import com.sps.backend.dto.ParkingSlotResponse;
import com.sps.backend.service.ParkingLocationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/locations")
@RequiredArgsConstructor
public class ParkingLocationController {

    private final ParkingLocationService locationService;

    @GetMapping
    public List<ParkingLocationResponse> getAllLocations() {
        return locationService.getAllLocations();
    }

    @GetMapping("/{id}")
    public ParkingLocationResponse getLocationById(@PathVariable Long id) {
        return locationService.getLocationById(id);
    }

    @GetMapping("/{id}/slots")
    public List<ParkingSlotResponse> getSlotsByLocation(@PathVariable Long id) {
        return locationService.getSlotsByLocation(id);
    }

    @GetMapping("/{id}/slots/available")
    public List<ParkingSlotResponse> getAvailableSlots(@PathVariable Long id) {
        return locationService.getAvailableSlotsByLocation(id);
    }
}