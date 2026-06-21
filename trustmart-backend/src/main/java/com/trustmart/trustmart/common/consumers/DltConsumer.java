package com.trustmart.trustmart.common.consumers;

import com.trustmart.trustmart.common.helpers.KafkaTopics;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class DltConsumer {
    @KafkaListener(topics = KafkaTopics.DLT, groupId = "central-dlt-topic")
    public void listerDlt(@Payload Object event) {
        log.info("DLT received successfully");
    }
}
