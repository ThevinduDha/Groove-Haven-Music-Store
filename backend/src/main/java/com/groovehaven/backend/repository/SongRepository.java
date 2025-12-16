package com.groovehaven.backend.repository;

import com.groovehaven.backend.entity.Song;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SongRepository extends JpaRepository<Song, Long> {
    // Allows us to search songs by artist name
    List<Song> findByArtist(String artist);
}