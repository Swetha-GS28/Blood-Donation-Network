
package com.blooddonation.Blood_Donation_Network.controller;

import com.blooddonation.Blood_Donation_Network.entity.User;
import com.blooddonation.Blood_Donation_Network.service.UserService;
import com.blooddonation.Blood_Donation_Network.repository.UserRepository;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class UserController {

    private final UserService userService;
    private final UserRepository userRepository;

    public UserController(
            UserService userService,
            UserRepository userRepository
    ) {
        this.userService = userService;
        this.userRepository = userRepository;
    }

    // Get all registered users
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    // Register a new user
    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> registerUser(
            @RequestBody User user
    ) {
        Map<String, String> response = new HashMap<>();

        // Check email first
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            response.put("message", "Email already exists");
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(response);
        }

        // Check role
        if (user.getRole() == null ||
                (!user.getRole().trim().equalsIgnoreCase("DONOR")
                && !user.getRole().trim().equalsIgnoreCase("HOSPITAL_STAFF"))) {

            response.put(
                    "message",
                    "Invalid role. Public registration allows DONOR or HOSPITAL_STAFF only."
            );

            return ResponseEntity
                    .badRequest()
                    .body(response);
        }

        User registeredUser = userService.registerUser(user);

        if (registeredUser == null) {
            response.put(
                    "message",
                    "Registration failed. Please check your details."
            );

            return ResponseEntity
                    .badRequest()
                    .body(response);
        }

        response.put("message", "Account created successfully");

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    // Log in an existing user
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> loginUser(
            @RequestBody User user
    ) {
        User loggedInUser = userService.loginUser(
                user.getEmail(),
                user.getPassword()
        );

        Map<String, String> response = new HashMap<>();

        if (loggedInUser != null) {
            response.put("message", "Login successful");
            response.put("role", loggedInUser.getRole());

            return ResponseEntity.ok(response);
        }

        response.put("message", "Invalid email or password");

        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(response);
    }
}

