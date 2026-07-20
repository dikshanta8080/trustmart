package com.trustmart.trustmart.chat.repository;

import com.trustmart.trustmart.chat.model.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface ChatRoomRepo extends JpaRepository<ChatRoom, UUID> {

    @Query("SELECT r FROM ChatRoom r WHERE r.productId = :productId AND " +
           "((r.sender.id = :user1 AND r.receiver.id = :user2) OR " +
           " (r.sender.id = :user2 AND r.receiver.id = :user1))")
    Optional<ChatRoom> findRoom(@Param("user1") UUID user1,
                                @Param("user2") UUID user2,
                                @Param("productId") UUID productId);
}
