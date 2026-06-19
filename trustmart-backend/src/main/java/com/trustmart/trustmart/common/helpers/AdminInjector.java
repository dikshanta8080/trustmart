package com.trustmart.trustmart.common.helpers;

import com.trustmart.trustmart.auth.model.Role;
import com.trustmart.trustmart.auth.model.User;
import com.trustmart.trustmart.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AdminInjector implements CommandLineRunner {
    private final AppConfig appConfig;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        AppConfig.Admin admin = appConfig.getAdmin();
        if (!userRepository.existsByEmail(admin.getEmail())) {
            User newAdmin = User.builder()
                    .name(admin.getName())
                    .email(admin.getEmail())
                    .password(passwordEncoder.encode(admin.getPassword()))
                    .role(Role.ADMIN)
                    .address(admin.getAddress())
                    .build();
            userRepository.save(newAdmin);
        }

    }
}
