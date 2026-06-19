package com.trustmart.trustmart.auth.dto.response;

import com.trustmart.trustmart.auth.model.Role;
import lombok.Builder;

import java.util.UUID;

@Builder
public record LoginResponse(
        UUID id,
        String name,
        String address,
        String email,
        String token,
        Role role
) {
}