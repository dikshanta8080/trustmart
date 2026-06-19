package com.trustmart.trustmart.common.dto.request;

import java.math.BigDecimal;

public record ProductFilterRequest(
        String keyword,
        BigDecimal minPrice,
        BigDecimal maxPrice,
        String productCondition,
        String category,
        String location
) {
}
