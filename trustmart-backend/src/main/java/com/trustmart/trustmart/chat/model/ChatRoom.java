package com.trustmart.trustmart.chat.model;

import com.trustmart.trustmart.auth.model.User;
import com.trustmart.trustmart.common.model.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "chat_room", uniqueConstraints = @UniqueConstraint(columnNames = {"sender_id", "receiver_id", "product_id"}))
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class ChatRoom extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sender_id", nullable = false)
    private User sender;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "receiver_id", nullable = false)
    private User receiver;

    @Column(name = "product_id")
    private UUID productId;
}