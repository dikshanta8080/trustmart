package com.trustmart.trustmart.common.model;

import jakarta.persistence.Entity;
import lombok.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class ImageData extends BaseEntity {
    private String originalName;

    private String fileName;

    private String filePath;

    private String contentType;

    private Long size;
}
