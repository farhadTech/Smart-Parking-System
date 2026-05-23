package com.sps.backend.repository;

import com.sps.backend.entity.Payment;
import com.sps.backend.entity.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

    List<Payment> findByUserEmailOrderByPaidAtDesc(String email);

    List<Payment> findByStatus(PaymentStatus status);

    Optional<Payment> findByBookingId(Long bookingId);
}