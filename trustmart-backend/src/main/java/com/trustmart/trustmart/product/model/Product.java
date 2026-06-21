package com.trustmart.trustmart.product.model;

import com.trustmart.trustmart.common.model.BaseEntity;
import com.trustmart.trustmart.product.enums.ProductCondition;
import com.trustmart.trustmart.product.enums.ProductStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;

@Entity
@Table(name = "products")
@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class Product extends BaseEntity {

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private BigDecimal price;

    @Enumerated(EnumType.STRING)
    private ProductCondition condition;

    @Column(nullable = false)
    private String location;

    @Enumerated(EnumType.STRING)
    private ProductStatus status;

    @Column(nullable = false, unique = true)
    private String imageUrl;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
}
