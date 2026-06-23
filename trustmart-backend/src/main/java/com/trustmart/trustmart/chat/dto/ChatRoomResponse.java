package com.trustmart.trustmart.chat.dto;

import lombok.Builder;

import java.util.UUID;

@Builder
public record ChatRoomResponse(
        UUID id,
        UUID senderId,
        UUID receiverId,
        UUID productId
) {
}
