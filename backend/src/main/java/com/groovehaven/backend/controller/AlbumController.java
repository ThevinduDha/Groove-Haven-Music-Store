package com.groovehaven.backend.controller;

import com.groovehaven.backend.entity.Album;
import com.groovehaven.backend.entity.User;
import com.groovehaven.backend.repository.AlbumRepository;
import com.groovehaven.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/albums")
@CrossOrigin(origins = "http://localhost:5173")
public class AlbumController {

    @Autowired
    private AlbumRepository albumRepository;

    @Autowired
    private UserRepository userRepository;

    @Value("${upload.path}")
    private String uploadPath;

    // 1. Create Album
    @PostMapping("/create")
    public Album createAlbum(
            @RequestParam String title,
            @RequestParam String description,
            @RequestParam Long artistId,
            @RequestParam("cover") MultipartFile coverFile) throws IOException {

        User artist = userRepository.findById(artistId).orElseThrow();

        // Save Album Cover
        String coverFileName = UUID.randomUUID() + "_" + coverFile.getOriginalFilename();
        Path coverPath = Paths.get(uploadPath + coverFileName);
        Files.copy(coverFile.getInputStream(), coverPath);

        Album album = new Album();
        album.setTitle(title);
        album.setDescription(description);
        album.setArtist(artist);
        album.setCoverImage(coverFileName);

        return albumRepository.save(album);
    }

    // 2. Get Albums by Artist
    @GetMapping("/artist/{artistId}")
    public List<Album> getArtistAlbums(@PathVariable Long artistId) {
        User artist = userRepository.findById(artistId).orElseThrow();
        return albumRepository.findByArtist(artist);
    }

    // 3. Get Single Album (with songs)
    @GetMapping("/{id}")
    public Album getAlbum(@PathVariable Long id) {
        return albumRepository.findById(id).orElseThrow();
    }
}