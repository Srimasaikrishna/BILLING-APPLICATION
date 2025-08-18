package com.chillbilling.service;

import com.chillbilling.entity.User;
import com.chillbilling.exception.BusinessException;
import com.chillbilling.exception.ResourceNotFoundException;
import com.chillbilling.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class UserService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }
    
    public Long findUserIdByEmail(String email) {
    	User existingUser = userRepository.findByEmailId(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
    	return existingUser.getUserId();
    }

    public User registerUser(User user) {
    	if (userRepository.findByEmailId(user.getEmailId()).isPresent()) {
            throw new BusinessException("Email is already registered.");
        }
    	if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new BusinessException("Username is already taken.");
        }
    	if (userRepository.findByPhoneNumber(user.getPhoneNumber()).isPresent()) {
            throw new BusinessException("Phone number is already registered.");
        }
    	if (user.getPhoneNumber().length() != 10) {
    	    throw new BusinessException("Phone number must be 10 digits.");
    	}
        user.setPasswordHash(passwordEncoder.encode(user.getPasswordHash()));
        return userRepository.save(user);
    }
    
    public User updateUser(User updatedUser) {
        User existing = userRepository.findByEmailId(updatedUser.getEmailId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + updatedUser.getEmailId()));

        existing.setFullName(updatedUser.getFullName());

        if (!existing.getUsername().equals(updatedUser.getUsername())
                && userRepository.findByUsername(updatedUser.getUsername()).isPresent()) {
            throw new BusinessException("Username is already taken.");
        }
        existing.setUsername(updatedUser.getUsername());

        if (updatedUser.getPasswordHash() != null && !updatedUser.getPasswordHash().isBlank()) {
            existing.setPasswordHash(passwordEncoder.encode(updatedUser.getPasswordHash()));
        }

        return userRepository.save(existing);
    }

    public User getUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmailId(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    
    public void deleteUser(Long userId) {
        if (!userRepository.existsById(userId)) {
            throw new ResourceNotFoundException("User not found with id: " + userId);
        }
        userRepository.deleteById(userId);
    }

}
