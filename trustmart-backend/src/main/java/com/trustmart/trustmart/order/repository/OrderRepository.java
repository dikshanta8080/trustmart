package com.trustmart.trustmart.order.repository;

import com.trustmart.trustmart.order.enums.OrderStatus;
import com.trustmart.trustmart.order.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface OrderRepository extends JpaRepository<Order, UUID> {

    boolean existsByProductIdAndBuyerIdAndStatus(
            UUID productId,
            UUID buyerId,
            OrderStatus status
    );

    List<Order> findByBuyerId(UUID buyerId);

    List<Order> findBySellerId(UUID sellerId);

    List<Order> findByProductIdAndStatus(UUID productId, OrderStatus status);
}
