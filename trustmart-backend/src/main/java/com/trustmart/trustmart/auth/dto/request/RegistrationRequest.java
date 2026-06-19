package com.trustmart.trustmart.auth.dto.request;

import jakarta.validation.constraints.NotBlank;

public record RegistrationRequest(
        @NotBlank(message = "name can not be blank") String name,
        @NotBlank(message = "address can not be blank") String address,
        @NotBlank(message = "email can not be blank") String email,
        @NotBlank(message = "password can not be blank") String password
) {
}
