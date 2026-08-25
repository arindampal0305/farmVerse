package com.farmverse.backend.service;

import java.time.LocalDateTime;
import java.util.Random;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.farmverse.backend.dto.AuthResponse;
import com.farmverse.backend.dto.ChangePasswordRequest;
import com.farmverse.backend.dto.ForgotPasswordRequest;
import com.farmverse.backend.dto.LoginRequest;
import com.farmverse.backend.dto.RegisterRequest;
import com.farmverse.backend.dto.ResetPasswordRequest;
import com.farmverse.backend.entity.PasswordResetOtp;
import com.farmverse.backend.entity.User;
import com.farmverse.backend.enums.Role;
import com.farmverse.backend.repository.PasswordResetOtpRepository;
import com.farmverse.backend.repository.UserRepository;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Getter
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final PasswordResetOtpRepository passwordResetOtpRepository;
    private final EmailService emailService;

    /**
     * Farmer Registration
     */
    public AuthResponse register(RegisterRequest request) {

        if (userRepository.existsByUsername(request.getUsername().trim())) {
            throw new IllegalArgumentException("Username already taken.");
        }

        if (userRepository.existsByEmail(request.getEmail().trim().toLowerCase())) {
            throw new IllegalArgumentException("Email already registered.");
        }

        User user = new User();
        user.setFullName(request.getFullName().trim());
        user.setUsername(request.getUsername().trim());
        user.setEmail(request.getEmail().trim().toLowerCase());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.FARMER);

        userRepository.save(user);

        String token = jwtService.generateToken(
                user.getUsername(),
                user.getRole().name()
        );

        return new AuthResponse(
                token,
                user.getUsername(),
                user.getEmail(),
                user.getRole().name()
        );
    }

    /**
     * Login
     */
    public AuthResponse login(LoginRequest request) {

        System.out.println("\n========== LOGIN DEBUG ==========");

        System.out.println("Received Username : '" + request.getUsername() + "'");
        System.out.println("Received Role     : '" + request.getRole() + "'");

        System.out.println("\nAll users in database:");

        userRepository.findAll().forEach(u -> {
            System.out.println("-----------------------------");
            System.out.println("Username : '" + u.getUsername() + "'");
            System.out.println("Email    : " + u.getEmail());
            System.out.println("Role     : " + u.getRole());
        });

        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() ->
                        new IllegalArgumentException("Invalid username or password."));

        System.out.println("\nUser Found Successfully");
        System.out.println("Username : " + user.getUsername());
        System.out.println("Role     : " + user.getRole());

        boolean passwordMatches =
                passwordEncoder.matches(request.getPassword(), user.getPassword());

        System.out.println("Password Matches : " + passwordMatches);

        if (!passwordMatches) {
            throw new IllegalArgumentException("Invalid username or password.");
        }

        if (!user.getRole().name().equalsIgnoreCase(request.getRole())) {
            throw new IllegalArgumentException(
                    "Selected role does not match this account."
            );
        }

        String token = jwtService.generateToken(
                user.getUsername(),
                user.getRole().name()
        );

        System.out.println("JWT Generated Successfully");

        return new AuthResponse(
                token,
                user.getUsername(),
                user.getEmail(),
                user.getRole().name()
        );
    }

    /**
     * Forgot Password - Send OTP
     */
    public String forgotPassword(ForgotPasswordRequest request) {

        User user = userRepository.findByEmail(
                request.getEmail().trim().toLowerCase()
        ).orElseThrow(() ->
                new IllegalArgumentException("No account found with this email."));

        passwordResetOtpRepository.findByUserId(user.getId())
                .ifPresent(passwordResetOtpRepository::delete);

        String otp = String.format(
                "%06d",
                new Random().nextInt(1000000)
        );

        PasswordResetOtp resetOtp = PasswordResetOtp.builder()
                .user(user)
                .otp(otp)
                .expiryTime(LocalDateTime.now().plusMinutes(5))
                .used(false)
                .build();

        passwordResetOtpRepository.save(resetOtp);

        emailService.sendOtpEmail(user.getEmail(), otp);

        return "OTP sent successfully.";
    }

    /**
     * Reset Password using OTP
     */
    public String resetPassword(ResetPasswordRequest request) {

        PasswordResetOtp resetOtp = passwordResetOtpRepository
                .findByUserEmail(request.getEmail().trim().toLowerCase())
                .orElseThrow(() ->
                        new IllegalArgumentException("OTP not found."));

        if (resetOtp.isUsed()) {
            throw new IllegalArgumentException("OTP has already been used.");
        }

        if (resetOtp.getExpiryTime().isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("OTP has expired.");
        }

        if (!resetOtp.getOtp().equals(request.getOtp())) {
            throw new IllegalArgumentException("Invalid OTP.");
        }

        User user = resetOtp.getUser();

        user.setPassword(
                passwordEncoder.encode(request.getNewPassword())
        );

        userRepository.save(user);

        resetOtp.setUsed(true);
        passwordResetOtpRepository.save(resetOtp);

        return "Password reset successful.";
    }

    /**
     * Create Admin
     */
    public AuthResponse createAdmin(
            RegisterRequest request,
            String loggedInUsername) {

        User loggedInUser = userRepository.findByUsername(loggedInUsername)
                .orElseThrow(() ->
                        new IllegalArgumentException("User not found"));

        if (loggedInUser.getRole() != Role.ADMIN) {
            throw new IllegalArgumentException(
                    "Only admins can create another admin."
            );
        }

        if (userRepository.existsByUsername(
                request.getUsername().trim())) {

            throw new IllegalArgumentException(
                    "Username already exists.");
        }

        if (userRepository.existsByEmail(
                request.getEmail().trim().toLowerCase())) {

            throw new IllegalArgumentException(
                    "Email already registered.");
        }

        User admin = new User();

        admin.setFullName(request.getFullName().trim());
        admin.setUsername(request.getUsername().trim());
        admin.setEmail(request.getEmail().trim().toLowerCase());
        admin.setPassword(
                passwordEncoder.encode(request.getPassword())
        );
        admin.setRole(Role.ADMIN);

        userRepository.save(admin);

        String token = jwtService.generateToken(
                admin.getUsername(),
                admin.getRole().name()
        );

        return new AuthResponse(
                token,
                admin.getUsername(),
                admin.getEmail(),
                admin.getRole().name()
        );
    }

    /**
     * Change Password
     */
    public String changePassword(
            String username,
            ChangePasswordRequest request) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() ->
                        new IllegalArgumentException("User not found"));

        if (!passwordEncoder.matches(
                request.getCurrentPassword(),
                user.getPassword())) {

            throw new IllegalArgumentException(
                    "Current password is incorrect.");
        }

        user.setPassword(
                passwordEncoder.encode(request.getNewPassword())
        );

        userRepository.save(user);

        return "Password changed successfully.";
    }
}