package com.trustmart.trustmart.common.specifications;

import com.trustmart.trustmart.common.dto.request.ProductFilterRequest;
import com.trustmart.trustmart.product.model.Product;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class ProductSpecification {
    public static Specification<Product> filterProduct(ProductFilterRequest request) {
        return (root, query, cb) -> {

            List<Predicate> predicates = new ArrayList<>();
            if (request.keyword() != null && !request.keyword().isBlank()) {
                String pattern = "%" + request.keyword().toLowerCase() + "%";

                predicates.add(cb.or(
                        cb.like(cb.lower(root.get("name")), pattern),
                        cb.like(cb.lower(root.get("category").get("name")), pattern)
                ));
            }

            if (request.category() != null && !request.category().isBlank()) {
                predicates.add(
                        cb.equal(cb.lower(root.get("category").get("name")),
                                request.category().toLowerCase())
                );
            }

            if (request.location() != null && !request.location().isBlank()) {
                predicates.add(
                        cb.equal(cb.lower(root.get("location")),
                                request.location().toLowerCase())
                );
            }

            if (request.productCondition() != null && !request.productCondition().isBlank()) {
                predicates.add(
                        cb.equal(cb.lower(root.get("productCondition")),
                                request.productCondition().toLowerCase())
                );
            }

            if (request.minPrice() != null) {
                predicates.add(
                        cb.greaterThanOrEqualTo(root.get("price"), request.minPrice())
                );
            }

            if (request.maxPrice() != null) {
                predicates.add(
                        cb.lessThanOrEqualTo(root.get("price"), request.maxPrice())
                );
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
