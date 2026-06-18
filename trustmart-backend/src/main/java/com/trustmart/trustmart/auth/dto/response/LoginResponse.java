package com.trustmart.trustmart.auth.dto.response;

import lombok.*;

import java.util.Set;
import java.util.UUID;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {

    private UUID id;
    private String name;
    private String address;
    private String email;
    private String token;
    private Set<RoleResponse> roles;

    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class RoleResponse {

        private UUID id;
        private String name;
    }
}