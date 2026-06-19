package com.trustmart.trustmart.auth.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Set;

@AllArgsConstructor
@Getter
public enum Role {
    ADMIN(Set.of(
            Permission.PRODUCT_ADD,
            Permission.PRODUCT_VIEW,
            Permission.PRODUCT_UPDATE

    )), USER(Set.of(
            Permission.PRODUCT_ADD,
            Permission.PRODUCT_VIEW,
            Permission.PRODUCT_UPDATE
    ));

    private final Set<Permission> permissions;
}
