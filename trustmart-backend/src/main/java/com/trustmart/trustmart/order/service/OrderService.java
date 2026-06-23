package com.trustmart.trustmart.order.service;

import com.trustmart.trustmart.auth.model.User;
import com.trustmart.trustmart.auth.model.UserPrinciple;
import com.trustmart.trustmart.auth.repository.UserRepository;
import com.trustmart.trustmart.order.dto.response.OrderResponseDto;
import com.trustmart.trustmart.order.enums.OrderStatus;
import com.trustmart.trustmart.order.mapper.OrderMapper;
import com.trustmart.trustmart.order.model.Order;
import com.trustmart.trustmart.order.repository.OrderRepository;
import com.trustmart.trustmart.product.enums.ProductStatus;
import com.trustmart.trustmart.product.model.Product;
import com.trustmart.trustmart.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    private User getCurrentUser() {
        UserPrinciple userPrinciple =
                (UserPrinciple) SecurityContextHolder
                        .getContext()
                        .getAuthentication()
                        .getPrincipal();

        return userRepository.findById(userPrinciple.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Transactional
    public OrderResponseDto createOrder(UUID productId) {
        User buyer = getCurrentUser();

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        if (product.getStatus() == ProductStatus.SOLD) {
            throw new RuntimeException("Product is already sold");
        }

        if (product.getSeller().getId().equals(buyer.getId())) {
            throw new RuntimeException("You cannot order your own product");
        }

        boolean alreadyPending = orderRepository.existsByProductIdAndBuyerIdAndStatus(
                productId,
                buyer.getId(),
                OrderStatus.PENDING
        );

        if (alreadyPending) {
            throw new RuntimeException("You already have a pending order for this product");
        }

        Order order = Order.builder()
                .product(product)
                .buyer(buyer)
                .seller(product.getSeller())
                .price(product.getPrice())
                .status(OrderStatus.PENDING)
                .build();

        Order savedOrder = orderRepository.save(order);

        return OrderMapper.toResponse(savedOrder);
    }

    @Transactional
    public OrderResponseDto acceptOrder(UUID orderId) {
        User seller = getCurrentUser();

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if (!order.getSeller().getId().equals(seller.getId())) {
            throw new RuntimeException("Only seller can accept this order");
        }

        if (order.getStatus() != OrderStatus.PENDING) {
            throw new RuntimeException("Only pending order can be accepted");
        }

        Product product = order.getProduct();

        if (product.getStatus() == ProductStatus.SOLD) {
            throw new RuntimeException("Product is already sold");
        }

        order.setStatus(OrderStatus.ACCEPTED);
        product.setStatus(ProductStatus.SOLD);

        List<Order> pendingOrders =
                orderRepository.findByProductIdAndStatus(product.getId(), OrderStatus.PENDING);

        pendingOrders.forEach(pendingOrder -> {
            if (!pendingOrder.getId().equals(order.getId())) {
                pendingOrder.setStatus(OrderStatus.REJECTED);
            }
        });

        productRepository.save(product);
        orderRepository.saveAll(pendingOrders);

        return OrderMapper.toResponse(orderRepository.save(order));
    }

    @Transactional
    public OrderResponseDto rejectOrder(UUID orderId) {
        User seller = getCurrentUser();

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if (!order.getSeller().getId().equals(seller.getId())) {
            throw new RuntimeException("Only seller can reject this order");
        }

        if (order.getStatus() != OrderStatus.PENDING) {
            throw new RuntimeException("Only pending order can be rejected");
        }

        order.setStatus(OrderStatus.REJECTED);

        return OrderMapper.toResponse(orderRepository.save(order));
    }

    @Transactional
    public OrderResponseDto cancelOrder(UUID orderId) {
        User buyer = getCurrentUser();

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if (!order.getBuyer().getId().equals(buyer.getId())) {
            throw new RuntimeException("Only buyer can cancel this order");
        }

        if (order.getStatus() != OrderStatus.PENDING) {
            throw new RuntimeException("Only pending order can be cancelled");
        }

        order.setStatus(OrderStatus.CANCELLED);

        return OrderMapper.toResponse(orderRepository.save(order));
    }

    @Transactional
    public OrderResponseDto completeOrder(UUID orderId) {
        User seller = getCurrentUser();

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if (!order.getSeller().getId().equals(seller.getId())) {
            throw new RuntimeException("Only seller can complete this order");
        }

        if (order.getStatus() != OrderStatus.ACCEPTED) {
            throw new RuntimeException("Only accepted order can be completed");
        }

        order.setStatus(OrderStatus.COMPLETED);

        return OrderMapper.toResponse(orderRepository.save(order));
    }

    @Transactional(readOnly = true)
    public List<OrderResponseDto> getMyOrders() {
        User buyer = getCurrentUser();

        return orderRepository.findByBuyerId(buyer.getId())
                .stream()
                .map(OrderMapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<OrderResponseDto> getSellerOrders() {
        User seller = getCurrentUser();

        return orderRepository.findBySellerId(seller.getId())
                .stream()
                .map(OrderMapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public OrderResponseDto getOrderById(UUID orderId) {
        User currentUser = getCurrentUser();

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        boolean isBuyer = order.getBuyer().getId().equals(currentUser.getId());
        boolean isSeller = order.getSeller().getId().equals(currentUser.getId());

        if (!isBuyer && !isSeller) {
            throw new RuntimeException("You cannot view this order");
        }

        return OrderMapper.toResponse(order);
    }
}
