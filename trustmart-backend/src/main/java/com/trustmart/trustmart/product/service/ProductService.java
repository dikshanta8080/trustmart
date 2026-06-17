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
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Builder
public class ProductService {
    private final ProductRepository productRepository;

    public ProductResponseDto addProduct(ProductRequestDto productRequestDto){
        Product product = ProductMapper.toEntity(productRequestDto);
        Product savedProduct = productRepository.save(product);
        return ProductMapper.toResponse(savedProduct);
    }

    public PagedResponse<ProductResponseDto> getAllProducts(Pageable pageable){
        Page<Product> productPage = productRepository.findAll(pageable);
        Page<ProductResponseDto> productResponsePage = productPage.map(ProductMapper::toResponse);
        return PagedResponse.toPagedResponse(productResponsePage);
    }

    public ProductResponseDto getProductById(UUID uuid){
        Product product = productRepository.findById(uuid).orElseThrow();
        return ProductMapper.toResponse(product);
    }

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

    public void deleteProduct(UUID uuid){
        Product product = productRepository.findById(uuid).orElseThrow(() -> new RuntimeException("Product not found"));
        productRepository.delete(product);
    }
}
