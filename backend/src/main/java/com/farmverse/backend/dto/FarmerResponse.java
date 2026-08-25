package com.farmverse.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class FarmerResponse {

    private String fullName;
    private String username;
    private long farmCount;
}