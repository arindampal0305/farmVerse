package com.farmverse.backend.controller;

import com.farmverse.backend.dto.ApplicationHistoryResponse;
import com.farmverse.backend.service.ApplicationHistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/farmverse")
@RequiredArgsConstructor
public class ApplicationHistoryController {

    private final ApplicationHistoryService applicationHistoryService;

    // Admin can see everyone's history
    @GetMapping("/admin/history")
    public List<ApplicationHistoryResponse> getAllHistory() {
        return applicationHistoryService.getAllHistory();
    }

    // Farmer can see only their own history
    @GetMapping("/farmer/history")
    public List<ApplicationHistoryResponse> getMyHistory(
            Authentication authentication) {

        return applicationHistoryService
                .getUserHistory(authentication.getName());
    }
}