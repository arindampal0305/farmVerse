package com.farmverse.backend.dto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CropSummary {
    private Long cropId;
    private String cropName;
}


// This is for the crop name list inside [View Farm]