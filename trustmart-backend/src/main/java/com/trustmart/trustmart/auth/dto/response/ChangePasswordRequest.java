package com.trustmart.trustmart.auth.dto.response;

public record ChangePasswordRequest(
        String email,
        String otp,
        String newPassword
) {
}
