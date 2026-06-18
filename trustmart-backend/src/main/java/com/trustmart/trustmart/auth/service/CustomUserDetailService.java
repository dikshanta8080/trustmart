package com.trustmart.trustmart.auth.service;


import com.trustmart.trustmart.auth.model.UserPrinciple;
import com.trustmart.trustmart.auth.repository.UserRepository;
import com.trustmart.trustmart.common.exceptions.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CustomUserDetailService implements UserDetailsService {
    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        com.trustmart.trustmart.auth.model.User user = userRepository.findByEmail(username).orElseThrow(() ->
                new UsernameNotFoundException("User not found"));
        return UserPrinciple.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .password(user.getPassword())
                .roles(user.getRoles()).build();
    }

    public UserDetails loadUserById(UUID id) throws ResourceNotFoundException {
        com.trustmart.trustmart.auth.model.User user = userRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("User not found"));
        return UserPrinciple.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .password(user.getPassword())
                .roles(user.getRoles()).build();
    }
}
