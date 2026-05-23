package com.sps.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateBookingRequest {

    @NotNull(message = "Location ID is required")
    private Long locationId;

    @NotNull(message = "Slot ID is required")
    private Long slotId;

    @NotBlank(message = "Vehicle number is required")
    private String vehicleNumber;

    @NotNull(message = "Duration is required")
    private Integer durationHours;
}