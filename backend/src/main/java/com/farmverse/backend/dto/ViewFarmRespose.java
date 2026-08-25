package com.farmverse.backend.dto;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ViewFarmRespose {
    private String status;
    private String statusCode;
    private String message;
    private FarmDetail farm;
}
