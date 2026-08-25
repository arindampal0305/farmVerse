package com.farmverse.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<com.farmverse.backend.dto.ApiResponse> handleValidationException(MethodArgumentNotValidException ex) {

        String error = ex.getBindingResult()
                .getFieldError()
                .getDefaultMessage();

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(com.farmverse.backend.dto.ApiResponse.error("400", error));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<com.farmverse.backend.dto.ApiResponse> handleAllExceptions(Exception ex) {
        ex.printStackTrace();
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(com.farmverse.backend.dto.ApiResponse.error("500", ex.getMessage() != null ? ex.getMessage() : ex.getClass().getName()));
    }
}