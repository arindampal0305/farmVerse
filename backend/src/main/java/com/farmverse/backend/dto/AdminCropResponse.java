package com.farmverse.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminCropResponse {
    private Long id;
    private String cropName;
    private String cropType;
    private Integer quantity;
    private Double revenue;
    private LocalDate sowingDate;
    private LocalDate harvestDate;
    private LocalDateTime createdAt;
    private Long farmId;
    private String farmName;
    private String farmerUsername;
    private String farmerFullName;
}
