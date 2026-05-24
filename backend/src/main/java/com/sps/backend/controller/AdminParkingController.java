package com.sps.backend.controller;

import com.sps.backend.dto.ParkingLocationResponse;
import com.sps.backend.dto.ParkingSlotResponse;
import com.sps.backend.dto.UpdateSlotStatusRequest;
import com.sps.backend.entity.ParkingSlot;
import com.sps.backend.entity.SlotStatus;
import com.sps.backend.repository.ParkingSlotRepository;
import com.sps.backend.service.ParkingLocationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/parking")
@RequiredArgsConstructor
public class AdminParkingController {

    private final ParkingLocationService parkingLocationService;
    private final ParkingSlotRepository slotRepository;

    @GetMapping("/locations")
    public List<ParkingLocationResponse> getLocations() {
        return parkingLocationService.getAllLocations();
    }

    @GetMapping("/locations/{id}/slots")
    public List<ParkingSlotResponse> getSlots(@PathVariable Long id) {
        return parkingLocationService.getSlotsByLocation(id);
    }

    @PatchMapping("/slots/{id}/status")
    public ParkingSlot updateSlotStatus(
            @PathVariable Long id,
            @Valid @RequestBody UpdateSlotStatusRequest request
    ) {
        ParkingSlot slot = slotRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Slot not found"));

        slot.setStatus(request.getStatus());

        if (request.getStatus() == SlotStatus.AVAILABLE) {
            slot.setVehicleNumber(null);
        }

        return slotRepository.save(slot);
    }
}