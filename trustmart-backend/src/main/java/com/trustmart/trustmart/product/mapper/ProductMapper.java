package com.trustmart.trustmart.product.mapper;

import com.trustmart.trustmart.common.dto.response.ImageDataResponse;
import com.trustmart.trustmart.product.dto.request.ProductRequestDto;
import com.trustmart.trustmart.product.dto.response.ProductResponseDto;
import com.trustmart.trustmart.product.model.Product;

public class ProductMapper {

    public static Product toEntity(ProductRequestDto productRequestDto) {
        return Product.builder()
                .title(productRequestDto.title())
                .price(productRequestDto.price())
                .status(productRequestDto.status())
                .condition(productRequestDto.condition())
                .description(productRequestDto.description())
                .location(productRequestDto.location())
                .build();
    }

    public static ProductResponseDto toResponse(Product product) {
        return ProductResponseDto.builder()
                .id(product.getId())
                .title(product.getTitle())
                .status(product.getStatus())
                .location(product.getLocation())
                .price(product.getPrice())
                .description(product.getDescription())
                .condition(product.getCondition())
                .images(
                        product.getImageData()
                                .stream()
                                .map(image -> ImageDataResponse.builder()
                                        .imageId(image.getId())
                                        .name(image.getFileName())
                                        .imagePath("http://localhost:8080/api/v1/uploads/" + image.getFileName())
                                        .build()
                                )
                                .toList()
                )
                .build();
    }
}