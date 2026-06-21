package com.trustmart.trustmart.auth.dto.request;

import jakarta.validation.constraints.NotNull;

public record PermissionCreateRequest(
        @NotNull(message = "name can not be null") String name
) {
}
