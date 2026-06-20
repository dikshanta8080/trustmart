package com.trustmart.trustmart.common.repository;

import com.trustmart.trustmart.common.model.ImageData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface ImageDataRepository extends JpaRepository<ImageData, UUID> {
    Optional<ImageData> findByFileName(String fileName);
}
