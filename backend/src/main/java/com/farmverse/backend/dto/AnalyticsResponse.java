package com.farmverse.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AnalyticsResponse {
    private Double totalProduction;
    private Double totalRevenue;
    private Map<String, Double> cropProduction;
    private Map<String, Double> monthlyProduction;
    private List<MonthlyReportEntry> monthlyReport;
    private Long activeFarms;
    private Long totalCrops;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class MonthlyReportEntry {
        private String month;
        private Double production;
        private Double revenue;
        private String status;
    }
}
