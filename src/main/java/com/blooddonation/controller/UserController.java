package com.blooddonation.Blood_Donation_Network.controller;

import com.blooddonation.Blood_Donation_Network.entity.User;
import com.blooddonation.Blood_Donation_Network.service.UserService;

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

    public UserController(UserService userService) {
        this.userService = userService;
    }


    // GET ALL USERS
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }


    // USER REGISTRATION
    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> registerUser(
            @RequestBody User user
    ) {

        User registeredUser = userService.registerUser(user);

        Map<String, String> response = new HashMap<>();

        if (registeredUser == null) {

            response.put(
                    "message",
                    "Email already exists"
            );

            return ResponseEntity
                    .badRequest()
                    .body(response);
        }

        response.put(
                "message",
                "Account created successfully"
        );

        return ResponseEntity
                .ok(response);
    }


    // USER LOGIN
    @PostMapping("/login")
    public Map<String, String> loginUser(
            @RequestBody User user
    ) {

        boolean loginSuccessful =
                userService.loginUser(
                        user.getEmail(),
                        user.getPassword()
                );

        Map<String, String> response = new HashMap<>();

        if (loginSuccessful) {

            response.put(
                    "message",
                    "Login successful"
            );

        } else {

            response.put(
                    "message",
                    "Invalid email or password"
            );
        }

        return response;
    }

}