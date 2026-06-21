package com.trustmart.trustmart.auth.dto.response;

import com.trustmart.trustmart.auth.model.Role;
import com.trustmart.trustmart.common.dto.response.ImageDataResponse;
import lombok.Builder;

import java.util.UUID;

@Builder
public record LoginResponse(
        UUID id,
        String name,
        String address,
        String email,
        TokenResponse tokenResponse,
        Role role,
        ImageDataResponse imageDataResponse
) {
    @Builder
    public record TokenResponse(
            String accessToken,
            String refreshToken
    ) {

    }
}