package com.farmverse.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.farmverse.backend.dto.AuthResponse;
import com.farmverse.backend.dto.ForgotPasswordRequest;
import com.farmverse.backend.dto.LoginRequest;
import com.farmverse.backend.dto.RegisterRequest;
import com.farmverse.backend.dto.ResetPasswordRequest;
import com.farmverse.backend.service.AuthService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthService authService;

    /**
     * Register
     */
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(
            @Valid @RequestBody RegisterRequest request) {

        return ResponseEntity.ok(authService.register(request));
    }

    /**
     * Login
     */
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(
            @Valid @RequestBody LoginRequest request) {

        return ResponseEntity.ok(authService.login(request));
    }

    /**
     * Forgot Password - Send OTP
     */
    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(
            @Valid @RequestBody ForgotPasswordRequest request) {

        return ResponseEntity.ok(authService.forgotPassword(request));
    }

    /**
     * Reset Password using OTP
     */
    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(
            @Valid @RequestBody ResetPasswordRequest request) {

        return ResponseEntity.ok(authService.resetPassword(request));
    }

    @PostMapping("/create-admin")
public ResponseEntity<AuthResponse> createAdmin(
        @Valid @RequestBody RegisterRequest request,
        Authentication authentication
) {
    return ResponseEntity.ok(
            authService.createAdmin(request, authentication.getName())
    );
}

}