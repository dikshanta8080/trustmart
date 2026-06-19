package com.trustmart.trustmart.common.listeners;

import com.trustmart.trustmart.common.events.UserRegisteredEvent;
import com.trustmart.trustmart.common.helpers.KafkaTopics;
import com.trustmart.trustmart.common.service.NotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

import java.util.concurrent.CompletableFuture;

@Component
@Slf4j
@RequiredArgsConstructor
public class UserRegisteredEventListener {
    private final KafkaTemplate<String, Object> kafkaTemplate;

    @Async
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void listenUserRegisteredEvent(UserRegisteredEvent event) {
        CompletableFuture<SendResult<String, Object>> emailSentSuccessfully = kafkaTemplate.send(
                KafkaTopics.USER_REGISTERED_TOPIC,
                event.id().toString(),
                event
        ).whenComplete(
                (result, ex) -> {
                    if (ex == null) {
                        log.debug("Email sent successfully");
                    } else {
                        log.error("Failed to send an email Notification");
                    }
                }
        );

    }
}
