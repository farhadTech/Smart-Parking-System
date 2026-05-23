package com.sps.backend.controller;

import com.sps.backend.dto.BookingResponse;
import com.sps.backend.dto.CreateBookingRequest;
import com.sps.backend.service.BookingService;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    @PostMapping
    public BookingResponse createBooking(
            Authentication authentication,
            @Valid @RequestBody CreateBookingRequest request
    ) {
        return bookingService.createBooking(authentication.getName(), request);
    }

    @GetMapping("/my")
    public List<BookingResponse> getMyBookings(Authentication authentication) {
        return bookingService.getMyBookings(authentication.getName());
    }

    @GetMapping("/my/active")
    public List<BookingResponse> getMyActiveBookings(Authentication authentication) {
        return bookingService.getMyActiveBookings(authentication.getName());
    }

    @PatchMapping("/{id}/cancel")
    public BookingResponse cancelBooking(
            Authentication authentication,
            @PathVariable Long id
    ) {
        return bookingService.cancelBooking(authentication.getName(), id);
    }

    @GetMapping("/admin/all")
    public List<BookingResponse> getAllBookings() {
        return bookingService.getAllBookings();
    }

    @PatchMapping("/admin/{id}/complete")
    public BookingResponse completeBooking(@PathVariable Long id) {
        return bookingService.completeBooking(id);
    }
}