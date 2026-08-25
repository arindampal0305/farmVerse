package com.farmverse.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ProfileUpdateRequest {
    @NotBlank(message = "Full Name is required")
    private String fullName;
    
    @NotBlank(message = "Phone Number is required")
    private String phone;
    
    @NotBlank(message = "Location is required")
    private String location;
}
