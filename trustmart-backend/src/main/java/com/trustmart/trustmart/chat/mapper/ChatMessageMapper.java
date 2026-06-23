package com.trustmart.trustmart.chat.mapper;

import com.trustmart.trustmart.chat.dto.ChatMessageResponse;
import com.trustmart.trustmart.chat.model.ChatMessage;

public class ChatMessageMapper {
    public static ChatMessageResponse toResponse(ChatMessage chatMessage) {
        return ChatMessageResponse.builder()
                .chatRoomId(chatMessage.getChatRoom().getId())
                .senderId(chatMessage.getSender().getId())
                .message(chatMessage.getMessage())
                .id(chatMessage.getId())
                .build();
    }
}
