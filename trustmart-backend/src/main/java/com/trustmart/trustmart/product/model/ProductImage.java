package com.trustmart.trustmart.product.model;

import com.trustmart.trustmart.common.model.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "images")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
public class ProductImage extends BaseEntity {
    @Column(nullable = false, unique = true)
    private String imageUrl;

    @ManyToOne()
    @JoinColumn(name = "product_id")
    private Product product;
}
