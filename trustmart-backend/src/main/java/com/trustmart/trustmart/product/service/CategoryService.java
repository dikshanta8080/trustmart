package com.trustmart.trustmart.product.service;


import com.trustmart.trustmart.common.dto.response.PagedResponse;
import com.trustmart.trustmart.product.dto.request.CategoryRequest;
import com.trustmart.trustmart.product.dto.response.CategoryResponse;
import com.trustmart.trustmart.product.mapper.CategoryMapper;
import com.trustmart.trustmart.product.model.Category;
import com.trustmart.trustmart.product.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;



import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CategoryService {

private final CategoryRepository categoryRepository;
private final CategoryMapper categoryMapper;

@Transactional
public CategoryResponse addCategory(CategoryRequest categoryRequest){
    Category category = categoryMapper.toEntity(categoryRequest);
    Category savedCategory = categoryRepository.save(category);
    return categoryMapper.toResponse(savedCategory);
}

@Transactional(readOnly = true)
public PagedResponse<CategoryResponse> getAllCategory(Pageable pageable){
    Page<Category> categoryPage = categoryRepository.findAll(pageable);
    Page<CategoryResponse> categoryResponsePage = categoryPage.map(categoryMapper::toResponse);
    return PagedResponse.toPagedResponse(categoryResponsePage);
}

public CategoryResponse getCategoryById( UUID uuid){
    Category category = categoryRepository.findById(uuid).orElseThrow(()-> new RuntimeException("Category not found"));
    return categoryMapper.toResponse(category);
}

public CategoryResponse updateCategory( UUID uuid,
                                        CategoryRequest categoryRequest){
    Category category = categoryRepository.findById(uuid).orElseThrow(()-> new RuntimeException("Category not found"));
    if(categoryRequest.name() != null){
        category.setName(categoryRequest.name());
    }
    if(categoryRequest.description() != null){
        category.setDescription(categoryRequest.description());
    }
    return categoryMapper.toResponse(categoryRepository.save(category));
}

@Transactional
    public void deleteCategory(UUID uuid){
    int rowsAffected = categoryRepository.softDeleteById(uuid);
    if(rowsAffected==0){
        throw new IllegalArgumentException("Category not found");
    }
}

}
