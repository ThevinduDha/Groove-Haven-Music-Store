package com.groovehaven.backend.repository;

import com.groovehaven.backend.entity.Comment;
import com.groovehaven.backend.entity.Song;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    // Find all comments for a specific song
    List<Comment> findBySong(Song song);
}