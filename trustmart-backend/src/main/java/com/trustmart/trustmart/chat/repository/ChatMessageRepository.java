package com.trustmart.trustmart.chat.repository;

import com.trustmart.trustmart.chat.model.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, UUID> {
    @Query(" SELECT c from ChatMessage  c WHERE c.chatRoom.id = :chatRoomId ORDER BY c.createdAt DESC")
    List<ChatMessage> findAllByChatRoomId(@Param(value = "chatRoomId") UUID chatRoomId);
}
