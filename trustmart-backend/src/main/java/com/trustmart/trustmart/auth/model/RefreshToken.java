package com.trustmart.trustmart.auth.model;

import com.trustmart.trustmart.common.model.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@ToString
public class RefreshToken extends BaseEntity {

    @Column(nullable = false, name = "token")
    private String token;

    @Column(name = "expires_at")
    private Instant expiresAt;

    @Column(name = "is_used")
    @Builder.Default
    private boolean isUsed = false;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;


}
