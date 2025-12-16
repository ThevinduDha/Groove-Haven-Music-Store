package com.groovehaven.backend.controller;

import com.groovehaven.backend.entity.User;
import com.groovehaven.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // CHANGE THIS TO YOUR DESKTOP PATH (Same as SongController)
    private static final String UPLOAD_DIR = "C:/Users/DELL/Desktop/groove-haven/GrooveHaven_Music/";

    @PostMapping("/signup")
    public User signup(@RequestBody User user) {
        user.setRole("LISTENER");
        return userRepository.save(user);
    }

    @PostMapping("/login")
    public User login(@RequestBody User loginDetails) {
        // 👇 FIX: We added .orElse(null) to unwrap the Optional box
        User user = userRepository.findByUsername(loginDetails.getUsername())
                .orElse(null);

        if (user != null && user.getPassword().equals(loginDetails.getPassword())) {
            return user;
        }
        throw new RuntimeException("Invalid Credentials");
    }

    // 1. Get All Artists
    @GetMapping("/artists")
    public List<User> getAllArtists() {
        return userRepository.findAll().stream()
                .filter(u -> "ARTIST".equals(u.getRole()))
                .collect(Collectors.toList());
    }

    // 2. Update Profile / Upgrade to Artist
    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User updatedData) {
        return userRepository.findById(id).map(user -> {
            if(updatedData.getFirstName() != null) user.setFirstName(updatedData.getFirstName());
            if(updatedData.getLastName() != null) user.setLastName(updatedData.getLastName());
            if(updatedData.getBio() != null) user.setBio(updatedData.getBio());
            if(updatedData.getRole() != null) user.setRole(updatedData.getRole());
            return userRepository.save(user);
        }).orElseThrow(() -> new RuntimeException("User not found"));
    }

    // 3. Upload Profile Picture
    @PostMapping("/{id}/image")
    public User uploadProfilePic(@PathVariable Long id, @RequestParam("file") MultipartFile file) throws IOException {
        File directory = new File(UPLOAD_DIR);
        if (!directory.exists()) directory.mkdirs();

        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        Path filePath = Paths.get(UPLOAD_DIR + fileName);
        Files.write(filePath, file.getBytes());

        return userRepository.findById(id).map(user -> {
            user.setProfilePic(fileName);
            return userRepository.save(user);
        }).orElseThrow(() -> new RuntimeException("User not found"));
    }
}