package com.farmverse.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class EditFarmerResponse {

    private String status;
    private String statusCode;
    private String message;
    private String id;
}