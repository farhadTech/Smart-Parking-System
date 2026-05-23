package com.sps.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "parking_locations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ParkingLocation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    @Enumerated(EnumType.STRING)
    private HeatLevel heatLevel;

    @OneToMany(
            mappedBy = "location",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<ParkingSlot> slots = new ArrayList<>();
}