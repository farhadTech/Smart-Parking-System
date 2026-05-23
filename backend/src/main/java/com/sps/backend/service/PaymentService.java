package com.sps.backend.service;

import com.sps.backend.dto.CreatePaymentRequest;
import com.sps.backend.dto.PaymentResponse;
import com.sps.backend.entity.*;
import com.sps.backend.repository.BookingRepository;
import com.sps.backend.repository.PaymentRepository;
import com.sps.backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;

    @Transactional
    public PaymentResponse createPayment(String userEmail, CreatePaymentRequest request) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Booking booking = bookingRepository.findById(request.getBookingId())
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        if (!booking.getUser().getEmail().equals(userEmail) && user.getRole() != Role.ADMIN) {
            throw new RuntimeException("You cannot pay for another user's booking");
        }

        paymentRepository.findByBookingId(booking.getId()).ifPresent(existing -> {
            if (existing.getStatus() == PaymentStatus.PAID) {
                throw new RuntimeException("This booking is already paid");
            }
        });

        Payment payment = Payment.builder()
                .transactionId(generateTransactionId())
                .booking(booking)
                .user(booking.getUser())
                .amount(booking.getAmount())
                .method(request.getMethod())
                .status(PaymentStatus.PAID)
                .paidAt(LocalDateTime.now())
                .build();

        return toPaymentResponse(paymentRepository.save(payment));
    }

    public List<PaymentResponse> getMyPayments(String userEmail) {
        return paymentRepository.findByUserEmailOrderByPaidAtDesc(userEmail)
                .stream()
                .map(this::toPaymentResponse)
                .toList();
    }

    public List<PaymentResponse> getAllPayments() {
        return paymentRepository.findAll()
                .stream()
                .map(this::toPaymentResponse)
                .toList();
    }

    @Transactional
    public PaymentResponse refundPayment(Long paymentId) {
        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new RuntimeException("Payment not found"));

        if (payment.getStatus() == PaymentStatus.REFUNDED) {
            throw new RuntimeException("Payment already refunded");
        }

        payment.setStatus(PaymentStatus.REFUNDED);

        return toPaymentResponse(paymentRepository.save(payment));
    }

    private String generateTransactionId() {
        return "TXN-" + UUID.randomUUID()
                .toString()
                .substring(0, 10)
                .toUpperCase();
    }

    private PaymentResponse toPaymentResponse(Payment payment) {
        Booking booking = payment.getBooking();

        return PaymentResponse.builder()
                .id(payment.getId())
                .transactionId(payment.getTransactionId())

                .bookingId(booking.getId())
                .bookingCode(booking.getBookingCode())

                .userName(payment.getUser().getFullName())
                .userEmail(payment.getUser().getEmail())

                .locationName(booking.getLocation().getName())
                .slotCode(booking.getSlot().getSlotCode())
                .vehicleNumber(booking.getVehicleNumber())

                .amount(payment.getAmount())
                .method(payment.getMethod())
                .status(payment.getStatus())
                .paidAt(payment.getPaidAt())
                .build();
    }
}