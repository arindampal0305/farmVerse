package com.farmverse.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    public void sendOtpEmail(String toEmail, String otp) {

        SimpleMailMessage message = new SimpleMailMessage();

        message.setFrom(fromEmail);
        message.setTo(toEmail);
        message.setSubject("FarmVerse Password Reset OTP");

        message.setText(
                "Hello,\n\n" +
                "Your OTP for resetting your FarmVerse account password is:\n\n" +
                otp +
                "\n\nThis OTP is valid for 5 minutes.\n\n" +
                "If you did not request this password reset, please ignore this email.\n\n" +
                "Regards,\nFarmVerse Team"
        );

        mailSender.send(message);
    }
}