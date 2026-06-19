package com.trustmart.trustmart.common.listeners;

import com.trustmart.trustmart.common.events.UserRegisteredEvent;
import com.trustmart.trustmart.common.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionalEventListener;

@Component
@RequiredArgsConstructor
public class UserRegisteredEventListener {
    private final NotificationService notificationService;

    @Async
    @TransactionalEventListener
    public void listenUserRegisteredEvent(UserRegisteredEvent event) {
        notificationService.sendRegisteredNotification(event);
    }
}
