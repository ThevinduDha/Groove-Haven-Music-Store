package com.groovehaven.backend.controller;

import com.groovehaven.backend.entity.Comment;
import com.groovehaven.backend.entity.Song;
import com.groovehaven.backend.entity.User;
import com.groovehaven.backend.repository.CommentRepository;
import com.groovehaven.backend.repository.SongRepository;
import com.groovehaven.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comments")
@CrossOrigin(origins = "http://localhost:5173")
public class CommentController {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SongRepository songRepository;

    // 1. Add a Comment
    @PostMapping("/add")
    public Comment addComment(@RequestParam String text, @RequestParam Long userId, @RequestParam Long songId) {
        User user = userRepository.findById(userId).orElseThrow();
        Song song = songRepository.findById(songId).orElseThrow();

        Comment comment = new Comment();
        comment.setText(text);
        comment.setUser(user);
        comment.setSong(song);

        return commentRepository.save(comment);
    }

    // 2. Get Comments for a Song
    @GetMapping("/song/{songId}")
    public List<Comment> getCommentsBySong(@PathVariable Long songId) {
        Song song = songRepository.findById(songId).orElseThrow();
        return commentRepository.findBySong(song);
    }
}