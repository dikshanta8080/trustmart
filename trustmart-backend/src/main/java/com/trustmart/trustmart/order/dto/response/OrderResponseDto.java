package com.trustmart.trustmart.order.dto.response;

import com.trustmart.trustmart.order.enums.OrderStatus;
import lombok.Builder;

import java.math.BigDecimal;
import java.util.UUID;

@Builder
public record OrderResponseDto(
        UUID id,
        UUID productId,
        String productTitle,
        UUID buyerId,
        String buyerName,
        UUID sellerId,
        String sellerName,
        BigDecimal price,
        OrderStatus status
) {
}
