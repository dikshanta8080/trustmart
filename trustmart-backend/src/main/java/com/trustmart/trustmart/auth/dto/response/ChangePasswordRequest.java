package com.trustmart.trustmart.auth.dto.response;

import jakarta.validation.constraints.NotBlank;

public record ChangePasswordRequest(
        @NotBlank(message = "Email can not be blank") String email,
        @NotBlank(message = "otp can not be blank") String otp,
        @NotBlank(message = "password can not be blank") String newPassword
) {
}
