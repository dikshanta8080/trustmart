package com.trustmart.trustmart.auth.dto.request;

import jakarta.validation.constraints.NotBlank;

public record RoleCreateRequest(
        @NotBlank(message = "role name can not be blank") String name
) {
}
