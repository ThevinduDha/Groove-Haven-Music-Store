package com.groovehaven.backend.repository;

import com.groovehaven.backend.entity.Playlist;
import com.groovehaven.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PlaylistRepository extends JpaRepository<Playlist, Long> {
    // Find all playlists created by a specific user
    List<Playlist> findByUser(User user);
}