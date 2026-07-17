package com.trustmart.trustmart.chat.controller;

import com.trustmart.trustmart.chat.dto.ChatMessageRequest;
import com.trustmart.trustmart.chat.dto.ChatMessageResponse;
import com.trustmart.trustmart.chat.dto.ChatRoomRequest;
import com.trustmart.trustmart.chat.dto.ChatRoomResponse;
import com.trustmart.trustmart.chat.service.ChatMessageService;
import com.trustmart.trustmart.chat.service.ChatRoomService;
import com.trustmart.trustmart.common.dto.response.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@RestController
@RequestMapping("/chat")
public class ChatController {
    private final ChatRoomService chatRoomService;
    private final ChatMessageService chatMessageService;

    @PostMapping
    public ResponseEntity<ApiResponse<ChatRoomResponse>> getOrCreateRoom(@RequestBody @Valid ChatRoomRequest request) {
        ChatRoomResponse chatRoom = chatRoomService.getOrCreateRoom(request);
        return ResponseEntity.ok().body(ApiResponse.success(chatRoom, "Room fetched"));
    }

    @GetMapping("/{roomId}")
    public ResponseEntity<ApiResponse<List<ChatMessageResponse>>> getAllMessages(@PathVariable UUID roomId) {
        List<ChatMessageResponse> chatMessages = chatMessageService.getAll(roomId);
        return ResponseEntity.ok().body(ApiResponse.success(chatMessages, "Chat messages fetched"));
    }

    @MessageMapping("/chat.send")
    public void sendMessage(@Payload ChatMessageRequest request, Principal principal) {
        chatMessageService.saveChat(request, principal.getName());
    }
}

