package com.trustmart.trustmart.wishlist.repository;

import com.trustmart.trustmart.wishlist.model.Wishlist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface WishlistRepository extends JpaRepository<Wishlist, UUID> {

    boolean existsByUserIdAndProductId(UUID userId, UUID productId);

    Optional<Wishlist> findByUserIdAndProductId(UUID userId, UUID productId);

    List<Wishlist> findByUserId(UUID userId);
}
