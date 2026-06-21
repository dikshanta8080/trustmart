package com.trustmart.trustmart.auth.repository;

import com.trustmart.trustmart.auth.model.PasswordResetToken;
import com.trustmart.trustmart.auth.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface PasswordResetTokenRepo extends JpaRepository<PasswordResetToken, UUID> {
    Optional<PasswordResetToken> findByUser(User user);
}
