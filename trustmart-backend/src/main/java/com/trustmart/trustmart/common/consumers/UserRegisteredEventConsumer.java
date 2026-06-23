package com.trustmart.trustmart.common.consumers;

import com.trustmart.trustmart.common.events.kafka.UserRegisteredEvent;
import com.trustmart.trustmart.common.helpers.KafkaTopics;
import com.trustmart.trustmart.common.helpers.WebSocketTopics;
import com.trustmart.trustmart.common.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserRegisteredEventConsumer {
    private final NotificationService notificationService;
    private final SimpMessagingTemplate messagingTemplate;


    @KafkaListener(
            topics = KafkaTopics.USER_REGISTERED_TOPIC,
            groupId = "notification-group",
            containerFactory = "listenerContainerFactory"
    )
    public void sendEmail(@Payload UserRegisteredEvent event) {
        notificationService.sendRegisteredNotification(event);
    }

    @KafkaListener(
            topics = KafkaTopics.USER_REGISTERED_TOPIC,
            groupId = "user-add-group",
            containerFactory = "listenerContainerFactory"
    )
    public void updateUsersInFrontend(@Payload UserRegisteredEvent event) {
        messagingTemplate.convertAndSend("/topic/" + WebSocketTopics.USER_ADD, event.id());
    }
}
