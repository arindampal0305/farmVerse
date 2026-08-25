package com.farmverse.backend.service;

import com.farmverse.backend.dto.*;
import com.farmverse.backend.entity.User;
import com.farmverse.backend.entity.Farm;
import com.farmverse.backend.entity.Crop;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.farmverse.backend.enums.Role;
import com.farmverse.backend.repository.CropRepository;
import com.farmverse.backend.repository.FarmRepository;
import com.farmverse.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final UserRepository userRepository;
    private final FarmRepository farmRepository;
    private final CropRepository cropRepository;
    private final PasswordEncoder passwordEncoder;
    private final ApplicationHistoryService applicationHistoryService;

    public AdminDashboardResponse getDashboard() {

        long totalFarmers = userRepository.countByRole(Role.FARMER);
        long totalFarms = farmRepository.count();
        long totalCrops = cropRepository.count();

        return new AdminDashboardResponse(
                "ok",
                "200",
                "Dashboard data fetched successfully",
                totalFarmers,
                totalFarms,
                totalCrops
        );
    }

    public List<FarmerResponse> getAllFarmers() {

        return userRepository.findAll()
                .stream()
                .map(user -> new FarmerResponse(
                        user.getFullName() + (user.getRole() == Role.ADMIN ? " (Admin)" : ""),
                        user.getUsername(),
                        farmRepository.countByFarmerId(user.getId())
                ))
                .collect(Collectors.toList());
    }

    public List<AdminFarmResponse> getAllFarms() {
        return farmRepository.findAll()
                .stream()
                .map(farm -> new AdminFarmResponse(
                        farm.getId(),
                        farm.getFarmName(),
                        farm.getFarmType(),
                        farm.getAreaSqMt(),
                        farm.getLocation(),
                        farm.getSoilType(),
                        farm.getCreatedAt(),
                        farm.getFarmer().getUsername(),
                        farm.getFarmer().getFullName()
                ))
                .collect(Collectors.toList());
    }

    public List<AdminCropResponse> getAllCrops() {
        return cropRepository.findAll()
                .stream()
                .map(crop -> new AdminCropResponse(
                        crop.getId(),
                        crop.getCropName(),
                        crop.getCropType(),
                        crop.getQuantity(),
                        crop.getRevenue(),
                        crop.getSowingDate(),
                        crop.getHarvestDate(),
                        crop.getCreatedAt(),
                        crop.getFarm().getId(),
                        crop.getFarm().getFarmName(),
                        crop.getFarm().getFarmer().getUsername(),
                        crop.getFarm().getFarmer().getFullName()
                ))
                .collect(Collectors.toList());
    }

    public AddFarmerResponse addFarmer(
            AddFarmerRequest request,
            String adminUsername) {

        if (userRepository.existsByUsername(request.getUsername())) {
            return new AddFarmerResponse(
                    "error",
                    "400",
                    "Username already taken",
                    null
            );
        }

        User user = new User();
        user.setFullName(request.getFullName());
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.FARMER);

        User savedUser = userRepository.save(user);

        applicationHistoryService.log(
                adminUsername,
                "ADD_FARMER",
                "FARMER",
                String.valueOf(savedUser.getId()),
                "Added farmer " + savedUser.getFullName()
        );

        return new AddFarmerResponse(
                "ok",
                "200",
                "Farmer added successfully",
                String.valueOf(savedUser.getId())
        );
    }

    public AddFarmerResponse addAdmin(AddFarmerRequest request) {

        if (userRepository.existsByUsername(request.getUsername())) {
            return new AddFarmerResponse(
                    "error",
                    "400",
                    "Username already taken",
                    null
            );
        }

        User user = new User();
        user.setFullName(request.getFullName());
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.ADMIN);

        User savedUser = userRepository.save(user);

        return new AddFarmerResponse(
                "ok",
                "200",
                "Admin added successfully",
                String.valueOf(savedUser.getId())
        );
    }

    public EditFarmerResponse editFarmer(
            String username,
            EditFarmerRequest request,
            String adminUsername) {

        User user = userRepository.findByUsername(username).orElse(null);

        if (user == null) {
            return new EditFarmerResponse(
                    "error",
                    "404",
                    "Farmer not found",
                    null
            );
        }

        if (!user.getUsername().equals(request.getUsername())
                && userRepository.existsByUsername(request.getUsername())) {

            return new EditFarmerResponse(
                    "error",
                    "400",
                    "Username already taken",
                    null
            );
        }

        user.setFullName(request.getFullName());
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        User updatedUser = userRepository.save(user);

        applicationHistoryService.log(
                adminUsername,
                "EDIT_FARMER",
                "FARMER",
                String.valueOf(updatedUser.getId()),
                "Updated farmer " + updatedUser.getFullName()
        );

        return new EditFarmerResponse(
                "ok",
                "200",
                "Farmer updated successfully",
                String.valueOf(updatedUser.getId())
        );
    }

    public DeleteFarmerResponse deleteFarmer(
            String username,
            String adminUsername) {

        User user = userRepository.findByUsername(username).orElse(null);

        if (user == null) {
            return new DeleteFarmerResponse(
                    "error",
                    "404",
                    "Farmer not found",
                    null
            );
        }

        Long id = user.getId();

        userRepository.delete(user);

        applicationHistoryService.log(
                adminUsername,
                "DELETE_FARMER",
                "FARMER",
                String.valueOf(id),
                "Deleted farmer " + user.getFullName()
        );

        return new DeleteFarmerResponse(
                "ok",
                "200",
                "Farmer deleted successfully",
                String.valueOf(id)
        );
    }

    public ApiResponse addFarm(AdminAddFarmRequest request) {
        User farmer = userRepository
                .findByUsername(request.getFarmerUsername())
                .orElse(null);

        if (farmer == null) {
            return ApiResponse.error("404", "Farmer not found");
        }

        Farm farm = new Farm();
        farm.setFarmName(request.getFarmName());
        farm.setFarmType(request.getFarmType());
        farm.setAreaSqMt(request.getAreaSqMt());
        farm.setLocation(request.getLocation());
        farm.setSoilType(request.getSoilType());
        farm.setFarmer(farmer);

        farmRepository.save(farm);

        return ApiResponse.ok("Farm added successfully", null);
    }

    public ApiResponse editFarm(
            Long farmId,
            AdminEditFarmRequest request) {

        Farm farm = farmRepository.findById(farmId).orElse(null);

        if (farm == null) {
            return ApiResponse.error("404", "Farm not found");
        }

        User farmer = userRepository
                .findByUsername(request.getFarmerUsername())
                .orElse(null);

        if (farmer == null) {
            return ApiResponse.error("404", "Farmer not found");
        }

        farm.setFarmName(request.getFarmName());
        farm.setFarmType(request.getFarmType());
        farm.setAreaSqMt(request.getAreaSqMt());
        farm.setLocation(request.getLocation());
        farm.setSoilType(request.getSoilType());
        farm.setFarmer(farmer);

        farmRepository.save(farm);

        return ApiResponse.ok("Farm updated successfully", null);
    }

    public ApiResponse deleteFarm(Long farmId) {
        Farm farm = farmRepository.findById(farmId).orElse(null);

        if (farm == null) {
            return ApiResponse.error("404", "Farm not found");
        }

        farmRepository.delete(farm);

        return ApiResponse.ok("Farm deleted successfully", null);
    }
}