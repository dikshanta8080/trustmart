package com.trustmart.trustmart.auth.service;

import com.trustmart.trustmart.auth.dto.response.ChangePasswordRequest;
import com.trustmart.trustmart.auth.dto.response.OtpResponse;
import com.trustmart.trustmart.auth.dto.response.UserResponse;
import com.trustmart.trustmart.auth.mapper.UserMapper;
import com.trustmart.trustmart.auth.model.PasswordResetToken;
import com.trustmart.trustmart.auth.model.User;
import com.trustmart.trustmart.auth.repository.PasswordResetTokenRepo;
import com.trustmart.trustmart.auth.repository.UserRepository;
import com.trustmart.trustmart.common.events.kafka.OtpGeneratedEvent;
import com.trustmart.trustmart.common.exceptions.BusinessException;
import com.trustmart.trustmart.common.exceptions.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.Instant;
import java.time.temporal.ChronoUnit;

@RequiredArgsConstructor
@Service
public class PasswordResetTokenService {

    private final ApplicationEventPublisher applicationEventPublisher;
    private final PasswordResetTokenRepo passwordResetTokenRepo;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final SecureRandom random = new SecureRandom();

    private String generateOtp() {
        return String.valueOf(100000 + random.nextInt(900000));
    }

    private User getUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    private PasswordResetToken getToken(User user) {
        return passwordResetTokenRepo.findByUser(user)
                .orElseThrow(() -> new ResourceNotFoundException("OTP not found"));
    }

    private boolean isExpired(Instant expiry) {
        return expiry.isBefore(Instant.now());
    }

    @Transactional
    public OtpResponse generateOtp(String email) {
        User user = getUser(email);
        String otp = generateOtp();
        String hashedOtp = passwordEncoder.encode(otp);

        PasswordResetToken token = passwordResetTokenRepo.findByUser(user)
                .orElse(PasswordResetToken.builder().user(user).build());
        token.setOtp(hashedOtp);
        token.setExpiresAt(Instant.now().plus(2, ChronoUnit.MINUTES));
        token.setUsed(false);
        PasswordResetToken saved = passwordResetTokenRepo.save(token);
        applicationEventPublisher.publishEvent(
                OtpGeneratedEvent.builder()
                        .otp(otp)
                        .expiry(saved.getExpiresAt())
                        .email(user.getEmail())
                        .build()
        );
        return OtpResponse.builder()
                .expiry(saved.getExpiresAt())
                .build();
    }

    @Transactional
    public UserResponse verifyOtp(ChangePasswordRequest request) {

        User user = getUser(request.email());
        PasswordResetToken token = getToken(user);

        if (isExpired(token.getExpiresAt())) {
            throw new BusinessException("OTP already expired");
        }
        if (token.isUsed()) {
            throw new BusinessException("OTP already used");
        }

        if (!passwordEncoder.matches(request.otp(), token.getOtp())) {
            throw new BusinessException("OTP did not match");
        }
        if (passwordEncoder.matches(request.newPassword(), user.getPassword())) {
            throw new BusinessException("Please provide a password you have not used before");
        }
        token.setUsed(true);
        passwordResetTokenRepo.save(token);

        user.setPassword(passwordEncoder.encode(request.newPassword()));

        return UserMapper.toResponse(userRepository.save(user));
    }
}