package com.farmverse.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FarmerDashboardResponse {

    private String status;
    private String statusCode;
    private String message;
    private String fullName;
    private long totalFarms;
    private long totalCrops;
}