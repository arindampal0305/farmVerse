package com.farmverse.backend.service;
import java.util.List;

import org.springframework.stereotype.Service;

import com.farmverse.backend.dto.ApiResponse;
import com.farmverse.backend.dto.CropDetail;
import com.farmverse.backend.dto.FarmDetail;
import com.farmverse.backend.dto.FarmRequest;
import com.farmverse.backend.dto.FarmSummary;
import com.farmverse.backend.dto.ListFarmsResponse;
import com.farmverse.backend.dto.ViewFarmRespose;
import com.farmverse.backend.entity.Farm;
import com.farmverse.backend.entity.User;
import com.farmverse.backend.repository.FarmRepository;
import com.farmverse.backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FarmService {
    private final FarmRepository farmRepository;
    private final UserRepository userRepository;
    private final ApplicationHistoryService applicationHistoryService;

    private User getCurrentFarmer(String username){
        return userRepository.findByUsername(username).orElseThrow(() -> new IllegalArgumentException("User not found"));
    }

    public ApiResponse addFarm(FarmRequest request, String username){
        User farmer = getCurrentFarmer(username);
        Farm farm = new Farm();
        farm.setFarmName(request.getFarmName());
        farm.setFarmType(request.getFarmType());
        farm.setAreaSqMt(request.getAreaSqMt());
        farm.setSoilType(request.getSoilType());
        farm.setLocation(request.getLocation());
        farm.setFarmer(farmer);

        Farm saved = farmRepository.save(farm);
        applicationHistoryService.log(
                username,
                "ADD_FARM",
                "FARM",
                saved.getId().toString(),
                "Added farm " + saved.getFarmName()
        );
        return ApiResponse.ok("Farm added successfully", saved.getId().toString());
    }

    public ApiResponse editFarm(Long farmId, FarmRequest request, String username){
        User farmer = getCurrentFarmer(username);
        Farm farm = farmRepository.findByIdAndFarmerId(farmId, farmer.getId()).orElseThrow(()-> new IllegalArgumentException("Farm not found"));

        farm.setFarmName(request.getFarmName());
        farm.setFarmType(request.getFarmType());
        farm.setAreaSqMt(request.getAreaSqMt());
        farm.setSoilType(request.getSoilType());
        farm.setLocation(request.getLocation());


        farmRepository.save(farm);
        applicationHistoryService.log(
                username,
                "EDIT_FARM",
                "FARM",
                farm.getId().toString(),
                "Updated farm " + farm.getFarmName()
        );
        return ApiResponse.ok("Farm updated successfully", farm.getId().toString());
    }

    public ApiResponse deleteFarm(Long farmId, String username) {

        User farmer = getCurrentFarmer(username);

        Farm farm = farmRepository
                .findByIdAndFarmerId(farmId, farmer.getId())
                .orElseThrow(() ->
                        new IllegalArgumentException("Farm not found"));

        farmRepository.delete(farm);

        applicationHistoryService.log(
                username,
                "DELETE_FARM",
                "FARM",
                farmId.toString(),
                "Farm deleted successfully"
        );

        return ApiResponse.ok(
                "Farm & its crops deleted successfully",
                farmId.toString()
        );
    }

    public ViewFarmRespose viewFarm(Long farmId, String username) {

    User farmer = getCurrentFarmer(username);

    Farm farm = farmRepository
            .findByIdAndFarmerId(farmId, farmer.getId())
            .orElseThrow(() -> new IllegalArgumentException("Farm not found"));

    List<CropDetail> cropDetails = farm.getCrops().stream()
            .map(crop -> new CropDetail(
                    crop.getId(),
                    crop.getCropName(),
                    crop.getCropType(),
                    crop.getQuantity(),
                    crop.getSowingDate(),
                    crop.getHarvestDate(),
                    farm.getFarmName(),
                    crop.getRevenue()
            ))
            .toList();

    FarmDetail detail = new FarmDetail(
            farm.getId(),
            farm.getFarmName(),
            farm.getFarmType(),
            farm.getAreaSqMt(),
            farm.getSoilType(),
            farm.getLocation(),
            cropDetails
    );

    return new ViewFarmRespose(
            "ok",
            "200",
            "Farm details fetched successfully",
            detail
    );
}
    public ListFarmsResponse listAllFarms(String username){
        User farmer = getCurrentFarmer(username);
        List<Farm> farms = farmRepository.findByFarmerId(farmer.getId());
        List<FarmSummary> summaries = farms.stream().map(farm -> new FarmSummary(
            farm.getId(),
            farm.getFarmName(),
            farm.getFarmType(),
            farm.getAreaSqMt(),
            farm.getSoilType(),
            farm.getLocation(),
            farm.getCrops().size(),
            farm.getCrops().stream().map(c -> c.getCropName()).toList()
        )).toList();
        return new ListFarmsResponse("ok","200","Farms fetched successfully", summaries);
    }
}
