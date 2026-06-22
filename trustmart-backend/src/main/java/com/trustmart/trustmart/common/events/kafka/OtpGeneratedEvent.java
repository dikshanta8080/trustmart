package com.trustmart.trustmart.common.events.kafka;

import lombok.Builder;

import java.time.Instant;

@Builder
public record OtpGeneratedEvent(
        String otp,
        Instant expiry,
        String email
) {
}
