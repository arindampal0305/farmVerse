package com.farmverse.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class ApplicationHistoryResponse {

    private String username;
    private String action;
    private String entityType;
    private String entityId;
    private String description;
    private LocalDateTime timestamp;
}