package com.trustmart.trustmart.auth.dto.response;

import com.trustmart.trustmart.auth.model.Role;
import lombok.Builder;

import java.util.UUID;

@Builder
public record UserResponse(
        UUID id,
        String name,
        String address,
        String email,
        Role role

) {

}
