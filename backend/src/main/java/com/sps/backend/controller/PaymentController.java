package com.sps.backend.controller;

import com.sps.backend.dto.CreatePaymentRequest;
import com.sps.backend.dto.PaymentResponse;
import com.sps.backend.service.PaymentService;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping
    public PaymentResponse createPayment(
            Authentication authentication,
            @Valid @RequestBody CreatePaymentRequest request
    ) {
        return paymentService.createPayment(authentication.getName(), request);
    }

    @GetMapping("/my")
    public List<PaymentResponse> getMyPayments(Authentication authentication) {
        return paymentService.getMyPayments(authentication.getName());
    }

    @GetMapping("/admin/all")
    public List<PaymentResponse> getAllPayments() {
        return paymentService.getAllPayments();
    }

    @PatchMapping("/admin/{id}/refund")
    public PaymentResponse refundPayment(@PathVariable Long id) {
        return paymentService.refundPayment(id);
    }
}
