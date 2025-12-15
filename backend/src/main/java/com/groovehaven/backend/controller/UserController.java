package com.groovehaven.backend.controller;

import com.groovehaven.backend.entity.User;
import com.groovehaven.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:5173") // Allow Frontend to talk to us
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // 1. SIGNUP (Create Account)
    @PostMapping("/signup")
    public String signup(@RequestBody User newUser) {
        // Check if username already exists
        if (userRepository.findByUsername(newUser.getUsername()).isPresent()) {
            return "Username already taken!";
        }

        // Default everyone to LISTENER (Safety first!)
        newUser.setRole("LISTENER");
        newUser.setVerified(false);

        userRepository.save(newUser);
        return "User registered successfully!";
    }

    // 2. LOGIN (Check Account)
    @PostMapping("/login")
    public User login(@RequestBody User loginData) {
        Optional<User> user = userRepository.findByUsername(loginData.getUsername());

        // If user exists AND password matches (Simple check)
        if (user.isPresent() && user.get().getPassword().equals(loginData.getPassword())) {
            return user.get(); // Send back the user info (Role, ID, Verified status)
        }
        return null; // Login failed
    }
}