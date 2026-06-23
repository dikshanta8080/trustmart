package com.trustmart.trustmart.chat.dto;

import java.util.UUID;

public record ChatRoomRequest(
        UUID userId,
        UUID productId


) {
}
