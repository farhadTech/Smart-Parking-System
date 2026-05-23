package com.sps.backend.service;

import com.sps.backend.dto.BookingResponse;
import com.sps.backend.dto.CreateBookingRequest;
import com.sps.backend.entity.*;
import com.sps.backend.repository.BookingRepository;
import com.sps.backend.repository.ParkingLocationRepository;
import com.sps.backend.repository.ParkingSlotRepository;
import com.sps.backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final ParkingLocationRepository locationRepository;
    private final ParkingSlotRepository slotRepository;

    @Transactional
    public BookingResponse createBooking(String userEmail, CreateBookingRequest request) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        ParkingLocation location = locationRepository.findById(request.getLocationId())
                .orElseThrow(() -> new RuntimeException("Parking location not found"));

        ParkingSlot slot = slotRepository.findById(request.getSlotId())
                .orElseThrow(() -> new RuntimeException("Parking slot not found"));

        if (!slot.getLocation().getId().equals(location.getId())) {
            throw new RuntimeException("This slot does not belong to the selected location");
        }

        if (slot.getStatus() != SlotStatus.AVAILABLE) {
            throw new RuntimeException("This slot is not available");
        }

        if (request.getDurationHours() <= 0) {
            throw new RuntimeException("Duration must be greater than 0");
        }

        double amount = location.getPricePerHour() * request.getDurationHours();

        LocalDateTime now = LocalDateTime.now();

        Booking booking = Booking.builder()
                .bookingCode(generateBookingCode())
                .user(user)
                .location(location)
                .slot(slot)
                .vehicleNumber(request.getVehicleNumber())
                .durationHours(request.getDurationHours())
                .amount(amount)
                .startTime(now)
                .endTime(now.plusHours(request.getDurationHours()))
                .createdAt(now)
                .status(BookingStatus.ACTIVE)
                .build();

        slot.setStatus(SlotStatus.OCCUPIED);
        slot.setVehicleNumber(request.getVehicleNumber());

        updateLocationCounts(location);

        slotRepository.save(slot);
        locationRepository.save(location);

        Booking savedBooking = bookingRepository.save(booking);

        return toBookingResponse(savedBooking);
    }

    public List<BookingResponse> getMyBookings(String userEmail) {
        return bookingRepository.findByUserEmailOrderByCreatedAtDesc(userEmail)
                .stream()
                .map(this::toBookingResponse)
                .toList();
    }

    public List<BookingResponse> getMyActiveBookings(String userEmail) {
        return bookingRepository.findByUserEmailAndStatus(userEmail, BookingStatus.ACTIVE)
                .stream()
                .map(this::toBookingResponse)
                .toList();
    }

    public List<BookingResponse> getAllBookings() {
        return bookingRepository.findAll()
                .stream()
                .map(this::toBookingResponse)
                .toList();
    }

    @Transactional
    public BookingResponse cancelBooking(String userEmail, Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        if (!booking.getUser().getEmail().equals(userEmail)) {
            throw new RuntimeException("You cannot cancel another user's booking");
        }

        if (booking.getStatus() == BookingStatus.COMPLETED) {
            throw new RuntimeException("Completed booking cannot be cancelled");
        }

        if (booking.getStatus() == BookingStatus.CANCELLED) {
            throw new RuntimeException("Booking is already cancelled");
        }

        booking.setStatus(BookingStatus.CANCELLED);

        ParkingSlot slot = booking.getSlot();
        ParkingLocation location = booking.getLocation();

        slot.setStatus(SlotStatus.AVAILABLE);
        slot.setVehicleNumber(null);

        updateLocationCounts(location);

        slotRepository.save(slot);
        locationRepository.save(location);

        return toBookingResponse(bookingRepository.save(booking));
    }

    @Transactional
    public BookingResponse completeBooking(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        if (booking.getStatus() == BookingStatus.COMPLETED) {
            throw new RuntimeException("Booking is already completed");
        }

        booking.setStatus(BookingStatus.COMPLETED);

        ParkingSlot slot = booking.getSlot();
        ParkingLocation location = booking.getLocation();

        slot.setStatus(SlotStatus.AVAILABLE);
        slot.setVehicleNumber(null);

        updateLocationCounts(location);

        slotRepository.save(slot);
        locationRepository.save(location);

        return toBookingResponse(bookingRepository.save(booking));
    }

    private void updateLocationCounts(ParkingLocation location) {
        List<ParkingSlot> slots = slotRepository.findByLocationId(location.getId());

        int available = (int) slots.stream()
                .filter(slot -> slot.getStatus() == SlotStatus.AVAILABLE)
                .count();

        int occupied = (int) slots.stream()
                .filter(slot -> slot.getStatus() == SlotStatus.OCCUPIED)
                .count();

        int reserved = (int) slots.stream()
                .filter(slot -> slot.getStatus() == SlotStatus.RESERVED)
                .count();

        location.setTotalSlots(slots.size());
        location.setAvailableSlots(available);
        location.setOccupiedSlots(occupied);
        location.setReservedSlots(reserved);
    }

    private String generateBookingCode() {
        return "BK-" + UUID.randomUUID()
                .toString()
                .substring(0, 8)
                .toUpperCase();
    }

    private BookingResponse toBookingResponse(Booking booking) {
        return BookingResponse.builder()
                .id(booking.getId())
                .bookingCode(booking.getBookingCode())

                .userName(booking.getUser().getFullName())
                .userEmail(booking.getUser().getEmail())

                .locationId(booking.getLocation().getId())
                .locationName(booking.getLocation().getName())
                .locationArea(booking.getLocation().getArea())
                .locationAddress(booking.getLocation().getAddress())

                .slotId(booking.getSlot().getId())
                .slotCode(booking.getSlot().getSlotCode())
                .zone(booking.getSlot().getZone())

                .vehicleNumber(booking.getVehicleNumber())
                .durationHours(booking.getDurationHours())
                .amount(booking.getAmount())

                .startTime(booking.getStartTime())
                .endTime(booking.getEndTime())
                .createdAt(booking.getCreatedAt())

                .status(booking.getStatus())
                .build();
    }
}