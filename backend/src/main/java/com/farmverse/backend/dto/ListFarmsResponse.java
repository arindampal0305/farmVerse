package com.farmverse.backend.dto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ListFarmsResponse {
    private String status;
    private String statusCode;
    private String message;
    private List<FarmSummary> farms;
}