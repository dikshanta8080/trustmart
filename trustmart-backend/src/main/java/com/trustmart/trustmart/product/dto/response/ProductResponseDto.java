package com.trustmart.trustmart.product.dto.response;

import com.trustmart.trustmart.product.enums.ProductCondition;
import com.trustmart.trustmart.product.enums.ProductStatus;
import lombok.Builder;

import java.math.BigDecimal;
import java.util.UUID;

@Builder
public record ProductResponseDto(
        UUID id,
        String title,
        String description,
        BigDecimal price,
        ProductCondition condition,
        String location,
        ProductStatus status,
        String imageUrl
) {
}
