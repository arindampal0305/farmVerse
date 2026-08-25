package com.farmverse.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.farmverse.backend.dto.AddCropRequest;
import com.farmverse.backend.dto.ApiResponse;
import com.farmverse.backend.dto.CropRequest;
import com.farmverse.backend.dto.ViewCropResponse;
import com.farmverse.backend.service.CropService;
import org.springframework.web.bind.annotation.CrossOrigin;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/farmverse/crops")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class CropController {

    private final CropService cropService;

    @PostMapping("/addCrop")
    public ResponseEntity<ApiResponse> addCrop(
            @Valid @RequestBody AddCropRequest request,
            Authentication authentication
    ) {
        try {
            ApiResponse response = cropService.addCrop(request, authentication.getName());
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ApiResponse.error("404", e.getMessage()));
        }
    }

    @PutMapping("/editCrop/{cropId}")
    public ResponseEntity<ApiResponse> editCrop(
            @PathVariable Long cropId,
            @Valid @RequestBody CropRequest request,
            Authentication authentication
    ) {
        try {
            ApiResponse response = cropService.editCrop(cropId, request, authentication.getName());
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ApiResponse.error("404", e.getMessage()));
        }
    }

    @DeleteMapping("/deleteCrop/{cropId}")
    public ResponseEntity<ApiResponse> deleteCrop(
            @PathVariable Long cropId,
            Authentication authentication
    ) {
        try {
            ApiResponse response = cropService.deleteCrop(cropId, authentication.getName());
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ApiResponse.error("404", e.getMessage()));
        }
    }

    @GetMapping("/viewCrop/{cropId}")
    public ResponseEntity<?> viewCrop(
            @PathVariable Long cropId,
            Authentication authentication
    ) {
        try {
            ViewCropResponse response = cropService.viewCrop(cropId, authentication.getName());
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ApiResponse.error("404", e.getMessage()));
        }
    }
    @GetMapping("/viewAll")
public ResponseEntity<?> viewAllCrops(Authentication authentication) {

    try {

        return ResponseEntity.ok(
                cropService.viewAllCrops(authentication.getName())
        );

    } catch (IllegalArgumentException e) {

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(ApiResponse.error("404", e.getMessage()));

    }

}
    
}