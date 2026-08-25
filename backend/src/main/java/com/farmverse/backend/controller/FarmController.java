package com.farmverse.backend.controller;
import com.farmverse.backend.dto.*;
import com.farmverse.backend.service.FarmService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/farmverse/farms")
@RequiredArgsConstructor
public class FarmController {
    private final FarmService farmService;

    @PostMapping("/addFarm")
    public ResponseEntity<ApiResponse> addFarm(@Valid @RequestBody FarmRequest request, Authentication authentication){
        try{
            ApiResponse response = farmService.addFarm(request, authentication.getName());
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch(IllegalArgumentException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ApiResponse.error("400",e.getMessage()));
        }
    }

    @PutMapping("/editFarm/{farmId}")
    public ResponseEntity<ApiResponse> editFarm(@PathVariable Long farmId, @Valid @RequestBody FarmRequest request, Authentication authentication){
        try{
            ApiResponse response = farmService.editFarm(farmId, request, authentication.getName());
            return ResponseEntity.ok(response);
        } catch(IllegalArgumentException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ApiResponse.error("404",e.getMessage()));
        }
    }

    @DeleteMapping("/deleteFarm/{farmId}")
    public ResponseEntity<ApiResponse> deleteFarm(@PathVariable Long farmId, Authentication authentication){
        try{
            ApiResponse response = farmService.deleteFarm(farmId, authentication.getName());
            return ResponseEntity.ok(response);
        } catch(IllegalArgumentException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ApiResponse.error("404",e.getMessage()));
        }
    }

    @GetMapping("/viewFarm/{farmId}")
    public ResponseEntity<?> viewFarm(@PathVariable Long farmId, Authentication authentication){
        try{
            ViewFarmRespose response = farmService.viewFarm(farmId, authentication.getName());
            return ResponseEntity.ok(response);
        }catch(IllegalArgumentException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ApiResponse.error("404", e.getMessage()));
        }
    }

    @GetMapping("/viewAllFarms")
    public ResponseEntity<ListFarmsResponse> listAllFarms(Authentication authentication) {
        ListFarmsResponse response = farmService.listAllFarms(authentication.getName());
        return ResponseEntity.ok(response);
    }
}
