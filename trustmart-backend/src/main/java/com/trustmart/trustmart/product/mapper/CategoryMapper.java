package com.trustmart.trustmart.product.mapper;

import com.trustmart.trustmart.product.dto.request.CategoryRequest;
import com.trustmart.trustmart.product.dto.response.CategoryResponse;
import com.trustmart.trustmart.product.model.Category;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    Category toEntity(CategoryRequest categoryRequest);

    CategoryResponse toResponse(Category category);
}
