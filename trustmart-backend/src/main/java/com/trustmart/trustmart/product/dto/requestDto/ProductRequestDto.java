package com.trustmart.trustmart.product.dto.requestDto;

import com.trustmart.trustmart.product.enums.ProductCondition;
import com.trustmart.trustmart.product.enums.ProductStatus;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;

import java.math.BigDecimal;

@Builder
public record ProductRequestDto(

        @NotBlank(message = "Title is required")
        String title,

        @NotBlank(message = "Description is required")
        String description,

        @NotBlank(message = "Price is required")
        BigDecimal price,

        @NotBlank(message = "Condition is required")
        ProductCondition condition,

        @NotBlank(message = "Location is required")
        String location,

        @NotBlank(message = "Status is required")
        ProductStatus status
) {
}
