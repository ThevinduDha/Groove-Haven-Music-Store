package com.groovehaven.backend.controller;

import com.groovehaven.backend.entity.LikedSong;
import com.groovehaven.backend.entity.Song;
import com.groovehaven.backend.entity.User;
import com.groovehaven.backend.repository.LikedSongRepository;
import com.groovehaven.backend.repository.SongRepository;
import com.groovehaven.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/likes")
@CrossOrigin(origins = "http://localhost:5173")
public class LikeController {

    @Autowired
    private LikedSongRepository likedSongRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SongRepository songRepository;

    // 1. Toggle Like (Like if not liked, Unlike if already liked)
    @PostMapping("/toggle")
    public boolean toggleLike(@RequestParam Long userId, @RequestParam Long songId) {
        User user = userRepository.findById(userId).orElseThrow();
        Song song = songRepository.findById(songId).orElseThrow();

        Optional<LikedSong> existingLike = likedSongRepository.findByUserAndSong(user, song);

        if (existingLike.isPresent()) {
            likedSongRepository.delete(existingLike.get());
            return false; // Returns false (Not Liked anymore)
        } else {
            likedSongRepository.save(new LikedSong(user, song));
            return true; // Returns true (Now Liked)
        }
    }

    // 2. Get All Liked Songs for a User
    @GetMapping("/{userId}")
    public List<Song> getLikedSongs(@PathVariable Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        return likedSongRepository.findByUser(user).stream()
                .map(LikedSong::getSong)
                .collect(Collectors.toList());
    }

    // 3. Get List of Song IDs liked by user (To color the hearts red on frontend)
    @GetMapping("/{userId}/ids")
    public List<Long> getLikedSongIds(@PathVariable Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        return likedSongRepository.findByUser(user).stream()
                .map(like -> like.getSong().getId())
                .collect(Collectors.toList());
    }
}