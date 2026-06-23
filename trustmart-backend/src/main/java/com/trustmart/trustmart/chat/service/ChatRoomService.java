package com.trustmart.trustmart.chat.service;

import com.trustmart.trustmart.auth.model.User;
import com.trustmart.trustmart.auth.repository.UserRepository;
import com.trustmart.trustmart.chat.dto.ChatRoomRequest;
import com.trustmart.trustmart.chat.dto.ChatRoomResponse;
import com.trustmart.trustmart.chat.model.ChatRoom;
import com.trustmart.trustmart.chat.repository.ChatRoomRepo;
import com.trustmart.trustmart.common.exceptions.ResourceNotFoundException;
import com.trustmart.trustmart.common.helpers.LoggedInUser;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ChatRoomService {
    private final ChatRoomRepo chatRoomRepo;
    private final UserRepository userRepository;

    @Transactional
    public ChatRoomResponse getOrCreateRoom(ChatRoomRequest request) {
        User receiver = getUser(request.userId());
        User sender = getUser(LoggedInUser.getLoggedInUserId());
        ChatRoom chatRoom = chatRoomRepo.findRoom(sender.getId(), receiver.getId(), request.productId())
                .orElseGet(() -> chatRoomRepo.save(ChatRoom.builder()
                        .sender(sender)
                        .receiver(receiver)
                        .productId(request.productId())
                        .build()));
        return toResponse(chatRoom);
    }

    @Transactional(readOnly = true)
    public boolean isParticipant(UUID roomId, String email) {
        return chatRoomRepo.findById(roomId)
                .map(room -> room.getSender().getEmail().equals(email)
                          || room.getReceiver().getEmail().equals(email))
                .orElse(false);
    }

    private User getUser(UUID userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    private ChatRoomResponse toResponse(ChatRoom chatRoom) {
        return ChatRoomResponse.builder()
                .id(chatRoom.getId())
                .senderId(chatRoom.getSender().getId())
                .receiverId(chatRoom.getReceiver().getId())
                .productId(chatRoom.getProductId())
                .build();
    }
}

