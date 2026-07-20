package com.trustmart.trustmart.chat.dto;

import lombok.Builder;

import java.util.UUID;

@Builder
public record ChatMessageResponse(
        UUID chatRoomId,
        UUID senderId,
        String message,
        UUID id
) {
}
