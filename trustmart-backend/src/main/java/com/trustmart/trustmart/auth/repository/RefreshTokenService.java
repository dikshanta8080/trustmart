package com.trustmart.trustmart.auth.repository;

import com.trustmart.trustmart.auth.dto.request.RefreshTokenRequest;
import com.trustmart.trustmart.auth.dto.response.RefreshTokenResponse;
import com.trustmart.trustmart.auth.model.RefreshToken;
import com.trustmart.trustmart.auth.model.User;
import com.trustmart.trustmart.auth.model.UserPrinciple;
import com.trustmart.trustmart.auth.service.JwtService;
import com.trustmart.trustmart.common.exceptions.BusinessException;
import com.trustmart.trustmart.common.exceptions.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.NonNull;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class RefreshTokenService {
    private final PasswordEncoder passwordEncoder;
    private final RefreshTokenRepository refreshTokenRepository;
    private final UserRepository userRepository;
    private final JwtService jwtService;

    @Transactional
    public String createToken(UUID userId) {
        User user = getUser(userId);
        refreshTokenRepository.deleteByUserId(userId);
        RefreshToken refreshToken = buildRefreshToken(user);
        return refreshTokenRepository.save(refreshToken).getToken();
    }


    @Transactional
    public RefreshTokenResponse verifyToken(RefreshTokenRequest request) {
        RefreshToken refreshToken = getRefreshToken(request);
        checkExpiry(refreshToken);
        User user = refreshToken.getUser();
        refreshTokenRepository.deleteById(refreshToken.getId());
        RefreshToken rotatedToken = buildRefreshToken(user);
        String jwt = jwtService.getJwt(buildPrinciple(user));
        refreshTokenRepository.save(rotatedToken);
        return RefreshTokenResponse.builder().accessToken(jwt).refreshToken(rotatedToken.getToken()).build();

    }

    private void checkExpiry(RefreshToken refreshToken) {
        if (refreshToken.getExpiresAt().isBefore(Instant.now())) {
            throw new BusinessException("Your token is expired");
        }
    }

    private RefreshToken getRefreshToken(RefreshTokenRequest request) {
        return refreshTokenRepository.findByToken(request.refreshToken()).orElseThrow(() ->
                new ResourceNotFoundException("Token does not exists"));
    }

    private UserPrinciple buildPrinciple(User user) {
        return UserPrinciple.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .password(user.getPassword())
                .role(user.getRole())
                .build();
    }


    private RefreshToken buildRefreshToken(User user) {
        return RefreshToken.builder()
                .token(UUID.randomUUID().toString())
                .expiresAt(Instant.now().plus(7, ChronoUnit.DAYS))
                .user(user)
                .build();
    }

    private void checkIfAlreadyExists(User user) {
        if (refreshTokenRepository.existsByUser(user)) {
            throw new BusinessException("Refresh token for this user already exists ");
        }
    }

    private @NonNull User getUser(UUID userId) {
        return userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User does not exists"));

    }
}
