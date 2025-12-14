package com.groovehaven.backend.controller;

import com.groovehaven.backend.entity.Artist;
import com.groovehaven.backend.repository.ArtistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*; // Imported all annotations

import java.util.List;

@RestController
@RequestMapping("/artists")
@CrossOrigin(origins = "http://localhost:5173")
public class ArtistController {

    @Autowired
    private ArtistRepository artistRepository;

    // 1. READ: Get all artists
    @GetMapping
    public List<Artist> getAllArtists() {
        return artistRepository.findAll();
    }

    // 2. CREATE: Add a new artist
    @PostMapping
    public Artist createArtist(@RequestBody Artist artist) {
        return artistRepository.save(artist);
    }
}