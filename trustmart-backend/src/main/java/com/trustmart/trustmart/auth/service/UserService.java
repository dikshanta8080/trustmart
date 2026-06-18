package com.trustmart.trustmart.auth.service;

import com.trustmart.trustmart.auth.dto.request.RegistrationRequest;
import com.trustmart.trustmart.auth.dto.response.UserResponse;
import com.trustmart.trustmart.auth.mapper.UserMapper;
import com.trustmart.trustmart.auth.model.Role;
import com.trustmart.trustmart.auth.model.User;
import com.trustmart.trustmart.auth.repository.RoleRepository;
import com.trustmart.trustmart.auth.repository.UserRepository;
import com.trustmart.trustmart.common.exceptions.BusinessException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;

    @Transactional
    public UserResponse createCustomer(RegistrationRequest request) {
        checkIfUserAlreadyExists(request);
        Role role = getOrCreateRole();
        User user = UserMapper.toEntity(request);
        user.addRole(role);
        user.setPassword(passwordEncoder.encode(request.password()));
        return UserMapper.toResponse(userRepository.save(user));

    }

    private Role getOrCreateRole() {
        return roleRepository.findByName("CUSTOMER").orElseGet(() ->
                roleRepository.save(Role
                        .builder()
                        .name("CUSTOMER")
                        .build()));
    }

    private void checkIfUserAlreadyExists(RegistrationRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new BusinessException("User with provided email already exists");
        }
    }
}
