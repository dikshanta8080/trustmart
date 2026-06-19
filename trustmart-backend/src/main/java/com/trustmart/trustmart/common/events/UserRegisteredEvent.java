package com.trustmart.trustmart.common.events;

import lombok.Builder;

import java.util.UUID;

@Builder
public record UserRegisteredEvent(
        UUID id,
        String name,
        String email,
        String address
) {
}
