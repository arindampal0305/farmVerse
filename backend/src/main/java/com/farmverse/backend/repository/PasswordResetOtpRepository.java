package com.farmverse.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.farmverse.backend.entity.PasswordResetOtp;

public interface PasswordResetOtpRepository extends JpaRepository<PasswordResetOtp, Long> {

    Optional<PasswordResetOtp> findByUserId(Long userId);

    Optional<PasswordResetOtp> findByUserEmail(String email);

    void deleteByUserId(Long userId);
}