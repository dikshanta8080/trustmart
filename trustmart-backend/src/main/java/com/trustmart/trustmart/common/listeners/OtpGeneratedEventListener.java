package com.trustmart.trustmart.common.listeners;

import com.trustmart.trustmart.common.events.kafka.OtpGeneratedEvent;
import com.trustmart.trustmart.common.helpers.KafkaTopics;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

@Component
@Slf4j
@RequiredArgsConstructor
public class OtpGeneratedEventListener {
    private final KafkaTemplate<String, Object> kafkaTemplate;

    @Async
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void handleOtpGeneratedEvent(OtpGeneratedEvent event) {
        kafkaTemplate.send(KafkaTopics.OTP_GENERATED_TOPIC, event.otp(), event).whenComplete(
                (result, ex) -> {
                    if (ex == null) {
                        log.info("Event published successfully");
                    } else {
                        log.error("Failed to publish an event");
                    }
                }
        );
    }
}
