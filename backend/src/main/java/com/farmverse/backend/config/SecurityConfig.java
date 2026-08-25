package com.farmverse.backend.config;

import java.util.Arrays;
import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.farmverse.backend.security.CustomAuthorizationRequestRepository;
import com.farmverse.backend.security.JwtAuthenticationFilter;
import com.farmverse.backend.security.OAuth2LoginSuccessHandler;

import lombok.RequiredArgsConstructor;
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final OAuth2LoginSuccessHandler oAuth2LoginSuccessHandler;
    private final CustomAuthorizationRequestRepository customAuthorizationRequestRepository;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOrigins(List.of("http://localhost:5173", "http://localhost:5174"));

        configuration.setAllowedMethods(Arrays.asList(
                "GET",
                "POST",
                "PUT",
                "DELETE",
                "OPTIONS"
        ));

        configuration.setAllowedHeaders(List.of("*"));

        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .csrf(csrf -> csrf.disable())
                .cors(Customizer.withDefaults())

                // OAuth2 requires a temporary session
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
                )
                
                .exceptionHandling(e -> e.authenticationEntryPoint((request, response, authException) -> 
                        response.sendError(jakarta.servlet.http.HttpServletResponse.SC_UNAUTHORIZED, authException.getMessage())
                ))

              .authorizeHttpRequests(auth -> auth

    // Admin only
    .requestMatchers("/api/auth/create-admin")
    .hasRole("ADMIN")

    // Public APIs
    .requestMatchers(
        "/api/auth/login",
        "/api/auth/register",
        "/api/auth/forgot-password",
        "/api/auth/reset-password",
        "/oauth2/**",
        "/login/**",
        "/error"
    ).permitAll()

    // Admin APIs
    .requestMatchers("/farmverse/admin/**")
    .hasRole("ADMIN")

    // Farmer APIs
    .requestMatchers("/farmverse/farmer/**")
    .hasRole("FARMER")

    .anyRequest()
    .authenticated()
)

                .oauth2Login(oauth -> oauth

    .authorizationEndpoint(auth -> auth
            .baseUri("/oauth2/authorization")
            .authorizationRequestRepository(customAuthorizationRequestRepository)
    )

    .redirectionEndpoint(redir ->
            redir.baseUri("/login/oauth2/code/*")
    )

    .successHandler(oAuth2LoginSuccessHandler)

    .failureHandler((request, response, exception) -> {

        exception.printStackTrace();

        response.sendRedirect(
                "http://localhost:5173/login?googleError=true"
        );
    })
)
        


                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }
}