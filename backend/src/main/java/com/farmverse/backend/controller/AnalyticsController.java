package com.farmverse.backend.controller;

import com.farmverse.backend.dto.AnalyticsResponse;
import com.farmverse.backend.service.AnalyticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/farmverse/analytics")
@RequiredArgsConstructor
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    @GetMapping
    public ResponseEntity<AnalyticsResponse> getAnalytics(Authentication authentication) {
        AnalyticsResponse response = analyticsService.getAnalytics(authentication.getName());
        return ResponseEntity.ok(response);
    }
}
