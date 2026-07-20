package com.trustmart.trustmart.auth.dto.response;

import com.trustmart.trustmart.auth.model.Role;
import com.trustmart.trustmart.common.dto.response.ImageDataResponse;
import lombok.Builder;

import java.util.UUID;

@Builder
public record UserResponse(
        UUID id,
        String name,
        String address,
        String email,
        Role role,
        ImageDataResponse imageDataResponse

) {

}
