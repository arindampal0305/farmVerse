package com.farmverse.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminFarmResponse {
    private Long id;
    private String farmName;
    private String farmType;
    private BigDecimal areaSqMt;
    private String location;
    private String soilType;
    private LocalDateTime createdAt;
    private String farmerUsername;
    private String farmerFullName;
}
