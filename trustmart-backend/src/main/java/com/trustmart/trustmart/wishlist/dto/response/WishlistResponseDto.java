package com.trustmart.trustmart.wishlist.dto.response;

import com.trustmart.trustmart.product.enums.ProductStatus;
import lombok.Builder;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Builder
public record WishlistResponseDto(
        UUID wishlistId,
        UUID productId,
        String productTitle,
        String productDescription,
        BigDecimal productPrice,
        ProductStatus productStatus,
        String productLocation,
        String imageUrl,
        UUID sellerId,
        String sellerName,
        LocalDateTime createdAt
) {
}
