package com.trustmart.trustmart.auth.service;

import com.trustmart.trustmart.auth.dto.request.PermissionCreateRequest;
import com.trustmart.trustmart.auth.dto.response.PermissionResponse;
import com.trustmart.trustmart.auth.mapper.PermissionMapper;
import com.trustmart.trustmart.auth.model.Permission;
import com.trustmart.trustmart.auth.repository.PermissionRepository;
import com.trustmart.trustmart.common.exceptions.BusinessException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class PermissionService {
    private final PermissionRepository permissionRepository;
    private final PermissionMapper permissionMapper;

    @Transactional
    public PermissionResponse createPermission(PermissionCreateRequest request) {
        checkIfPermissionAlreadyExists(request);
        Permission permission = permissionMapper.toEntity(request);
        return permissionMapper.toResponse(permissionRepository.save(permission));

    }

    private void checkIfPermissionAlreadyExists(PermissionCreateRequest request) {
        if (permissionRepository.existsByName(request.name())) {
            throw new BusinessException("Permission Already Exists");
        }
    }
}
