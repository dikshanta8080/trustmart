package com.trustmart.trustmart.common.specifications;

import com.trustmart.trustmart.auth.model.User;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.jspecify.annotations.Nullable;
import org.springframework.data.jpa.domain.Specification;

public class UserSpecification {
    public static Specification<User> searchByKeyword(String keyword) {
        return new Specification<User>() {
            @Override
            public @Nullable Predicate toPredicate(Root<User> root, @Nullable CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
                if (keyword == null || keyword.isBlank()) {
                    return criteriaBuilder.conjunction();
                }
                String pattern = "%" + keyword.toLowerCase() + "%";
                return criteriaBuilder.or(
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("name")), pattern),
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("address")), pattern)
                );
            }
        };
    }
}
