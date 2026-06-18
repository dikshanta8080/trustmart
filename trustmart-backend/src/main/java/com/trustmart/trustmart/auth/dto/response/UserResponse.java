package com.trustmart.trustmart.auth.dto.response;

import lombok.Builder;

import java.util.Set;
import java.util.UUID;

@Builder
public record UserResponse(
        UUID id,
        String name,
        String address,
        String email,
        Set<RoleResponse> roles

) {
    @Builder
    public record RoleResponse(
            UUID id,
            String name
    ) {

    }
}
