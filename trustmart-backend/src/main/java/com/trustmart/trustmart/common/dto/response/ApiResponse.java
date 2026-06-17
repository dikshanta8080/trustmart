package com.trustmart.trustmart.common.dto.response;

import lombok.Builder;

@Builder
public record ApiResponse<T>(
        boolean success,
        String message,
        T data
) {
    public static <T> ApiResponse<T> success(T data) {
        return new ApiResponse<>(
                true,
                "Success",
                data);
    }

    public static <T> ApiResponse<T> error(String message) {
        return new ApiResponse<>(
                false,
                message,
                null);
    }
}
