package com.sps.backend.dto;

import com.sps.backend.entity.SlotStatus;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ParkingSlotResponse {

    private Long id;
    private String slotCode;
    private String zone;
    private String vehicleNumber;
    private SlotStatus status;
}