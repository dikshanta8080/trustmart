package com.trustmart.trustmart.auth.mapper;

import com.trustmart.trustmart.auth.dto.request.RegistrationRequest;
import com.trustmart.trustmart.auth.dto.response.LoginResponse;
import com.trustmart.trustmart.auth.dto.response.UserResponse;
import com.trustmart.trustmart.auth.model.User;
import com.trustmart.trustmart.common.dto.response.ImageDataResponse;


public class UserMapper {
    public static UserResponse toResponse(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .address(user.getAddress())
                .email(user.getEmail())
                .imageDataResponse(getImageData(user))
                .role(user.getRole())
                .build();
    }

    public static LoginResponse toLoginResponse(User user, String jwt) {
        return LoginResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .address(user.getAddress())
                .email(user.getEmail())
                .token(jwt)
                .role(user.getRole())
                .build();
    }

    public static User toEntity(RegistrationRequest request) {
        return User.builder()
                .name(request.name())
                .email(request.email())
                .address(request.address())
                .build();
    }

    private static ImageDataResponse getImageData(User user) {
        if (user.getImageData() == null) {
            return null;
        }
        return ImageDataResponse.builder()
                .imageId(user.getImageData()
                        .getId())
                .name(user.getImageData().getFileName())
                .imagePath("http://localhost:8080/api/v1/uploads/" + user.getImageData().getFileName())
                .build();
    }
}
