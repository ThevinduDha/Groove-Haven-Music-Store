package com.groovehaven.backend.repository;

import com.groovehaven.backend.entity.Song;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SongRepository extends JpaRepository<Song, Long> {
    // NEW: Search for text inside Title OR Artist (Case Insensitive)
    List<Song> findByTitleContainingIgnoreCaseOrArtistContainingIgnoreCase(String title, String artist);
    // Allows us to search songs by artist name
    List<Song> findByArtist(String artist);
}