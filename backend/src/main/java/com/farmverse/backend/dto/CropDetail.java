package com.farmverse.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CropDetail {
    private Long cropId;
    private String cropName;
    private String cropType;
    private Integer quantity;
    private LocalDate sowingDate;
    private LocalDate harvestDate;
    private String farmName;
    private Double revenue;
}