package com.farmverse.backend.dto;

import java.math.BigDecimal;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class FarmRequest {

    @NotBlank(message = "Farm name is required")
    private String farmName;

    @NotBlank(message = "Farm type is required")
    private String farmType;

    @NotNull(message = "Area is required")
    @Positive(message = "Area must be greater than 0")
    private BigDecimal areaSqMt;

    @NotBlank(message = "Soil type is needed")
    private String soilType;

    @NotBlank(message = "Location is needed")
    private String location;

    
}