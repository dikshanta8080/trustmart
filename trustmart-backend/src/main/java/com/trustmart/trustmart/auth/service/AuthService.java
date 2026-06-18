package com.trustmart.trustmart.auth.service;

import com.trustmart.trustmart.auth.dto.request.LoginRequest;
import com.trustmart.trustmart.auth.dto.request.RegistrationRequest;
import com.trustmart.trustmart.auth.dto.response.LoginResponse;
import com.trustmart.trustmart.auth.dto.response.UserResponse;
import com.trustmart.trustmart.auth.mapper.UserMapper;
import com.trustmart.trustmart.auth.model.UserPrinciple;
import com.trustmart.trustmart.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class AuthService {
    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserRepository userRepository;

    @Transactional
    public UserResponse registerCustomer(RegistrationRequest request) {
        return userService.createCustomer(request);
    }

    @Transactional
    public LoginResponse loginUser(LoginRequest request) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.email(),
                            request.password()));
            UserPrinciple userPrinciple = (UserPrinciple) authentication.getPrincipal();
            com.trustmart.trustmart.auth.model.User user = userRepository.findById(userPrinciple.getId())
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));
            String jwt = jwtService.getJwt(userPrinciple);
            return UserMapper.toLoginResponse(user, jwt);

        } catch (AuthenticationException e) {
            throw new RuntimeException(e);
        }
    }
}
