package com.farmverse.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.farmverse.backend.dto.AddCropRequest;
import com.farmverse.backend.dto.ApiResponse;
import com.farmverse.backend.dto.CropDetail;
import com.farmverse.backend.dto.CropRequest;
import com.farmverse.backend.dto.ViewCropResponse;
import com.farmverse.backend.entity.Crop;
import com.farmverse.backend.entity.Farm;
import com.farmverse.backend.entity.User;
import com.farmverse.backend.repository.CropRepository;
import com.farmverse.backend.repository.FarmRepository;
import com.farmverse.backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CropService {

    private final CropRepository cropRepository;
    private final FarmRepository farmRepository;
    private final UserRepository userRepository;
    private final ApplicationHistoryService applicationHistoryService;

    private User getCurrentFarmer(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }

    // ==================== ADD CROP ====================

    public ApiResponse addCrop(AddCropRequest request, String username) {

        User farmer = getCurrentFarmer(username);

        Farm farm = farmRepository.findByIdAndFarmerId(
                request.getFarmId(),
                farmer.getId()
        ).orElseThrow(() -> new IllegalArgumentException("Farm not found"));

        Crop crop = new Crop();
        crop.setCropName(request.getCropName());
        crop.setCropType(request.getCropType());
        crop.setQuantity(request.getQuantity());
        crop.setSowingDate(request.getSowingDate());
        crop.setHarvestDate(request.getHarvestDate());
        crop.setRevenue(request.getRevenue());
        crop.setFarm(farm);

        Crop saved = cropRepository.save(crop);
        applicationHistoryService.log(
                username,
                "ADD_CROP",
                "CROP",
                saved.getId().toString(),
                "Added crop " + saved.getCropName()
        );
        return ApiResponse.ok(
                "Crop added successfully",
                saved.getId().toString()
        );
    }

    // ==================== EDIT CROP ====================

    public ApiResponse editCrop(Long cropId,
                                CropRequest request,
                                String username) {

        User farmer = getCurrentFarmer(username);

        Crop crop = cropRepository
                .findByIdAndFarm_Farmer_Id(cropId, farmer.getId())
                .orElseThrow(() ->
                        new IllegalArgumentException("Crop not found"));

        crop.setCropName(request.getCropName());
        crop.setCropType(request.getCropType());
        crop.setQuantity(request.getQuantity());
        crop.setSowingDate(request.getSowingDate());
        crop.setHarvestDate(request.getHarvestDate());
        crop.setRevenue(request.getRevenue());

        cropRepository.save(crop);
        applicationHistoryService.log(
                username,
                "EDIT_CROP",
                "CROP",
                crop.getId().toString(),
                "Updated crop " + crop.getCropName()
        );

        return ApiResponse.ok(
                "Crop updated successfully",
                crop.getId().toString()
        );
    }

    // ==================== DELETE CROP ====================

    public ApiResponse deleteCrop(Long cropId,
                                  String username) {

        User farmer = getCurrentFarmer(username);

        Crop crop = cropRepository
                .findByIdAndFarm_Farmer_Id(cropId, farmer.getId())
                .orElseThrow(() ->
                        new IllegalArgumentException("Crop not found"));

        cropRepository.delete(crop);
        applicationHistoryService.log(
                username,
                "DELETE_CROP",
                "CROP",
                cropId.toString(),
                "Crop deleted successfully"
        );

        return ApiResponse.ok(
                "Crop deleted successfully",
                cropId.toString()
        );
    }

    // ==================== VIEW ONE CROP ====================

    public ViewCropResponse viewCrop(Long cropId,
                                     String username) {

        User farmer = getCurrentFarmer(username);

        Crop crop = cropRepository
                .findByIdAndFarm_Farmer_Id(cropId, farmer.getId())
                .orElseThrow(() ->
                        new IllegalArgumentException("Crop not found"));

        CropDetail detail = new CropDetail(
                crop.getId(),
                crop.getCropName(),
                crop.getCropType(),
                crop.getQuantity(),
                crop.getSowingDate(),
                crop.getHarvestDate(),
                crop.getFarm().getFarmName(),
                crop.getRevenue()
        );

        return new ViewCropResponse(
                "ok",
                "200",
                "Crop details fetched successfully",
                detail
        );
    }

    // ==================== VIEW ALL CROPS ====================

    public List<CropDetail> viewAllCrops(String username) {

        User farmer = getCurrentFarmer(username);

        List<Crop> crops = cropRepository.findByFarm_Farmer_Id(
                farmer.getId()
        );

        return crops.stream()
                .map(crop -> new CropDetail(
                        crop.getId(),
                        crop.getCropName(),
                        crop.getCropType(),
                        crop.getQuantity(),
                        crop.getSowingDate(),
                        crop.getHarvestDate(),
                        crop.getFarm().getFarmName(),
                        crop.getRevenue()
                ))
                .toList();
    }

}