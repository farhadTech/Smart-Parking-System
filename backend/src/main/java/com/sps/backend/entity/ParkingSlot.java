package com.sps.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "parking_slots")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ParkingSlot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String slotCode;
    private String zone;
    private String vehicleNumber;

    @Enumerated(EnumType.STRING)
    private SlotStatus status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "location_id")
    private ParkingLocation location;
}