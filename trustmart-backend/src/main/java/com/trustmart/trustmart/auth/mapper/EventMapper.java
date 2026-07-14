package com.trustmart.trustmart.auth.mapper;

import com.trustmart.trustmart.auth.dto.response.UserResponse;
import com.trustmart.trustmart.common.events.kafka.UserRegisteredEvent;

public class EventMapper {
    public static UserRegisteredEvent toEvent(UserResponse userResponse) {
        return UserRegisteredEvent.builder()
                .id(userResponse.id())
                .name(userResponse.name())
                .email(userResponse.email())
                .address(userResponse.address())
                .build();
    }
}
