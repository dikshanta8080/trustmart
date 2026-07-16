package com.trustmart.trustmart.review.controller;

import com.trustmart.trustmart.common.dto.response.ApiResponse;
import com.trustmart.trustmart.review.dto.request.ReviewRequestDto;
import com.trustmart.trustmart.review.dto.response.ReviewResponseDto;
import com.trustmart.trustmart.review.dto.response.SellerRatingResponseDto;
import com.trustmart.trustmart.review.service.ReviewService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @PostMapping("/orders/{orderId}")
    @PreAuthorize("hasAuthority('REVIEW_CREATE')")
    public ResponseEntity<ApiResponse<ReviewResponseDto>> createReview(
            @PathVariable UUID orderId,
            @Valid @RequestBody ReviewRequestDto requestDto
    ) {
        ReviewResponseDto responseDto = reviewService.createReview(orderId, requestDto);

        return ResponseEntity.ok(
                ApiResponse.success(responseDto, "Review created successfully")
        );
    }

    @GetMapping("/sellers/{sellerId}")
    public ResponseEntity<ApiResponse<List<ReviewResponseDto>>> getSellerReviews(
            @PathVariable UUID sellerId
    ) {
        List<ReviewResponseDto> reviews = reviewService.getSellerReviews(sellerId);

        return ResponseEntity.ok(
                ApiResponse.success(reviews, "Seller reviews fetched successfully")
        );
    }

    @GetMapping("/products/{productId}")
    public ResponseEntity<ApiResponse<List<ReviewResponseDto>>> getProductReviews(
            @PathVariable UUID productId
    ) {
        List<ReviewResponseDto> reviews = reviewService.getProductReviews(productId);

        return ResponseEntity.ok(
                ApiResponse.success(reviews, "Product reviews fetched successfully")
        );
    }

    @GetMapping("/my-reviews")
    @PreAuthorize("hasAuthority('REVIEW_VIEW')")
    public ResponseEntity<ApiResponse<List<ReviewResponseDto>>> getMyReviews() {
        List<ReviewResponseDto> reviews = reviewService.getMyReviews();

        return ResponseEntity.ok(
                ApiResponse.success(reviews, "My reviews fetched successfully")
        );
    }

    @GetMapping("/sellers/{sellerId}/rating")
    public ResponseEntity<ApiResponse<SellerRatingResponseDto>> getSellerRating(
            @PathVariable UUID sellerId
    ) {
        SellerRatingResponseDto rating = reviewService.getSellerRating(sellerId);

        return ResponseEntity.ok(
                ApiResponse.success(rating, "Seller rating fetched successfully")
        );
    }

    @DeleteMapping("/{reviewId}")
    @PreAuthorize("hasAuthority('REVIEW_DELETE')")
    public ResponseEntity<ApiResponse<String>> deleteReview(
            @PathVariable UUID reviewId
    ) {
        reviewService.deleteReview(reviewId);

        return ResponseEntity.ok(
                ApiResponse.success(null, "Review deleted successfully")
        );
    }
}
