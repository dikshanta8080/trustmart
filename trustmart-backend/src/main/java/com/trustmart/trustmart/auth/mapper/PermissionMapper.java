package com.trustmart.trustmart.auth.mapper;

import com.trustmart.trustmart.auth.dto.request.PermissionCreateRequest;
import com.trustmart.trustmart.auth.dto.response.PermissionResponse;
import com.trustmart.trustmart.auth.model.Permission;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface PermissionMapper {
    @Mappings({@Mapping(target = "id", ignore = true)})
    Permission toEntity(PermissionCreateRequest request);

    PermissionResponse toResponse(Permission permission);
}
