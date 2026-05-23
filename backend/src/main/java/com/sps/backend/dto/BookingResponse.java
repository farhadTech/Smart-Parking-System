package com.sps.backend.dto;

import com.sps.backend.entity.BookingStatus;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookingResponse {

    private Long id;

    private String bookingCode;

    private String userName;
    private String userEmail;

    private Long locationId;
    private String locationName;
    private String locationArea;
    private String locationAddress;

    private Long slotId;
    private String slotCode;
    private String zone;

    private String vehicleNumber;

    private Integer durationHours;

    private Double amount;

    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private LocalDateTime createdAt;

    private BookingStatus status;
}