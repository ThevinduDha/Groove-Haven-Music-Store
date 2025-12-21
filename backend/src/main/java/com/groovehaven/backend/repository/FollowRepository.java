package com.groovehaven.backend.repository;

import com.groovehaven.backend.entity.Follow;
import com.groovehaven.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface FollowRepository extends JpaRepository<Follow, Long> {
    // Check if I already follow this artist
    boolean existsByFollowerAndArtist(User follower, User artist);

    // Find the specific follow record (so we can delete/unfollow it)
    Optional<Follow> findByFollowerAndArtist(User follower, User artist);

    // Count how many fans an artist has
    long countByArtist(User artist);
}