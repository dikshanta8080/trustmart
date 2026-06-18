package com.trustmart.trustmart.auth.model;

import com.trustmart.trustmart.common.model.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "permissions", uniqueConstraints = {@UniqueConstraint(name = "permission_uq", columnNames = {"name"})})
public class Permission extends BaseEntity {
    private String name;
}
