package com.farmverse.backend.dto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import java.time.LocalDate;

@Data
public class CropRequest {

    @NotBlank(message = "Crop name is required")
    private String cropName;
    @NotBlank(message = "Crop type is required")
    private String cropType;
    @NotNull(message = "Quantity is required")
    @Positive(message = "Quantity must be greater than 0")
    private Integer quantity;
    @NotNull(message = "Sowing date is required")
    @com.fasterxml.jackson.annotation.JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate sowingDate;
    
    @NotNull(message = "Harvest date is required")
    @com.fasterxml.jackson.annotation.JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate harvestDate;
    
    private Double revenue;
}