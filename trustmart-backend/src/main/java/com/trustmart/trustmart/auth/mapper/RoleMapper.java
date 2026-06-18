package com.trustmart.trustmart.auth.mapper;

import com.trustmart.trustmart.auth.dto.request.RoleCreateRequest;
import com.trustmart.trustmart.auth.dto.response.RoleResponse;
import com.trustmart.trustmart.auth.model.Role;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface RoleMapper {
    @Mappings({@Mapping(target = "id", ignore = true)})
    Role toEntity(RoleCreateRequest request);

    RoleResponse toResponse(Role role);
}
