package com.trustmart.trustmart.chat.service;

import com.trustmart.trustmart.auth.model.User;
import com.trustmart.trustmart.auth.repository.UserRepository;
import com.trustmart.trustmart.chat.dto.ChatMessageRequest;
import com.trustmart.trustmart.chat.dto.ChatMessageResponse;
import com.trustmart.trustmart.chat.mapper.ChatMessageMapper;
import com.trustmart.trustmart.chat.model.ChatMessage;
import com.trustmart.trustmart.chat.model.ChatRoom;
import com.trustmart.trustmart.chat.repository.ChatMessageRepository;
import com.trustmart.trustmart.chat.repository.ChatRoomRepo;
import com.trustmart.trustmart.common.exceptions.BusinessException;
import com.trustmart.trustmart.common.exceptions.ResourceNotFoundException;
import com.trustmart.trustmart.common.helpers.LoggedInUser;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ChatMessageService {
    private final ChatMessageRepository chatMessageRepository;
    private final ChatRoomRepo chatRoomRepo;
    private final UserRepository userRepository;
    private final SimpMessagingTemplate simpMessagingTemplate;

    @Transactional(readOnly = true)
    public List<ChatMessageResponse> getAll(UUID chatRoomId) {
        ChatRoom chatRoom = chatRoomRepo.findById(chatRoomId)
                .orElseThrow(() -> new ResourceNotFoundException("Chat room not found"));
        String email = LoggedInUser.getLoggedInUserEmail();
        if (!chatRoom.getSender().getEmail().equals(email) && !chatRoom.getReceiver().getEmail().equals(email)) {
            throw new BusinessException("Access denied");
        }
        return chatMessageRepository.findAllByChatRoomId(chatRoomId).stream()
                .map(ChatMessageMapper::toResponse)
                .toList();
    }

    @Transactional
    public ChatMessageResponse saveChat(ChatMessageRequest request, String senderEmail) {
        ChatRoom chatRoom = chatRoomRepo.findById(request.roomId())
                .orElseThrow(() -> new ResourceNotFoundException("Chat room not found"));
        if (!chatRoom.getSender().getEmail().equals(senderEmail) && !chatRoom.getReceiver().getEmail().equals(senderEmail)) {
            throw new BusinessException("Access denied");
        }
        User sender = userRepository.findByEmail(senderEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        ChatMessage saved = chatMessageRepository.save(ChatMessage.builder()
                .chatRoom(chatRoom)
                .sender(sender)
                .message(request.message())
                .build());
        simpMessagingTemplate.convertAndSend("/topic/room/" + chatRoom.getId(), ChatMessageMapper.toResponse(saved));
        return ChatMessageMapper.toResponse(saved);
    }
}

