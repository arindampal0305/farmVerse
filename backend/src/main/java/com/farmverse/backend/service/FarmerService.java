package com.farmverse.backend.service;

import com.farmverse.backend.dto.FarmerDashboardResponse;
import com.farmverse.backend.entity.User;
import com.farmverse.backend.repository.CropRepository;
import com.farmverse.backend.repository.FarmRepository;
import com.farmverse.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FarmerService {

    private final UserRepository userRepository;
    private final FarmRepository farmRepository;
    private final CropRepository cropRepository;

    public FarmerDashboardResponse getDashboard(String username) {

        User farmer = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("Farmer not found"));

        return new FarmerDashboardResponse(
                "ok",
                "200",
                "Dashboard data fetched successfully",
                farmer.getFullName(),
                farmRepository.countByFarmerId(farmer.getId()),
                cropRepository.countByFarm_Farmer_Id(farmer.getId())
        );
    }
}