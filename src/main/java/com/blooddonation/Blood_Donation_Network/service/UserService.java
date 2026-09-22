package com.blooddonation.Blood_Donation_Network.service;

import com.blooddonation.Blood_Donation_Network.entity.User;
import com.blooddonation.Blood_Donation_Network.repository.UserRepository;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Register a new user
    public User registerUser(User user) {

        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return null;
        }

        // Do not allow public registration as ADMIN
        if (user.getRole() == null ||
                user.getRole().equalsIgnoreCase("ADMIN")) {

            user.setRole("DONOR");
        }

        return userRepository.save(user);
    }

    // Login user
    public User loginUser(String email, String password) {

        User user = userRepository
                .findByEmail(email)
                .orElse(null);

        if (user == null) {
            return null;
        }

        if (!user.getPassword().equals(password)) {
            return null;
        }

        return user;
    }

    // Get all registered users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}