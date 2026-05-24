package com.sps.backend.dto;

import com.sps.backend.entity.SlotStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateSlotStatusRequest {
    @NotNull
    private SlotStatus status;
}