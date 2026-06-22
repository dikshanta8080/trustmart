package com.trustmart.trustmart.common.service;

import com.trustmart.trustmart.common.model.ImageData;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class ImageUploadService {
    @Value("${file.upload-dir}")
    private String uploadDir;

    public ImageData save(MultipartFile multipartFile) {
        try {
            String fileName = UUID.randomUUID() + "_" + multipartFile.getOriginalFilename();
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }
            Path filePath = uploadPath.resolve(fileName);
            Files.copy(multipartFile
                    .getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
            return ImageData.builder()
                    .originalName(multipartFile.getOriginalFilename())
                    .fileName(fileName)
                    .filePath(filePath.toString())
                    .contentType(multipartFile.getContentType())
                    .size(multipartFile.getSize())
                    .build();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
