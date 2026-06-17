package com.trustmart.trustmart.product.dto.responseDto;

import com.trustmart.trustmart.product.enums.ProductCondition;
import com.trustmart.trustmart.product.enums.ProductStatus;
import lombok.Builder;

import java.math.BigDecimal;

@Builder
public record ProductResponseDto(
        Long id,
        String title,
        String description,
        BigDecimal price,
        ProductCondition condition,
        String location,
        ProductStatus status
) {
}
