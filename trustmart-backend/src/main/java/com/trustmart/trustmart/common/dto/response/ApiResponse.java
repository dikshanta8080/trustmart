package com.trustmart.trustmart.common.dto.response;

import lombok.Builder;

@Builder
public record ApiResponse<T>(
        boolean success,
        String message,
        T data
) {
    public static <T> ApiResponse<T> success(T data, String message) {
        return new ApiResponse<T>(
                true,
                message,
                data);
    }

    public static <T> ApiResponse<T> error(String message) {
        return new ApiResponse<T>(
                false,
                message,
                null);
    }
}
