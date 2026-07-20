package com.trustmart.trustmart.product.repository;

import com.trustmart.trustmart.product.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.UUID;

public interface ProductRepository extends JpaRepository<Product, UUID>, JpaSpecificationExecutor<Product> {
    @Modifying
    @Query("UPDATE Product p SET p.deleted = true WHERE  p.id = :uuid ")
    int softDeleteById(@Param(value = "uuid") UUID uuid);
}