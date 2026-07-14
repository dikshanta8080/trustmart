package com.trustmart.trustmart.product.service;

import com.trustmart.trustmart.common.dto.request.ProductFilterRequest;
import com.trustmart.trustmart.common.dto.response.ImageDataResponse;
import com.trustmart.trustmart.common.dto.response.PagedResponse;
import com.trustmart.trustmart.common.model.ImageData;
import com.trustmart.trustmart.common.repository.ImageDataRepository;
import com.trustmart.trustmart.common.service.ImageUploadService;
import com.trustmart.trustmart.common.specifications.ProductSpecification;
import com.trustmart.trustmart.product.dto.request.ProductRequestDto;
import com.trustmart.trustmart.product.dto.response.ProductResponseDto;
import com.trustmart.trustmart.product.enums.ProductStatus;
import com.trustmart.trustmart.product.mapper.ProductMapper;
import com.trustmart.trustmart.product.model.Category;
import com.trustmart.trustmart.product.model.Product;
import com.trustmart.trustmart.product.repository.CategoryRepository;
import com.trustmart.trustmart.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final ImageUploadService imageUploadService;

    @Transactional
    public ProductResponseDto addProduct(ProductRequestDto productRequestDto, List<MultipartFile> multipartFileList){
        Category category = categoryRepository.findById(productRequestDto.categoryId()).orElseThrow(()->new RuntimeException("Category not found"));
        Product product = ProductMapper.toEntity(productRequestDto);
        product.setCategory(category);
        multipartFileList.forEach(file->product.addImageData(imageUploadService.save(file)));
        Product savedProduct = productRepository.save(product);
        return ProductMapper.toResponse(savedProduct);
    }

    @org.springframework.transaction.annotation.Transactional(readOnly = true)
    public PagedResponse<ProductResponseDto> getAllProducts(Pageable pageable, ProductFilterRequest productFilterRequest){
        Specification<Product> productSpecification = ProductSpecification.filterProduct(productFilterRequest);
        Page<Product> productPage = productRepository.findAll(productSpecification, pageable);
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
                                            ProductRequestDto productRequestDto,
                                            List<MultipartFile> images){
        Product product = productRepository.findById(uuid).orElseThrow(()-> new RuntimeException("Product not found"));
        if(productRequestDto.description() != null){
            product.setDescription(productRequestDto.description());
        }
        if(productRequestDto.title() != null){
            product.setTitle(productRequestDto.title());
        }

        if(productRequestDto.categoryId() != null){
            Category category = categoryRepository.findById(productRequestDto.categoryId()).orElseThrow(() -> new RuntimeException("Category not found"));
            product.setCategory(category);
        }

        if(productRequestDto.price() != null){
            product.setPrice(productRequestDto.price());
        }

        if(productRequestDto.condition() != null){
            product.setCondition(productRequestDto.condition());
        }

        if(productRequestDto.location() != null){
            product.setLocation(productRequestDto.location());
        }

        if(productRequestDto.status() != null){
            product.setStatus(productRequestDto.status());
        }

        if(images != null && !images.isEmpty()){
            product.getImageData().clear();
            images.forEach(file -> product.addImageData( imageUploadService.save(file)));
        }
        Product savedProduct = productRepository.save(product);
        return ProductMapper.toResponse(savedProduct);
    }

    @Transactional
    public void deleteProduct(UUID uuid){
        int rowsAffected = productRepository.softDeleteById(uuid);
        if(rowsAffected==0){
            throw new IllegalArgumentException("Product not found");
        }
    }
}
