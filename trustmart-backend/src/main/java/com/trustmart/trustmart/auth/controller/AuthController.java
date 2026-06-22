package com.trustmart.trustmart.auth.controller;

import com.trustmart.trustmart.auth.dto.request.LoginRequest;
import com.trustmart.trustmart.auth.dto.request.RefreshTokenRequest;
import com.trustmart.trustmart.auth.dto.request.RegistrationRequest;
import com.trustmart.trustmart.auth.dto.response.*;
import com.trustmart.trustmart.auth.service.AuthService;
import com.trustmart.trustmart.auth.service.PasswordResetTokenService;
import com.trustmart.trustmart.auth.service.RefreshTokenService;
import com.trustmart.trustmart.common.dto.response.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;
    private final RefreshTokenService refreshTokenService;
    private final PasswordResetTokenService passwordResetTokenService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<UserResponse>> registerCustomer(@Valid @RequestBody RegistrationRequest request) {
        UserResponse userResponse = authService.registerCustomer(request);
        return ResponseEntity.ok(ApiResponse.success(userResponse, "Customer Registered Successfully"));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> loginUser(@Valid @RequestBody LoginRequest request) {
        LoginResponse userResponse = authService.loginUser(request);
        return ResponseEntity.ok(ApiResponse.success(userResponse, "Customer logged in  Successfully"));
    }

    @PostMapping("/rotate")
    public ResponseEntity<ApiResponse<RefreshTokenResponse>> rotateToken(@Valid @RequestBody RefreshTokenRequest request) {
        RefreshTokenResponse refreshTokenResponse = refreshTokenService.verifyToken(request);
        return ResponseEntity.ok(ApiResponse.success(refreshTokenResponse, "Token rotated successfully"));
    }

    @PostMapping("/get-otp")
    public ResponseEntity<ApiResponse<OtpResponse>> getOtp(
            @RequestParam(required = true) String email
    ) {
        OtpResponse otpResponse = passwordResetTokenService.generateOtp(email);
        return ResponseEntity.ok().body(ApiResponse.success(otpResponse, "OTP generated successfully"));
    }

    @PostMapping("/change-password")
    public ResponseEntity<ApiResponse<UserResponse>> verifyOtpAndResetPassword(
            @Valid @RequestBody ChangePasswordRequest request
    ) {
        UserResponse otpResponse = passwordResetTokenService.verifyOtp(request);
        return ResponseEntity.ok().body(ApiResponse.success(otpResponse, "Password changed successfully"));
    }
}
