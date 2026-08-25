package com.farmverse.backend.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminAddFarmRequest {

    @NotBlank(message = "Farm name is required")
    private String farmName;

    @NotBlank(message = "Farm type is required")
    private String farmType;

    @NotNull(message = "Area is required")
    @DecimalMin(value = "0.01", message = "Area must be greater than zero")
    private BigDecimal areaSqMt;

    @NotBlank(message = "Location is required")
    private String location;

    @NotBlank(message = "Soil type is required")
    private String soilType;

    @NotBlank(message = "Farmer username is required to assign this farm")
    private String farmerUsername;
}
