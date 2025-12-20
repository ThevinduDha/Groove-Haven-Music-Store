package com.groovehaven.backend.controller;

import com.groovehaven.backend.entity.LikedSong;
import com.groovehaven.backend.entity.User;
import com.groovehaven.backend.repository.LikedSongRepository;
import com.groovehaven.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.groovehaven.backend.repository.ArtistRepository;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LikedSongRepository likedSongRepository; // 👇 NEW: Inject this!

    @Autowired
    private ArtistRepository artistRepository;

    // ... (Keep your existing login/register/upload code here) ...

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userRepository.save(user);
    }

    @PostMapping("/login")
    public User login(@RequestBody User user) {
        return userRepository.findByUsername(user.getUsername())
                .filter(u -> u.getPassword().equals(user.getPassword()))
                .orElse(null);
    }

    @GetMapping("/artists")
    public List<User> getArtists() {
        return userRepository.findAll();
    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        User user = userRepository.findById(id).orElseThrow();
        if(updatedUser.getFirstName() != null) user.setFirstName(updatedUser.getFirstName());
        if(updatedUser.getRole() != null) user.setRole(updatedUser.getRole());
        if(updatedUser.getBio() != null) user.setBio(updatedUser.getBio());
        return userRepository.save(user);
    }

    @PostMapping("/{id}/image")
    public User uploadProfileImage(@PathVariable Long id, @RequestParam("file") MultipartFile file) throws IOException {
        User user = userRepository.findById(id).orElseThrow();
        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        Path path = Paths.get("GrooveHaven_Music/" + fileName);
        Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
        user.setProfilePic(fileName);
        return userRepository.save(user);
    }

    // 👇 NEW: Delete User Endpoint
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        User user = userRepository.findById(id).orElseThrow();

        // 1. Delete all Likes made by this user
        likedSongRepository.deleteAll(likedSongRepository.findByUser(user));

        // 2. NEW: Delete Artist Profile (if they are an artist)
        // This handles the Foreign Key constraint from the 'artist' table
        artistRepository.findByUser(user).ifPresent(artist -> {
            artistRepository.delete(artist);
        });

        // 3. Finally, delete the User
        userRepository.delete(user);
    }
}