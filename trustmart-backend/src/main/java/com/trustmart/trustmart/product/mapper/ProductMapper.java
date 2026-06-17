package com.trustmart.trustmart.product.mapper;

import com.trustmart.trustmart.product.dto.request.ProductRequestDto;
import com.trustmart.trustmart.product.dto.response.ProductResponseDto;
import com.trustmart.trustmart.product.model.Product;

public class ProductMapper {
    public static Product toEntity(ProductRequestDto productRequestDto){
        return Product.builder()
                .title(productRequestDto.title())
                .price(productRequestDto.price())
                .status(productRequestDto.status())
                .condition(productRequestDto.condition())
                .description(productRequestDto.description())
                .imageUrl(productRequestDto.imageUrl())
                .location(productRequestDto.location())
                .build();
    }

    public static ProductResponseDto toResponse(Product product){
        return ProductResponseDto.builder()
                .id(product.getId())
                .title(product.getTitle())
                .status(product.getStatus())
                .location(product.getLocation())
                .price(product.getPrice())
                .imageUrl(product.getImageUrl())
                .description(product.getDescription())
                .condition(product.getCondition())
                .build();

    }
}
