package com.trustmart.trustmart.order.controller;

import com.trustmart.trustmart.common.dto.response.ApiResponse;
import com.trustmart.trustmart.order.dto.response.OrderResponseDto;
import com.trustmart.trustmart.order.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping("/products/{productId}")
    @PreAuthorize("hasAuthority('ORDER_CREATE')")
    public ResponseEntity<ApiResponse<OrderResponseDto>> createOrder(
            @PathVariable UUID productId
    ) {
        OrderResponseDto responseDto = orderService.createOrder(productId);

        return ResponseEntity.ok(
                ApiResponse.success(responseDto, "Order created successfully")
        );
    }

    @GetMapping("/{orderId}")
    @PreAuthorize("hasAuthority('ORDER_VIEW')")
    public ResponseEntity<ApiResponse<OrderResponseDto>> getOrderById(
            @PathVariable UUID orderId
    ) {
        OrderResponseDto responseDto = orderService.getOrderById(orderId);

        return ResponseEntity.ok(
                ApiResponse.success(responseDto, "Order fetched successfully")
        );
    }

    @GetMapping("/my-orders")
    @PreAuthorize("hasAuthority('ORDER_VIEW')")
    public ResponseEntity<ApiResponse<List<OrderResponseDto>>> getMyOrders() {
        List<OrderResponseDto> orders = orderService.getMyOrders();

        return ResponseEntity.ok(
                ApiResponse.success(orders, "My orders fetched successfully")
        );
    }

    @GetMapping("/seller-orders")
    @PreAuthorize("hasAuthority('ORDER_VIEW')")
    public ResponseEntity<ApiResponse<List<OrderResponseDto>>> getSellerOrders() {
        List<OrderResponseDto> orders = orderService.getSellerOrders();

        return ResponseEntity.ok(
                ApiResponse.success(orders, "Seller orders fetched successfully")
        );
    }

    @PutMapping("/{orderId}/accept")
    @PreAuthorize("hasAuthority('ORDER_ACCEPT')")
    public ResponseEntity<ApiResponse<OrderResponseDto>> acceptOrder(
            @PathVariable UUID orderId
    ) {
        OrderResponseDto responseDto = orderService.acceptOrder(orderId);

        return ResponseEntity.ok(
                ApiResponse.success(responseDto, "Order accepted successfully")
        );
    }

    @PutMapping("/{orderId}/reject")
    @PreAuthorize("hasAuthority('ORDER_REJECT')")
    public ResponseEntity<ApiResponse<OrderResponseDto>> rejectOrder(
            @PathVariable UUID orderId
    ) {
        OrderResponseDto responseDto = orderService.rejectOrder(orderId);

        return ResponseEntity.ok(
                ApiResponse.success(responseDto, "Order rejected successfully")
        );
    }

    @PutMapping("/{orderId}/cancel")
    @PreAuthorize("hasAuthority('ORDER_CANCEL')")
    public ResponseEntity<ApiResponse<OrderResponseDto>> cancelOrder(
            @PathVariable UUID orderId
    ) {
        OrderResponseDto responseDto = orderService.cancelOrder(orderId);

        return ResponseEntity.ok(
                ApiResponse.success(responseDto, "Order cancelled successfully")
        );
    }

    @PutMapping("/{orderId}/complete")
    @PreAuthorize("hasAuthority('ORDER_COMPLETE')")
    public ResponseEntity<ApiResponse<OrderResponseDto>> completeOrder(
            @PathVariable UUID orderId
    ) {
        OrderResponseDto responseDto = orderService.completeOrder(orderId);

        return ResponseEntity.ok(
                ApiResponse.success(responseDto, "Order completed successfully")
        );
    }
}
