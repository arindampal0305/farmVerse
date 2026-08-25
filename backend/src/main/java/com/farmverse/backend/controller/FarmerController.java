package com.farmverse.backend.controller;

import com.farmverse.backend.dto.FarmerDashboardResponse;
import com.farmverse.backend.service.FarmerService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/farmverse/farmer")
@RequiredArgsConstructor
public class FarmerController {

    private final FarmerService farmerService;

    @GetMapping("/dashboard")
    public ResponseEntity<?> dashboard(Authentication authentication) {

        try {
            FarmerDashboardResponse response =
                    farmerService.getDashboard(authentication.getName());

            return ResponseEntity.ok(response);

        } catch (IllegalArgumentException e) {

            FarmerDashboardResponse response = new FarmerDashboardResponse(
                    "error",
                    "400",
                    e.getMessage(),
                    null,
                    0,
                    0
            );

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
}