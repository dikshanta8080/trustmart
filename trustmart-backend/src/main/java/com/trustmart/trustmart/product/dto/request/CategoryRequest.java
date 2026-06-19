package com.trustmart.trustmart.product.dto.request;
import jakarta.validation.constraints.NotNull;

public record CategoryRequest(
        @NotNull(message = "Name is required field.")
        String name,

        @NotNull(message = "Description is required field.")
        String description
) {
}
