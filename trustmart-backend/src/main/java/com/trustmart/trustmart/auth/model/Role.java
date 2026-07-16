package com.trustmart.trustmart.auth.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Set;

@AllArgsConstructor
@Getter
public enum Role {
    ADMIN(Set.of(
            Permission.PRODUCT_ADD,
            Permission.PRODUCT_UPDATE,
            Permission.GREET_ADMIN,
            Permission.USER_VIEW,
            Permission.ALL_USER_VIEW,
            Permission.USER_UPDATE,
            Permission.USER_DELETE,
            Permission.PROFILE_UPDATE,
            Permission.CATEGORY_VIEW
            Permission.CATEGORY_ADD,
            Permission.CATEGORY_UPDATE,
            Permission.CATEGORY_DELETE
            Permission.CATEGORY_VIEW,
            Permission.CATEGORY_ADD,
            Permission.CATEGORY_UPDATE,
            Permission.CATEGORY_DELETE,
            Permission.ORDER_CREATE,
            Permission.ORDER_VIEW,
            Permission.ORDER_ACCEPT,
            Permission.ORDER_REJECT,
            Permission.ORDER_CANCEL,
            Permission.ORDER_COMPLETE,
            Permission.WISHLIST_ADD,
            Permission.WISHLIST_VIEW,
            Permission.WISHLIST_REMOVE,
            Permission.REVIEW_CREATE,
            Permission.REVIEW_VIEW,
            Permission.REVIEW_DELETE

    )), USER(Set.of(
            Permission.PRODUCT_ADD,
            Permission.PRODUCT_VIEW,
            Permission.PRODUCT_UPDATE,
            Permission.USER_VIEW,
            Permission.USER_UPDATE,
            Permission.PROFILE_UPDATE,
            Permission.CATEGORY_VIEW,
            Permission.CATEGORY_ADD
            Permission.CATEGORY_ADD,
            Permission.ORDER_CREATE,
            Permission.ORDER_VIEW,
            Permission.ORDER_ACCEPT,
            Permission.ORDER_REJECT,
            Permission.ORDER_CANCEL,
            Permission.ORDER_COMPLETE,
            Permission.WISHLIST_ADD,
            Permission.WISHLIST_VIEW,
            Permission.WISHLIST_REMOVE,
            Permission.REVIEW_CREATE,
            Permission.REVIEW_VIEW,
            Permission.REVIEW_DELETE
    ));

    private final Set<Permission> permissions;
}
