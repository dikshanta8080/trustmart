package com.trustmart.trustmart.common.helpers;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AdminInjector implements CommandLineRunner {
    private final AppConfig appConfig;

    @Override
    public void run(String... args) throws Exception {
        AppConfig.Admin admin = appConfig.getAdmin();

    }
}
