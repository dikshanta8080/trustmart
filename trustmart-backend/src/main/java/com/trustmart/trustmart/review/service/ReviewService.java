package com.trustmart.trustmart.review.service;

import com.trustmart.trustmart.auth.model.User;
import com.trustmart.trustmart.auth.model.UserPrinciple;
import com.trustmart.trustmart.auth.repository.UserRepository;
import com.trustmart.trustmart.order.enums.OrderStatus;
import com.trustmart.trustmart.order.model.Order;
import com.trustmart.trustmart.order.repository.OrderRepository;
import com.trustmart.trustmart.review.dto.request.ReviewRequestDto;
import com.trustmart.trustmart.review.dto.response.ReviewResponseDto;
import com.trustmart.trustmart.review.dto.response.SellerRatingResponseDto;
import com.trustmart.trustmart.review.mapper.ReviewMapper;
import com.trustmart.trustmart.review.model.Review;
import com.trustmart.trustmart.review.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;

    private User getCurrentUser() {
        UserPrinciple userPrinciple =
                (UserPrinciple) SecurityContextHolder
                        .getContext()
                        .getAuthentication()
                        .getPrincipal();

        return userRepository.findById(userPrinciple.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Transactional
    public ReviewResponseDto createReview(UUID orderId, ReviewRequestDto requestDto) {
        User currentUser = getCurrentUser();

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if (!order.getBuyer().getId().equals(currentUser.getId())) {
            throw new RuntimeException("Only buyer can review this order");
        }

        if (order.getStatus() != OrderStatus.COMPLETED) {
            throw new RuntimeException("You can review only completed orders");
        }

        if (order.getSeller().getId().equals(currentUser.getId())) {
            throw new RuntimeException("You cannot review yourself");
        }

        boolean alreadyReviewed = reviewRepository.existsByOrderId(orderId);

        if (alreadyReviewed) {
            throw new RuntimeException("Review already exists for this order");
        }

        Review review = Review.builder()
                .rating(requestDto.rating())
                .comment(requestDto.comment())
                .reviewer(currentUser)
                .seller(order.getSeller())
                .product(order.getProduct())
                .order(order)
                .build();

        Review savedReview = reviewRepository.save(review);

        return ReviewMapper.toResponse(savedReview);
    }

    @Transactional(readOnly = true)
    public List<ReviewResponseDto> getSellerReviews(UUID sellerId) {
        return reviewRepository.findBySellerId(sellerId)
                .stream()
                .map(ReviewMapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<ReviewResponseDto> getProductReviews(UUID productId) {
        return reviewRepository.findByProductId(productId)
                .stream()
                .map(ReviewMapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<ReviewResponseDto> getMyReviews() {
        User currentUser = getCurrentUser();

        return reviewRepository.findByReviewerId(currentUser.getId())
                .stream()
                .map(ReviewMapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public SellerRatingResponseDto getSellerRating(UUID sellerId) {
        User seller = userRepository.findById(sellerId)
                .orElseThrow(() -> new RuntimeException("Seller not found"));

        Double averageRating = reviewRepository.findAverageRatingBySellerId(sellerId);
        Long totalReviews = reviewRepository.countBySellerId(sellerId);

        return SellerRatingResponseDto.builder()
                .sellerId(seller.getId())
                .sellerName(seller.getName())
                .averageRating(averageRating == null ? 0.0 : averageRating)
                .totalReviews(totalReviews)
                .build();
    }

    @Transactional
    public void deleteReview(UUID reviewId) {
        User currentUser = getCurrentUser();

        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new RuntimeException("Review not found"));

        if (!review.getReviewer().getId().equals(currentUser.getId())) {
            throw new RuntimeException("You can delete only your own review");
        }

        reviewRepository.delete(review);
    }
}
