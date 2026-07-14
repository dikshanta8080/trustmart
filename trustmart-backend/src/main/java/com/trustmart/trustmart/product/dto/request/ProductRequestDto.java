package com.trustmart.trustmart.product.dto.request;

import com.trustmart.trustmart.product.enums.ProductCondition;
import com.trustmart.trustmart.product.enums.ProductStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

import java.math.BigDecimal;
import java.util.UUID;

@Builder
public record ProductRequestDto(

        @NotBlank(message = "Title is required")
        String title,

        @NotBlank(message = "Description is required")
        String description,

        @NotNull(message = "Price is required")
        BigDecimal price,

        @NotNull(message = "Condition is required")
        ProductCondition condition,

        @NotBlank(message = "Location is required")
        String location,

        @NotNull(message = "Status is required")
        ProductStatus status,

        @NotNull(message = "Category Id is required")
        UUID categoryId
) {
}
