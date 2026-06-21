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
@Table(name = "password_reset_token",
        uniqueConstraints = {@UniqueConstraint(name = "user_uq", columnNames = {"user_id"})})
public class PasswordResetToken extends BaseEntity {
    @Column(name = "otp")
    private String otp;

    @Column(name = "expires_at")
    private Instant expiresAt;

    @Column(name = "is_used")
    private boolean isUsed = false;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;
}
