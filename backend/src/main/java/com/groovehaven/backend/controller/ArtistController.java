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

    // 3. UPDATE: Change details of an existing artist
    @PutMapping("/{id}")
    public Artist updateArtist(@PathVariable Long id, @RequestBody Artist artistDetails) {
        // Step 1: Find the artist or throw an error
        Artist artist = artistRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Artist not found with id: " + id));

        // Step 2: Update the fields
        artist.setName(artistDetails.getName());
        artist.setBio(artistDetails.getBio());
        artist.setImageUniqueId(artistDetails.getImageUniqueId());

        // Step 3: Save back to database
        return artistRepository.save(artist);
    }

    // 4. DELETE: Remove an artist
    @DeleteMapping("/{id}")
    public String deleteArtist(@PathVariable Long id) {
        artistRepository.deleteById(id);
        return "Artist deleted successfully with id: " + id;
    }
}