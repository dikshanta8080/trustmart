package com.trustmart.trustmart.product.controller;

import com.trustmart.trustmart.common.dto.request.PaginationRequest;
import com.trustmart.trustmart.common.dto.response.ApiResponse;
import com.trustmart.trustmart.common.dto.response.PagedResponse;
import com.trustmart.trustmart.product.dto.request.ProductRequestDto;
import com.trustmart.trustmart.product.dto.response.ProductResponseDto;
import com.trustmart.trustmart.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;

    @PostMapping
    public ResponseEntity<ApiResponse<ProductResponseDto>> addProduct(@RequestBody ProductRequestDto productRequestDto){
        ProductResponseDto productResponseDto = productService.addProduct(productRequestDto);
        return ResponseEntity.ok(ApiResponse.success(productResponseDto, "Product created successfully"));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<PagedResponse<ProductResponseDto>>> getAllProducts(@ModelAttribute PaginationRequest paginationRequest){
        PagedResponse<ProductResponseDto> allProducts = productService.getAllProducts(paginationRequest.toPageable());
        return ResponseEntity.ok(ApiResponse.success(allProducts, "Products fetched successfully"));
    }

    @GetMapping("/{uuid}")
    public ResponseEntity<ApiResponse<ProductResponseDto>> getProductById(@PathVariable UUID uuid){
        ProductResponseDto productResponse = productService.getProductById(uuid);
        return ResponseEntity.ok(ApiResponse.success(productResponse, "Product fetched successfully"));
    }

    @PutMapping("/{uuid}")
    public ResponseEntity<ApiResponse<ProductResponseDto>> updateProduct(@PathVariable UUID uuid,
                                                                         @RequestBody ProductRequestDto productRequestDto){
        ProductResponseDto productResponseDto = productService.updateProduct(uuid, productRequestDto);
        return ResponseEntity.ok(ApiResponse.success(productResponseDto, "Product updated successfully"));
    }

    @DeleteMapping("/{uuid}")
    public ResponseEntity<ApiResponse<String>> deleteProduct(@PathVariable UUID uuid){
        productService.deleteProduct(uuid);
        return ResponseEntity.ok(
                ApiResponse.<String>success(null, "Product deleted successfully")
        );
    }
}
