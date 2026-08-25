package com.farmverse.backend.controller;

import com.farmverse.backend.dto.*;
import com.farmverse.backend.service.AdminService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;

import java.util.List;

@RestController
@RequestMapping("/farmverse/admin")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/dashboard")
    public ResponseEntity<AdminDashboardResponse> dashboard() {
        return ResponseEntity.ok(adminService.getDashboard());
    }

    @GetMapping("/viewFarmers")
    public ResponseEntity<List<FarmerResponse>> viewFarmers() {
        return ResponseEntity.ok(adminService.getAllFarmers());
    }

    @GetMapping("/viewFarms")
    public ResponseEntity<List<AdminFarmResponse>> viewFarms() {
        return ResponseEntity.ok(adminService.getAllFarms());
    }

    @GetMapping("/viewCrops")
    public ResponseEntity<List<AdminCropResponse>> viewCrops() {
        return ResponseEntity.ok(adminService.getAllCrops());
    }

    @PostMapping("/addFarmer")
    public ResponseEntity addFarmer(
            @Valid @RequestBody AddFarmerRequest request,
            Authentication authentication) {

        AddFarmerResponse response =
                adminService.addFarmer(request, authentication.getName());

        if ("400".equals(response.getStatusCode())) {
            return ResponseEntity.badRequest().body(response);
        }

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/addAdmin")
    public ResponseEntity<AddFarmerResponse> addAdmin(
            @Valid @RequestBody AddFarmerRequest request) {

        AddFarmerResponse response = adminService.addAdmin(request);

        if ("400".equals(response.getStatusCode())) {
            return ResponseEntity.badRequest().body(response);
        }

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PutMapping("/editFarmer/{username}")
    public ResponseEntity<EditFarmerResponse> editFarmer(
            @PathVariable String username,
            @Valid @RequestBody EditFarmerRequest request,
            Authentication authentication) {

        EditFarmerResponse response =
                adminService.editFarmer(
                        username,
                        request,
                        authentication.getName()
                );

        if ("400".equals(response.getStatusCode())) {
            return ResponseEntity.badRequest().body(response);
        }

        if ("404".equals(response.getStatusCode())) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/deleteFarmer/{username}")
    public ResponseEntity<DeleteFarmerResponse> deleteFarmer(
            @PathVariable String username,
            Authentication authentication) {

        DeleteFarmerResponse response =
                adminService.deleteFarmer(
                        username,
                        authentication.getName()
                );

        if ("404".equals(response.getStatusCode())) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }

        return ResponseEntity.ok(response);
    }

    @PostMapping("/addFarm")
    public ResponseEntity<ApiResponse> addFarm(@Valid @RequestBody AdminAddFarmRequest request) {
        ApiResponse response = adminService.addFarm(request);
        if ("400".equals(response.getStatusCode())) {
            return ResponseEntity.badRequest().body(response);
        }
        if ("404".equals(response.getStatusCode())) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/editFarm/{farmId}")
    public ResponseEntity<ApiResponse> editFarm(
            @PathVariable Long farmId,
            @Valid @RequestBody AdminEditFarmRequest request) {
        ApiResponse response = adminService.editFarm(farmId, request);
        if ("400".equals(response.getStatusCode())) {
            return ResponseEntity.badRequest().body(response);
        }
        if ("404".equals(response.getStatusCode())) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/deleteFarm/{farmId}")
    public ResponseEntity<ApiResponse> deleteFarm(@PathVariable Long farmId) {
        ApiResponse response = adminService.deleteFarm(farmId);
        if ("404".equals(response.getStatusCode())) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
        return ResponseEntity.ok(response);
    }
}