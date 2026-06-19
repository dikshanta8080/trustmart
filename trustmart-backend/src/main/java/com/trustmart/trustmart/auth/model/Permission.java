package com.trustmart.trustmart.auth.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Permission {
    PRODUCT_ADD,
    PRODUCT_VIEW,
    GREET_ADMIN,
    PRODUCT_UPDATE,
    PRODUCT_DELETE,

    ALL_USER_VIEW,
    USER_VIEW,
    USER_UPDATE,
    USER_DELETE,

    CATEGORY_ADD,
    CATEGORY_VIEW,
    CATEGORY_UPDATE,
    CATEGORY_DELETE

}
