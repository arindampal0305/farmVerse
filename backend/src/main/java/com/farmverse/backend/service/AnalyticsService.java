package com.farmverse.backend.service;

import com.farmverse.backend.dto.AnalyticsResponse;
import com.farmverse.backend.entity.Crop;
import com.farmverse.backend.entity.User;
import com.farmverse.backend.repository.CropRepository;
import com.farmverse.backend.repository.UserRepository;
import com.farmverse.backend.repository.FarmRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Month;
import java.time.format.TextStyle;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AnalyticsService {

    private final CropRepository cropRepository;
    private final UserRepository userRepository;
    private final FarmRepository farmRepository;

    public AnalyticsResponse getAnalytics(String username) {
        User farmer = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        List<Crop> crops = cropRepository.findAllByFarm_Farmer_Id(farmer.getId());
        long activeFarms = farmRepository.countByFarmerId(farmer.getId());
        long totalCrops = cropRepository.countByFarm_Farmer_Id(farmer.getId());

        double totalProduction = 0;
        double totalRevenue = 0;
        Map<String, Double> cropProduction = new HashMap<>();
        Map<String, Double> monthlyProduction = new HashMap<>();
        List<AnalyticsResponse.MonthlyReportEntry> monthlyReport = new ArrayList<>();

        Map<String, Double> monthlyRevenue = new HashMap<>();

        for (Crop crop : crops) {
            double qty = crop.getQuantity() != null ? crop.getQuantity() : 0;
            double rev = crop.getRevenue() != null ? crop.getRevenue() : 0;

            totalProduction += qty;
            totalRevenue += rev;

            cropProduction.put(crop.getCropName(), cropProduction.getOrDefault(crop.getCropName(), 0.0) + qty);

            if (crop.getHarvestDate() != null) {
                Month month = crop.getHarvestDate().getMonth();
                String monthName = month.getDisplayName(TextStyle.FULL, Locale.ENGLISH);
                monthlyProduction.put(monthName, monthlyProduction.getOrDefault(monthName, 0.0) + qty);
                monthlyRevenue.put(monthName, monthlyRevenue.getOrDefault(monthName, 0.0) + rev);
            }
        }

        for (String monthName : monthlyProduction.keySet()) {
            double prod = monthlyProduction.get(monthName);
            double rev = monthlyRevenue.getOrDefault(monthName, 0.0);
            String status = "Good";
            if (rev > 500000) {
                status = "Excellent";
            } else if (rev < 100000) {
                status = "Fair";
            }
            monthlyReport.add(new AnalyticsResponse.MonthlyReportEntry(monthName, prod, rev, status));
        }

        return AnalyticsResponse.builder()
                .totalProduction(totalProduction)
                .totalRevenue(totalRevenue)
                .cropProduction(cropProduction)
                .monthlyProduction(monthlyProduction)
                .monthlyReport(monthlyReport)
                .activeFarms(activeFarms)
                .totalCrops(totalCrops)
                .build();
    }
}
