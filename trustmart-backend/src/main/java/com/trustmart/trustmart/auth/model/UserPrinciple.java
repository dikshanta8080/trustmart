package com.trustmart.trustmart.auth.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserPrinciple implements UserDetails {
    private UUID id;
    private String name;
    private String email;
    private String password;
    private Set<Role> roles;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Set<GrantedAuthority> authorities = new HashSet<>();
        for (Role role : roles) {
            authorities.add(
                    new SimpleGrantedAuthority("ROLE_" + role.getName())
            );
            for (Permission permission : role.getPermissions()) {
                authorities.add(
                        new SimpleGrantedAuthority(permission.getName())
                );
            }
        }

        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }
}
