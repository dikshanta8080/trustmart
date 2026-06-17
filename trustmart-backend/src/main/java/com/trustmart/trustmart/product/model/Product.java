package com.trustmart.trustmart.product.model;

import com.trustmart.trustmart.common.model.BaseEntity;
import com.trustmart.trustmart.product.enums.ProductCondition;
import com.trustmart.trustmart.product.enums.ProductStatus;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "products")
@Getter
@Setter
@SuperBuilder
@RequiredArgsConstructor
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

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductImage> images;
}
