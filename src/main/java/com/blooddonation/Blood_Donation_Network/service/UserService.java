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

        // Check whether the email already exists
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return null;
        }


        // Public users can register only as
        // DONOR or HOSPITAL_STAFF.
        // ADMIN cannot be selected during signup.

        if (user.getRole() == null ||
                user.getRole().trim().isEmpty()) {

            return null;
        }


        String role =
                user.getRole().trim().toUpperCase();


        if (!role.equals("DONOR") &&
                !role.equals("HOSPITAL_STAFF")) {

            return null;
        }


        user.setRole(role);


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


        // Safety fallback for older users
        // whose role may not have been assigned.
        if (user.getRole() == null ||
                user.getRole().trim().isEmpty()) {

            user.setRole("DONOR");

            user = userRepository.save(user);
        }


        return user;
    }


    // Get all registered users
    public List<User> getAllUsers() {

        return userRepository.findAll();
    }
}