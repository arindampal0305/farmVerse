package com.farmverse.backend.controller;

import com.farmverse.backend.dto.ProfileResponse;
import com.farmverse.backend.entity.User;
import com.farmverse.backend.repository.FarmRepository;
import com.farmverse.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/farmverse/profile")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class ProfileController {

    private final UserRepository userRepository;
    private final FarmRepository farmRepository;

    @GetMapping
    public ResponseEntity<ProfileResponse> getProfile(Authentication authentication) {
        String username = authentication.getName();
        
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        long farmCount = farmRepository.countByFarmerId(user.getId());

        ProfileResponse response = ProfileResponse.builder()
                .fullName(user.getFullName())
                .username(user.getUsername())
                .email(user.getEmail())
                .role(user.getRole().name())
                .phone(user.getPhone())
                .location(user.getLocation())
                .farmCount(farmCount)
                .build();

        return ResponseEntity.ok(response);
    }

    @org.springframework.web.bind.annotation.PutMapping
    public ResponseEntity<com.farmverse.backend.dto.ApiResponse> updateProfile(
            @jakarta.validation.Valid @org.springframework.web.bind.annotation.RequestBody com.farmverse.backend.dto.ProfileUpdateRequest request,
            Authentication authentication) {
        
        String username = authentication.getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
                
        user.setFullName(request.getFullName());
        user.setPhone(request.getPhone());
        user.setLocation(request.getLocation());
        
        userRepository.save(user);
        
        return ResponseEntity.ok(com.farmverse.backend.dto.ApiResponse.ok("Profile Updated Successfully!", null));
    }
}
