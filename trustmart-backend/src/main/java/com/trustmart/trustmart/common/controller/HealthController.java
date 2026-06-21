package com.trustmart.trustmart.common.controller;

import com.trustmart.trustmart.ImageUploadTest;
import com.trustmart.trustmart.common.dto.response.ApiResponse;
import com.trustmart.trustmart.common.dto.response.ImageDataResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/health")
public class HealthController {
    private final ImageUploadTest imageUploadTest;

    @GetMapping
    public ResponseEntity<String> getHealthStatus() {
        return ResponseEntity.ok("Tomcat is running in 8080");

    }

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<List<ImageDataResponse>>> uploadImages(@RequestPart List<MultipartFile> files) {
        List<ImageDataResponse> imageDataResponses = imageUploadTest.uploadImages(files);
        return ResponseEntity.ok(
                ApiResponse.success(imageDataResponses, "Images uploaded successfully")
        );
    }
}
