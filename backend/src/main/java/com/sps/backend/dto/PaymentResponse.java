package com.sps.backend.dto;

import com.sps.backend.entity.PaymentMethod;
import com.sps.backend.entity.PaymentStatus;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentResponse {

    private Long id;

    private String transactionId;

    private Long bookingId;
    private String bookingCode;

    private String userName;
    private String userEmail;

    private String locationName;
    private String slotCode;
    private String vehicleNumber;

    private Double amount;

    private PaymentMethod method;

    private PaymentStatus status;

    private LocalDateTime paidAt;
}