package com.trustmart.trustmart.auth.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
public class AdminController {
    @GetMapping
    @PreAuthorize("hasAuthority('GREET_ADMIN')")
    public ResponseEntity<String> greetAdmin() {
        return ResponseEntity.ok("Hello Admin");
    }
}
