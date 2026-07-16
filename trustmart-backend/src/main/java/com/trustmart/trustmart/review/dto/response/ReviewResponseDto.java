package com.trustmart.trustmart.review.dto.response;

import lombok.Builder;

import java.time.LocalDateTime;
import java.util.UUID;

@Builder
public record ReviewResponseDto(
        UUID id,
        Integer rating,
        String comment,

        UUID reviewerId,
        String reviewerName,

        UUID sellerId,
        String sellerName,

        UUID productId,
        String productTitle,

        UUID orderId,
        LocalDateTime createdAt
) {
}
