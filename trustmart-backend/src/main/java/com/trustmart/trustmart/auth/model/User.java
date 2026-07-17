package com.trustmart.trustmart.auth.model;

import com.trustmart.trustmart.chat.model.ChatRoom;
import com.trustmart.trustmart.common.model.BaseEntity;
import com.trustmart.trustmart.common.model.ImageData;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.SQLRestriction;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users", uniqueConstraints = @UniqueConstraint(name = "unq_email", columnNames = {"email"}))
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@SQLRestriction("deleted=false")
public class User extends BaseEntity {

    @Column(nullable = false)
    private String name;

    @Column
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String address;

    @Enumerated(EnumType.STRING)
    private Role role;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "image_id")
    private ImageData imageData;

    @Builder.Default
    @OneToMany(mappedBy = "sender")
    private List<ChatRoom> sendRooms = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "receiver")
    private List<ChatRoom> receivedRooms = new ArrayList<>();
}