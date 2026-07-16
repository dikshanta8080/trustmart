package com.trustmart.trustmart.chat.dto;

import java.util.UUID;

public record ChatMessageRequest(
        UUID roomId,
        String message
) {
}
