package com.sps.backend.dto;

import com.sps.backend.entity.HeatLevel;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ParkingLocationResponse {

    private Long id;
    private String name;
    private String area;
    private String address;

    private Double latitude;
    private Double longitude;

    private Integer totalSlots;
    private Integer availableSlots;
    private Integer occupiedSlots;
    private Integer reservedSlots;

    private Double pricePerHour;
    private Double distanceKm;

    private HeatLevel heatLevel;

    private List<ParkingSlotResponse> slots;
}