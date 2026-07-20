package com.trustmart.trustmart.product.controller;

import com.trustmart.trustmart.common.dto.request.PaginationRequest;
import com.trustmart.trustmart.common.dto.response.ApiResponse;
import com.trustmart.trustmart.common.dto.response.PagedResponse;
import com.trustmart.trustmart.product.dto.request.CategoryRequest;
import com.trustmart.trustmart.product.dto.response.CategoryResponse;
import com.trustmart.trustmart.product.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/categories")
public class CategoryController {

    private final CategoryService categoryService;

    @PostMapping
    @PreAuthorize("hasAuthority('CATEGORY_ADD')")
    public ResponseEntity<ApiResponse<CategoryResponse>> addCategory(@RequestBody CategoryRequest categoryRequest){
        CategoryResponse categoryResponse = categoryService.addCategory(categoryRequest);
        return ResponseEntity.ok(ApiResponse.success(categoryResponse, "Category created successfully"));
    }

    @GetMapping
    @PreAuthorize("hasAuthority('CATEGORY_VIEW')")
    public ResponseEntity<ApiResponse<PagedResponse<CategoryResponse>>> getAllCategories(@ModelAttribute PaginationRequest paginationRequest){
        PagedResponse<CategoryResponse> allCategory = categoryService.getAllCategory(paginationRequest.toPageable());
        return ResponseEntity.ok(ApiResponse.success(allCategory, "Category fetched successfully"));
    }

    @GetMapping("/{uuid}")
    @PreAuthorize("hasAuthority('CATEGORY_VIEW')")
    public ResponseEntity<ApiResponse<CategoryResponse>> getCategoryById(@PathVariable UUID uuid){
        CategoryResponse categoryResponse = categoryService.getCategoryById(uuid);
        return ResponseEntity.ok(ApiResponse.success(categoryResponse, "Category fetched successfully"));
    }

    @PutMapping("/{uuid}")
    @PreAuthorize("hasAuthority('CATEGORY_UPDATE')")
    public  ResponseEntity<ApiResponse<CategoryResponse>> updateCategory(@PathVariable UUID uuid,
                                                                         @RequestBody CategoryRequest categoryRequest){
        CategoryResponse categoryResponse = categoryService.updateCategory(uuid, categoryRequest);
        return ResponseEntity.ok(ApiResponse.success(categoryResponse, "Category updated successfully"));
    }

    @DeleteMapping("/{uuid}")
    @PreAuthorize("hasAuthority('CATEGORY_DELETE')")
    public ResponseEntity<ApiResponse<String>> deleteCategory(@PathVariable UUID uuid){
        categoryService.deleteCategory(uuid);
        return ResponseEntity.ok(ApiResponse.<String>success(null, "Category deleted successfully"));
    }
}
