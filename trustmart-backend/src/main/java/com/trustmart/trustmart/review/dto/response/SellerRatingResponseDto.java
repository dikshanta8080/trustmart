package com.trustmart.trustmart.review.dto.response;

import lombok.Builder;

import java.util.UUID;

@Builder
public record SellerRatingResponseDto(
        UUID sellerId,
        String sellerName,
        Double averageRating,
        Long totalReviews
) {
}
