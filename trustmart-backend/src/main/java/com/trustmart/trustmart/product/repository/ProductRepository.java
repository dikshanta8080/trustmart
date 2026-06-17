package com.trustmart.trustmart.product.repository;

import com.trustmart.trustmart.product.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ProductRepository extends JpaRepository<Product, UUID> {
}