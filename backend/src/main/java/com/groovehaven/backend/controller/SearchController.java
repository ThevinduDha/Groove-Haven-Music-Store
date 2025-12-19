package com.groovehaven.backend.controller;

import com.groovehaven.backend.entity.Song;
import com.groovehaven.backend.entity.User;
import com.groovehaven.backend.repository.SongRepository;
import com.groovehaven.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/search")
@CrossOrigin(origins = "http://localhost:5173")
public class SearchController {

    @Autowired
    private SongRepository songRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public Map<String, Object> search(@RequestParam String query) {
        Map<String, Object> results = new HashMap<>();

        // 1. Find Songs (matching title or artist name)
        List<Song> songs = songRepository.findByTitleContainingIgnoreCaseOrArtistContainingIgnoreCase(query, query);

        // 2. Find Artists (matching username, only role='ARTIST')
        List<User> artists = userRepository.findByRoleAndUsernameContainingIgnoreCase("ARTIST", query);

        results.put("songs", songs);
        results.put("artists", artists);

        return results;
    }
}