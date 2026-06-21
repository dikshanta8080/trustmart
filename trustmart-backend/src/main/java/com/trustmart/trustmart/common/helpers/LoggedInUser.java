package com.trustmart.trustmart.common.helpers;

import com.trustmart.trustmart.auth.model.UserPrinciple;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Transactional
public class LoggedInUser {
    public static UUID getLoggedInUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserPrinciple principal = (UserPrinciple) authentication.getPrincipal();
        return principal.getId();
    }
}
