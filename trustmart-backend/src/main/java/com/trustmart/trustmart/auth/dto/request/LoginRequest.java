package com.trustmart.trustmart.auth.dto.request;

import jakarta.validation.constraints.NotBlank;

public record LoginRequest(
        @NotBlank(message = "email can not be blank") String email,
        @NotBlank(message = "password can not be blank") String password
) {
}
