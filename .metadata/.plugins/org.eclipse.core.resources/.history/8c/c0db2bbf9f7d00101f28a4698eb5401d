package com.chillbilling.service;

import com.chillbilling.dto.AuthResponse;
import com.chillbilling.dto.LoginRequest;
import com.chillbilling.entity.User;
import com.chillbilling.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder; // Already configured in your project
    private final TokenService tokenService; // JWT token service

    public AuthResponse login(LoginRequest request) {
        // Find user by email or username
        User user = userRepository.findByEmailId(request.getIdentifier())
                        .or(() -> userRepository.findByUsername(request.getIdentifier()))
                        .orElseThrow(() -> new RuntimeException("User not found"));

        // Check password
        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new RuntimeException("Invalid password");
        }

        // Optional: check status
        if (user.getStatus() != User.Status.ACTIVE) {
            throw new RuntimeException("User is not active");
        }

        // Generate JWT token
        String token = tokenService.generateToken(user);

        // Return token and role
        return new AuthResponse(token, user.getRole().name());
    }
}
