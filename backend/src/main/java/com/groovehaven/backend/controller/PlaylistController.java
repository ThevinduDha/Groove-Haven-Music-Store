package com.groovehaven.backend.controller;

import com.groovehaven.backend.entity.Playlist;
import com.groovehaven.backend.entity.Song;
import com.groovehaven.backend.entity.User;
import com.groovehaven.backend.repository.PlaylistRepository;
import com.groovehaven.backend.repository.SongRepository;
import com.groovehaven.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/playlists")
@CrossOrigin(origins = "http://localhost:5173")
public class PlaylistController {

    @Autowired
    private PlaylistRepository playlistRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SongRepository songRepository;

    // 1. Create a new empty playlist
    @PostMapping("/create")
    public Playlist createPlaylist(@RequestParam String name, @RequestParam Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        Playlist playlist = new Playlist();
        playlist.setName(name);
        playlist.setUser(user);
        return playlistRepository.save(playlist);
    }

    // 2. Add a song to a playlist
    @PostMapping("/{playlistId}/add")
    public Playlist addSong(@PathVariable Long playlistId, @RequestParam Long songId) {
        Playlist playlist = playlistRepository.findById(playlistId).orElseThrow();
        Song song = songRepository.findById(songId).orElseThrow();

        playlist.getSongs().add(song); // Add the song
        return playlistRepository.save(playlist); // Save updates
    }

    // 3. Get all playlists for a specific user
    @GetMapping("/user/{userId}")
    public List<Playlist> getUserPlaylists(@PathVariable Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        return playlistRepository.findByUser(user);
    }

    // 4. Get a single playlist with its songs
    @GetMapping("/{id}")
    public Playlist getPlaylist(@PathVariable Long id) {
        return playlistRepository.findById(id).orElseThrow();
    }
}