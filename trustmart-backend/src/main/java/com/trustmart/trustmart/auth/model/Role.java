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
            Permission.PROFILE_UPDATE

    )), USER(Set.of(
            Permission.PRODUCT_ADD,
            Permission.PRODUCT_VIEW,
            Permission.PRODUCT_UPDATE,
            Permission.USER_VIEW,
            Permission.USER_UPDATE,
            Permission.PROFILE_UPDATE,
            Permission.CATEGORY_VIEW,
            Permission.CATEGORY_ADD
    ));

    private final Set<Permission> permissions;
}
