package com.trustmart.trustmart.auth.dto.request;

public record RegistrationRequest(
        String name,
        String address,
        String email,
        String password
) {
}
