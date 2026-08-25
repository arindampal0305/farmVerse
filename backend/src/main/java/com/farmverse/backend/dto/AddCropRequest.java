package com.farmverse.backend.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class AddCropRequest extends CropRequest {
    @NotNull(message = "Farm ID is required")
    private Long farmId;
}