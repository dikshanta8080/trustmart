package com.trustmart.trustmart.wishlist.service;

import com.trustmart.trustmart.auth.model.User;
import com.trustmart.trustmart.auth.model.UserPrinciple;
import com.trustmart.trustmart.auth.repository.UserRepository;
import com.trustmart.trustmart.product.model.Product;
import com.trustmart.trustmart.product.repository.ProductRepository;
import com.trustmart.trustmart.wishlist.dto.response.WishlistResponseDto;
import com.trustmart.trustmart.wishlist.mapper.WishlistMapper;
import com.trustmart.trustmart.wishlist.model.Wishlist;
import com.trustmart.trustmart.wishlist.repository.WishlistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class WishlistService {

    private final WishlistRepository wishlistRepository;
    private final ProductRepository productRepository;
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
    public WishlistResponseDto addToWishlist(UUID productId) {
        User currentUser = getCurrentUser();

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        if (product.getSeller().getId().equals(currentUser.getId())) {
            throw new RuntimeException("You cannot add your own product to wishlist");
        }

        boolean alreadyExists = wishlistRepository.existsByUserIdAndProductId(
                currentUser.getId(),
                productId
        );

        if (alreadyExists) {
            throw new RuntimeException("Product already exists in wishlist");
        }

        Wishlist wishlist = Wishlist.builder()
                .user(currentUser)
                .product(product)
                .build();

        Wishlist savedWishlist = wishlistRepository.save(wishlist);

        return WishlistMapper.toResponse(savedWishlist);
    }

    @Transactional(readOnly = true)
    public List<WishlistResponseDto> getMyWishlist() {
        User currentUser = getCurrentUser();

        return wishlistRepository.findByUserId(currentUser.getId())
                .stream()
                .map(WishlistMapper::toResponse)
                .toList();
    }

    @Transactional
    public void removeFromWishlist(UUID productId) {
        User currentUser = getCurrentUser();

        Wishlist wishlist = wishlistRepository
                .findByUserIdAndProductId(currentUser.getId(), productId)
                .orElseThrow(() -> new RuntimeException("Product not found in wishlist"));

        wishlistRepository.delete(wishlist);
    }

    @Transactional(readOnly = true)
    public boolean isProductInMyWishlist(UUID productId) {
        User currentUser = getCurrentUser();

        return wishlistRepository.existsByUserIdAndProductId(
                currentUser.getId(),
                productId
        );
    }
}
