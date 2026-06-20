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

    ALL_USER_VIEW,
    USER_VIEW,
    USER_UPDATE,
    USER_DELETE,
    PROFILE_UPDATE;


}
