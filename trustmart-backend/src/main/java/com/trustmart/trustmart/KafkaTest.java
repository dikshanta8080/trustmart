package com.trustmart.trustmart;

import com.trustmart.trustmart.common.helpers.KafkaTopics;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.kafka.core.KafkaTemplate;

@RequiredArgsConstructor
//@Component
//@Order(2)
public class KafkaTest implements CommandLineRunner {
    private final KafkaTemplate<String, Object> kafkaTemplate;

    @Override
    public void run(String... args) throws Exception {
        for (int i = 0; i <= 100000000; i++) {
            kafkaTemplate.send(KafkaTopics.DEMO_TOPIC, String.valueOf(i), "Hello IPRAKASH " + i).whenComplete(
                    (result, ex) -> {
                        if (ex == null) {
                            System.out.println("message sent");
                        } else {
                            System.out.println("failed to send");
                        }
                    }
            );
        }
    }
}
