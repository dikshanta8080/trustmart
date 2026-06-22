package com.trustmart.trustmart.common.consumers;

import com.trustmart.trustmart.common.events.OtpGeneratedEvent;
import com.trustmart.trustmart.common.helpers.KafkaTopics;
import com.trustmart.trustmart.common.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class OtpGeneratedEventConsumer {
    private final NotificationService notificationService;

    @KafkaListener(
            topics = KafkaTopics.OTP_GENERATED_TOPIC,
            groupId = "email-group",
            containerFactory = "listenerContainerFactory"
    )
    public void consumeOtpGeneratedEvent(@Payload OtpGeneratedEvent otpGeneratedEvent) {
        notificationService.sendOtpNotification(otpGeneratedEvent);
    }
}
