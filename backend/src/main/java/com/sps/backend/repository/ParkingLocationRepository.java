package com.sps.backend.repository;

import com.sps.backend.entity.ParkingLocation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ParkingLocationRepository extends JpaRepository<ParkingLocation, Long> {

    List<ParkingLocation> findByAreaContainingIgnoreCase(String area);
}