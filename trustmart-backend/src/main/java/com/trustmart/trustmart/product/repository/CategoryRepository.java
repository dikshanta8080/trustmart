package com.trustmart.trustmart.product.repository;

import com.trustmart.trustmart.product.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.UUID;

public interface CategoryRepository extends JpaRepository<Category, UUID> {
    @Query("UPDATE Category c SET c.deleted = true WHERE  c.id = :uuid ")
    int softDeleteById(@Param(value = "uuid") UUID uuid);
}
