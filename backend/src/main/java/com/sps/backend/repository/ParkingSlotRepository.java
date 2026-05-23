package com.sps.backend.repository;

import com.sps.backend.entity.ParkingSlot;
import com.sps.backend.entity.SlotStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ParkingSlotRepository extends JpaRepository<ParkingSlot, Long> {

    List<ParkingSlot> findByLocationId(Long locationId);

    List<ParkingSlot> findByLocationIdAndStatus(Long locationId, SlotStatus status);
}