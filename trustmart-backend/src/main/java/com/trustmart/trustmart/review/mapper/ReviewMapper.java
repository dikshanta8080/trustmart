package com.trustmart.trustmart.review.mapper;

import com.trustmart.trustmart.review.dto.response.ReviewResponseDto;
import com.trustmart.trustmart.review.model.Review;

public class ReviewMapper {

    public static ReviewResponseDto toResponse(Review review) {
        return ReviewResponseDto.builder()
                .id(review.getId())
                .rating(review.getRating())
                .comment(review.getComment())

                .reviewerId(review.getReviewer().getId())
                .reviewerName(review.getReviewer().getName())

                .sellerId(review.getSeller().getId())
                .sellerName(review.getSeller().getName())

                .productId(review.getProduct().getId())
                .productTitle(review.getProduct().getTitle())

                .orderId(review.getOrder().getId())
                .createdAt(review.getCreatedAt())
                .build();
    }
}
