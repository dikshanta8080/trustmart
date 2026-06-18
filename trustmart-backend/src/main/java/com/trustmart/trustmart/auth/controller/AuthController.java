package com.trustmart.trustmart.auth.controller;

import com.trustmart.trustmart.auth.dto.request.LoginRequest;
import com.trustmart.trustmart.auth.dto.request.RegistrationRequest;
import com.trustmart.trustmart.auth.dto.response.LoginResponse;
import com.trustmart.trustmart.auth.dto.response.UserResponse;
import com.trustmart.trustmart.auth.service.AuthService;
import com.trustmart.trustmart.common.dto.response.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<UserResponse>> registerCustomer(@Valid @RequestBody RegistrationRequest request) {
        UserResponse userResponse = authService.registerCustomer(request);
        return ResponseEntity.ok(ApiResponse.success(userResponse, "Customer Registered Successfully"));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> loginUser(@Valid @RequestBody LoginRequest request) {
        LoginResponse userResponse = authService.loginUser(request);
        return ResponseEntity.ok(ApiResponse.success(userResponse, "Customer Registered Successfully"));
    }
}
