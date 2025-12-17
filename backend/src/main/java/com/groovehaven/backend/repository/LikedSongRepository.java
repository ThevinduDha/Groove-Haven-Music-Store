package com.groovehaven.backend.repository;

import com.groovehaven.backend.entity.LikedSong;
import com.groovehaven.backend.entity.Song;
import com.groovehaven.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LikedSongRepository extends JpaRepository<LikedSong, Long> {

    // Get all likes for a specific user
    List<LikedSong> findByUser(User user);

    // Check if a specific like exists (User + Song)
    Optional<LikedSong> findByUserAndSong(User user, Song song);
}