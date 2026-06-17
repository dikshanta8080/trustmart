package com.trustmart.trustmart.product.controller;

import com.trustmart.trustmart.common.dto.response.ApiResponse;
import com.trustmart.trustmart.common.dto.response.PagedResponse;
import com.trustmart.trustmart.product.dto.request.ProductRequestDto;
import com.trustmart.trustmart.product.dto.response.ProductResponseDto;
import com.trustmart.trustmart.product.repository.ProductRepository;
import com.trustmart.trustmart.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;
    private final ProductRepository productRepository;

    @PostMapping
    public ResponseEntity<ApiResponse<ProductResponseDto>> addProduct(@RequestBody ProductRequestDto productRequestDto){
        ProductResponseDto productResponseDto = productService.addProduct(productRequestDto);
        return ResponseEntity.ok().body(ApiResponse.success(productResponseDto));
    }

//    @GetMapping
//    public ResponseEntity<ApiResponse<PagedResponse<ProductResponseDto>>>
}
