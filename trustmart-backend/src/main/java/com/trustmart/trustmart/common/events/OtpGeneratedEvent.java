package com.trustmart.trustmart.common.events;

import lombok.Builder;

import java.time.Instant;

@Builder
public record OtpGeneratedEvent(
        String otp,
        Instant expiry,
        String email
) {
}
