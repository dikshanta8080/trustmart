package com.trustmart.trustmart.auth.service;

import com.trustmart.trustmart.auth.dto.request.RoleCreateRequest;
import com.trustmart.trustmart.auth.dto.response.RoleResponse;
import com.trustmart.trustmart.auth.mapper.RoleMapper;
import com.trustmart.trustmart.auth.model.Role;
import com.trustmart.trustmart.auth.repository.RoleRepository;
import com.trustmart.trustmart.common.exceptions.BusinessException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class RoleService {
    private final RoleRepository roleRepository;
    private final RoleMapper roleMapper;

    @Transactional
    public RoleResponse createRole(RoleCreateRequest request) {
        checkIfRoleAlreadyExists(request);
        Role role = roleMapper.toEntity(request);
        return roleMapper.toResponse(roleRepository.save(role));

    }

    private void checkIfRoleAlreadyExists(RoleCreateRequest request) {
        if (roleRepository.existsByName(request.name())) {
            throw new BusinessException("Role Already exists");
        }
    }
}
