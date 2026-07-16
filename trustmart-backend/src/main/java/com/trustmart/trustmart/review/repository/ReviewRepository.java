package com.trustmart.trustmart.review.repository;

import com.trustmart.trustmart.review.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface ReviewRepository extends JpaRepository<Review, UUID> {

    boolean existsByOrderId(UUID orderId);

    List<Review> findBySellerId(UUID sellerId);

    List<Review> findByProductId(UUID productId);

    List<Review> findByReviewerId(UUID reviewerId);

    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.seller.id = :sellerId")
    Double findAverageRatingBySellerId(UUID sellerId);

    Long countBySellerId(UUID sellerId);
}
