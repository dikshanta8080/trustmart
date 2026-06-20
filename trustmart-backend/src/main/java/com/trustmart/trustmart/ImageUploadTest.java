package com.trustmart.trustmart;

import com.trustmart.trustmart.common.model.ImageData;
import com.trustmart.trustmart.common.repository.ImageDataRepository;
import com.trustmart.trustmart.common.service.ImageUploadService;
import com.trustmart.trustmart.product.dto.response.ImageDataResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ImageUploadTest {
    private final ImageUploadService imageUploadService;
    private final ImageDataRepository imageDataRepository;

    @Transactional
    public List<ImageDataResponse> uploadImages(List<MultipartFile> multipartFiles) {
        List<ImageData> list = multipartFiles.stream().map(multipartFile -> imageDataRepository.save(
                imageUploadService.save(multipartFile)
        )).toList();
        return list.stream()
                .map(imageData ->
                        ImageDataResponse.builder()
                                .imageId(imageData.getId())
                                .name(imageData.getFileName())
                                .build())
                .toList();
    }
}
