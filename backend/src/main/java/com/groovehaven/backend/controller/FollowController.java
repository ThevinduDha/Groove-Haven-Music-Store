package com.groovehaven.backend.controller;

import com.groovehaven.backend.entity.Follow;
import com.groovehaven.backend.entity.User;
import com.groovehaven.backend.repository.FollowRepository;
import com.groovehaven.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/follow")
@CrossOrigin(origins = "http://localhost:5173")
public class FollowController {

    @Autowired
    private FollowRepository followRepository;

    @Autowired
    private UserRepository userRepository;

    // Toggle Follow (Follow/Unfollow)
    @PostMapping("/toggle")
    public boolean toggleFollow(@RequestParam Long followerId, @RequestParam Long artistId) {
        User follower = userRepository.findById(followerId).orElseThrow();
        User artist = userRepository.findById(artistId).orElseThrow();

        if (followRepository.existsByFollowerAndArtist(follower, artist)) {
            // Already following -> Unfollow
            Follow existingFollow = followRepository.findByFollowerAndArtist(follower, artist).get();
            followRepository.delete(existingFollow);
            return false; // Returns false (Not following anymore)
        } else {
            // Not following -> Follow
            Follow newFollow = new Follow();
            newFollow.setFollower(follower);
            newFollow.setArtist(artist);
            followRepository.save(newFollow);
            return true; // Returns true (Now following)
        }
    }

    // Check status (Is the button blue or grey?)
    @GetMapping("/status")
    public boolean isFollowing(@RequestParam Long followerId, @RequestParam Long artistId) {
        User follower = userRepository.findById(followerId).orElseThrow();
        User artist = userRepository.findById(artistId).orElseThrow();
        return followRepository.existsByFollowerAndArtist(follower, artist);
    }

    // Get Follower Count
    @GetMapping("/count")
    public long getFollowerCount(@RequestParam Long artistId) {
        User artist = userRepository.findById(artistId).orElseThrow();
        return followRepository.countByArtist(artist);
    }
}