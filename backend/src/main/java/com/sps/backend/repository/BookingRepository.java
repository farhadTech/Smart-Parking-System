package com.sps.backend.repository;

import com.sps.backend.entity.Booking;
import com.sps.backend.entity.BookingStatus;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByUserEmailOrderByCreatedAtDesc(String email);

    List<Booking> findByUserEmailAndStatus(String email, BookingStatus status);

    Optional<Booking> findByBookingCode(String bookingCode);
}