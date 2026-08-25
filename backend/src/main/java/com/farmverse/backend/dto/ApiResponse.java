package com.farmverse.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponse {

    private String status;
    private String statusCode;
    private String message;
    private String id;

    public static ApiResponse ok(String message, String id) {
        return new ApiResponse("ok", "200", message, id);
    }

    public static ApiResponse error(String statusCode, String message) {
        return new ApiResponse("error", statusCode, message, null);
    }
}

/*
This is to ensure that responses are sent uniformly upon agreed format given in the API contract.
 */