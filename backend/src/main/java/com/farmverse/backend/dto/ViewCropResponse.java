package com.farmverse.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ViewCropResponse {
    private String status;
    private String statusCode;
    private String message;
    private CropDetail crop;
}