package com.trustmart.trustmart.common.model;

import com.trustmart.trustmart.product.model.Product;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class ImageData extends BaseEntity {
    private String originalName;

    private String fileName;

    private String filePath;

    private String contentType;

    private Long size;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

}
