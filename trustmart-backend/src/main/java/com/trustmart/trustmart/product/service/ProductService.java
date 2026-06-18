package com.trustmart.trustmart.product.service;

import com.trustmart.trustmart.common.dto.response.ApiResponse;
import com.trustmart.trustmart.common.dto.response.PagedResponse;
import com.trustmart.trustmart.product.dto.request.ProductRequestDto;
import com.trustmart.trustmart.product.dto.response.ProductResponseDto;
import com.trustmart.trustmart.product.mapper.ProductMapper;
import com.trustmart.trustmart.product.model.Product;
import com.trustmart.trustmart.product.repository.ProductRepository;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
@Builder
public class ProductService {
    private final ProductRepository productRepository;

    @Transactional
    public ProductResponseDto addProduct(ProductRequestDto productRequestDto){
        Product product = ProductMapper.toEntity(productRequestDto);
        Product savedProduct = productRepository.save(product);
        return ProductMapper.toResponse(savedProduct);
    }

    @org.springframework.transaction.annotation.Transactional(readOnly = true)
    public PagedResponse<ProductResponseDto> getAllProducts(Pageable pageable){
        Page<Product> productPage = productRepository.findAll(pageable);
        Page<ProductResponseDto> productResponsePage = productPage.map(ProductMapper::toResponse);
        return PagedResponse.toPagedResponse(productResponsePage);
    }

    @Transactional(readOnly = true)
    public ProductResponseDto getProductById(UUID uuid){
        Product product = productRepository.findById(uuid).orElseThrow();
        return ProductMapper.toResponse(product);
    }

    @Transactional
    public ProductResponseDto updateProduct(UUID uuid,
                                            ProductRequestDto productRequestDto){
        Product product = productRepository.findById(uuid).orElseThrow(()-> new RuntimeException("Product not found"));
        if(productRequestDto.description() != null){
            product.setDescription(productRequestDto.description());
        }
        if(productRequestDto.title() != null){
            product.setDescription(productRequestDto.description());
        }
        return ProductMapper.toResponse(productRepository.save(product));
    }

    @Transactional
    public void deleteProduct(UUID uuid){
        int rowsAffected = productRepository.softDeleteById(uuid);
        if(rowsAffected<0){
            throw new RuntimeException("Failed to delete to product");
        }
    }
}
