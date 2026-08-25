package com.farmverse.backend.security;

import java.io.IOException;
import java.util.Optional;
import java.util.UUID;

import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.farmverse.backend.entity.User;
import com.farmverse.backend.enums.Role;
import com.farmverse.backend.repository.UserRepository;
import com.farmverse.backend.service.JwtService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {

    private final UserRepository userRepository;
    private final JwtService jwtService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication)
            throws IOException {

        try {

            System.out.println("\n========== GOOGLE LOGIN SUCCESS ==========");

            OAuth2User oauthUser = (OAuth2User) authentication.getPrincipal();

            String email = oauthUser.getAttribute("email");
            String name = oauthUser.getAttribute("name");

            System.out.println("Email : " + email);
            System.out.println("Name  : " + name);

            Optional<User> optionalUser = userRepository.findByEmail(email);

            User user;

            String selectedRole =
                    CustomAuthorizationRequestRepository.getSelectedRole(request);

            System.out.println("Selected Role : " + selectedRole);

            // Existing user
            if (optionalUser.isPresent()) {

                user = optionalUser.get();

                System.out.println("Existing user found");

            }
            // New user
            else {

                System.out.println("Creating new user...");

                user = new User();

                user.setEmail(email);
                user.setFullName(name);

                String username = email.split("@")[0];

                while (userRepository.existsByUsername(username)) {
                    username = username + "_"
                            + UUID.randomUUID().toString().substring(0, 4);
                }

                user.setUsername(username);

                // Random password
                user.setPassword(UUID.randomUUID().toString());

                // Google users are FARMER by default
                user.setRole(Role.FARMER);

                user = userRepository.save(user);

                System.out.println("New user created");
            }

            // Check selected role AFTER user has been assigned
            if (selectedRole != null &&
                    !selectedRole.equalsIgnoreCase(user.getRole().name())) {

                System.out.println("Role mismatch!");

                CustomAuthorizationRequestRepository.clearRole(request);

                response.sendRedirect(
                        "http://localhost:5173/login?roleMismatch=true"
                );

                return;
            }

            System.out.println("Generating JWT...");

            String token = jwtService.generateToken(
                    user.getUsername(),
                    user.getRole().name()
            );

            String redirectUrl =
                    "http://localhost:5173/oauth-success"
                            + "?token=" + token
                            + "&role=" + user.getRole().name();

            CustomAuthorizationRequestRepository.clearRole(request);

            response.sendRedirect(redirectUrl);

        } catch (Exception ex) {

            ex.printStackTrace();

            response.sendRedirect(
                    "http://localhost:5173/login?googleError=true"
            );
        }
    }
}