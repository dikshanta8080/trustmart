package com.trustmart.trustmart.wishlist.mapper;

import com.trustmart.trustmart.common.model.ImageData;
import com.trustmart.trustmart.product.model.Product;
import com.trustmart.trustmart.wishlist.dto.response.WishlistResponseDto;
import com.trustmart.trustmart.wishlist.model.Wishlist;

public class WishlistMapper {

    public static WishlistResponseDto toResponse(Wishlist wishlist) {
        Product product = wishlist.getProduct();

        return WishlistResponseDto.builder()
                .wishlistId(wishlist.getId())
                .productId(product.getId())
                .productTitle(product.getTitle())
                .productDescription(product.getDescription())
                .productPrice(product.getPrice())
                .productStatus(product.getStatus())
                .productLocation(product.getLocation())
                .imageUrl(getFirstImageUrl(product))
                .sellerId(product.getSeller().getId())
                .sellerName(product.getSeller().getName())
                .createdAt(wishlist.getCreatedAt())
                .build();
    }

    private static String getFirstImageUrl(Product product) {
        if (product.getImageData() == null || product.getImageData().isEmpty()) {
            return null;
        }

        ImageData imageData = product.getImageData().get(0);

        return "http://localhost:8080/api/v1/uploads/" + imageData.getFileName();
    }
}
