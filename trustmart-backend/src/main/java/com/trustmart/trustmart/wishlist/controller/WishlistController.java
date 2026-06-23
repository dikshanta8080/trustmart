package com.trustmart.trustmart.wishlist.controller;

import com.trustmart.trustmart.common.dto.response.ApiResponse;
import com.trustmart.trustmart.wishlist.dto.response.WishlistResponseDto;
import com.trustmart.trustmart.wishlist.service.WishlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/wishlist")
@RequiredArgsConstructor
public class WishlistController {

    private final WishlistService wishlistService;

    @PostMapping("/products/{productId}")
    @PreAuthorize("hasAuthority('WISHLIST_ADD')")
    public ResponseEntity<ApiResponse<WishlistResponseDto>> addToWishlist(
            @PathVariable UUID productId
    ) {
        WishlistResponseDto responseDto = wishlistService.addToWishlist(productId);

        return ResponseEntity.ok(
                ApiResponse.success(responseDto, "Product added to wishlist successfully")
        );
    }

    @GetMapping
    @PreAuthorize("hasAuthority('WISHLIST_VIEW')")
    public ResponseEntity<ApiResponse<List<WishlistResponseDto>>> getMyWishlist() {
        List<WishlistResponseDto> wishlist = wishlistService.getMyWishlist();

        return ResponseEntity.ok(
                ApiResponse.success(wishlist, "Wishlist fetched successfully")
        );
    }

    @DeleteMapping("/products/{productId}")
    @PreAuthorize("hasAuthority('WISHLIST_REMOVE')")
    public ResponseEntity<ApiResponse<String>> removeFromWishlist(
            @PathVariable UUID productId
    ) {
        wishlistService.removeFromWishlist(productId);

        return ResponseEntity.ok(
                ApiResponse.success(null, "Product removed from wishlist successfully")
        );
    }

    @GetMapping("/products/{productId}/exists")
    @PreAuthorize("hasAuthority('WISHLIST_VIEW')")
    public ResponseEntity<ApiResponse<Boolean>> isProductInMyWishlist(
            @PathVariable UUID productId
    ) {
        boolean exists = wishlistService.isProductInMyWishlist(productId);

        return ResponseEntity.ok(
                ApiResponse.success(exists, "Wishlist status fetched successfully")
        );
    }
}
