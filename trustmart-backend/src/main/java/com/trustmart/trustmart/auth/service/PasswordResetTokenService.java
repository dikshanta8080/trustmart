package com.trustmart.trustmart.auth.service;

import com.trustmart.trustmart.auth.dto.response.ChangePasswordRequest;
import com.trustmart.trustmart.auth.dto.response.OtpResponse;
import com.trustmart.trustmart.auth.dto.response.UserResponse;
import com.trustmart.trustmart.auth.mapper.UserMapper;
import com.trustmart.trustmart.auth.model.PasswordResetToken;
import com.trustmart.trustmart.auth.model.User;
import com.trustmart.trustmart.auth.repository.PasswordResetTokenRepo;
import com.trustmart.trustmart.auth.repository.UserRepository;
import com.trustmart.trustmart.common.exceptions.BusinessException;
import com.trustmart.trustmart.common.exceptions.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.NonNull;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Optional;
import java.util.function.Supplier;

@RequiredArgsConstructor
@Service
public class PasswordResetTokenService {

    private final PasswordResetTokenRepo passwordResetTokenRepo;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final SecureRandom random = new SecureRandom();
    private final Supplier<String> otpSupplier = () -> {
        int otp = 100000 + random.nextInt(900000);
        return String.valueOf(otp);
    };

    private PasswordResetToken buildPasswordResetToken(String hashedOtp, User user) {
        return PasswordResetToken.builder()
                .otp(hashedOtp)
                .expiresAt(Instant.now().plus(2, ChronoUnit.MINUTES))
                .user(user)
                .isUsed(false)
                .build();
    }

    private void validate(boolean condition, String message) {
        if (condition) {
            throw new BusinessException(message);
        }
    }

    private void checkExistingActiveOtp(Optional<PasswordResetToken> tokenOptional) {
        validate(
                tokenOptional.isPresent()
                        && !tokenOptional.get().isUsed()
                        && tokenOptional.get().getExpiresAt().isAfter(Instant.now()),
                "You already have an active OTP"
        );
    }

    private OtpResponse getOtpResponse(String otp, PasswordResetToken savedToken) {
        return OtpResponse.builder()
                .otp(otp)
                .expiry(savedToken.getExpiresAt())
                .build();
    }

    @Transactional
    public OtpResponse generateOtp(String email) {
        User user = getUser(email);
        Optional<PasswordResetToken> existingToken = getByUser(user);
        checkExistingActiveOtp(existingToken);
        existingToken.ifPresent(passwordResetTokenRepo::delete);
        String otp = otpSupplier.get();
        String hashedOtp = passwordEncoder.encode(otp);
        PasswordResetToken passwordResetToken =
                buildPasswordResetToken(hashedOtp, user);
        PasswordResetToken savedToken =
                passwordResetTokenRepo.save(passwordResetToken);
        return getOtpResponse(otp, savedToken);
    }

    private Optional<PasswordResetToken> getByUser(User user) {
        return passwordResetTokenRepo.findByUser(user);
    }

    private @NonNull User getUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));
    }

    @Transactional
    public UserResponse verifyOtp(ChangePasswordRequest request) {
        User user = getUser(request.email());
        PasswordResetToken passwordResetToken = getPasswordResetToken(user);
        checkExpiry(passwordResetToken);
        validate(
                passwordResetToken.isUsed(),
                "OTP already used"
        );

        validate(
                !passwordEncoder.matches(
                        request.otp(),
                        passwordResetToken.getOtp()
                ),
                "OTP did not match"
        );

        validate(
                passwordEncoder.matches(
                        request.newPassword(),
                        user.getPassword()
                ),
                "Please provide a password you have not used before"
        );

        user.setPassword(
                passwordEncoder.encode(request.newPassword())
        );

        passwordResetTokenRepo.delete(passwordResetToken);

        return UserMapper.toResponse(
                userRepository.save(user)
        );
    }

    private PasswordResetToken getPasswordResetToken(User user) {
        return passwordResetTokenRepo.findByUser(user)
                .orElseThrow(() ->
                        new ResourceNotFoundException("OTP not found"));
    }

    private void checkExpiry(PasswordResetToken passwordResetToken) {
        validate(
                isExpired(passwordResetToken.getExpiresAt()),
                "OTP already expired"
        );
    }

    private boolean isExpired(Instant expiry) {
        return expiry.isBefore(Instant.now());
    }
}