package com.trustmart.trustmart.auth.dto.response;

import lombok.Builder;

import java.time.Instant;

@Builder
public record OtpResponse(
        String otp,
        Instant expiry
) {
}
