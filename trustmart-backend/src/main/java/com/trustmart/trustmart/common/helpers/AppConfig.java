package com.trustmart.trustmart.common.helpers;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "app")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Setter
public class AppConfig {
    private Jwt jwt;
    private Admin admin;

    @Getter
    public static class Jwt {
        private Long expiry;
        private String secret;
    }

    @Getter
    public static class Admin {
        private String name;
        private String email;
        private String password;
    }
}
