package com.farmverse.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AdminDashboardResponse {

    private String status;
    private String statusCode;
    private String message;
    private long totalFarmers;
    private long totalFarms;
    private long totalCrops;
}