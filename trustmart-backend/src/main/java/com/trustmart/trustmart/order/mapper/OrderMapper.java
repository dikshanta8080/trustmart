package com.trustmart.trustmart.order.mapper;

import com.trustmart.trustmart.order.dto.response.OrderResponseDto;
import com.trustmart.trustmart.order.model.Order;

public class OrderMapper {

    public static OrderResponseDto toResponse(Order order) {
        return OrderResponseDto.builder()
                .id(order.getId())
                .productId(order.getProduct().getId())
                .productTitle(order.getProduct().getTitle())
                .buyerId(order.getBuyer().getId())
                .buyerName(order.getBuyer().getName())
                .sellerId(order.getSeller().getId())
                .sellerName(order.getSeller().getName())
                .price(order.getPrice())
                .status(order.getStatus())
                .build();
    }
}
