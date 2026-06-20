package com.trustmart.trustmart.product.dto.response;

import lombok.Builder;

import java.util.UUID;

@Builder
public record ImageDataResponse(
        UUID imageId,
        String name
) {
}
