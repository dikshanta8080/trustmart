package com.trustmart.trustmart.auth.mapper;

import com.trustmart.trustmart.auth.dto.request.RegistrationRequest;
import com.trustmart.trustmart.auth.dto.response.UserResponse;
import com.trustmart.trustmart.auth.model.User;

import java.util.Set;
import java.util.stream.Collectors;

public class UserMapper {
    public static UserResponse toResponse(User user) {
        Set<UserResponse.RoleResponse> roleResponse =
                user.getRoles()
                        .stream()
                        .map(role -> UserResponse.RoleResponse
                                .builder()
                                .id(role.getId())
                                .name(role.getName())
                                .build())
                        .collect(Collectors.toSet());
        return UserResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .address(user.getAddress())
                .email(user.getEmail())
                .roles(roleResponse)
                .build();
    }

    public static User toEntity(RegistrationRequest request) {
        return User.builder()
                .name(request.name())
                .email(request.email())
                .address(request.address())
                .build();
    }
}
