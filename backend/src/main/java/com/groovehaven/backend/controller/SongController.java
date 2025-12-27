package com.groovehaven.backend.controller;

import com.groovehaven.backend.entity.Song;
import com.groovehaven.backend.entity.Album;
import com.groovehaven.backend.repository.SongRepository;
import com.groovehaven.backend.repository.AlbumRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/songs")
@CrossOrigin(origins = "http://localhost:5173")
public class SongController {

    @Autowired
    private SongRepository songRepository;

    @Autowired // ✅ Ensure this is autowired
    private AlbumRepository albumRepository;

    // 👇 Update this path to your specific folder if needed
    private static final String UPLOAD_DIR = "C:/Users/DELL/Desktop/groove-haven/GrooveHaven_Music/";

    @GetMapping
    public List<Song> getAllSongs() {
        return songRepository.findAll();
    }

    @PostMapping("/upload")
    public Song uploadSong(
            @RequestParam("title") String title,
            @RequestParam("artist") String artist,
            @RequestParam("file") MultipartFile file,
            @RequestParam("cover") MultipartFile cover, // 👈 ✅ COMMA ADDED HERE
            @RequestParam(value = "albumId", required = false) Long albumId) throws IOException {

        // 1. Create directory if needed
        File directory = new File(UPLOAD_DIR);
        if (!directory.exists()) directory.mkdirs();

        // 2. Save MP3 File
        String uniqueMp3Name = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
        Files.write(Paths.get(UPLOAD_DIR + uniqueMp3Name), file.getBytes());

        // 3. Save Cover Image File
        String uniqueCoverName = UUID.randomUUID().toString() + "_" + cover.getOriginalFilename();
        Files.write(Paths.get(UPLOAD_DIR + uniqueCoverName), cover.getBytes());

        // 4. Create Song Object
        Song song = new Song();
        song.setTitle(title);
        song.setArtist(artist);
        song.setFilePath(uniqueMp3Name);
        song.setCoverImage(uniqueCoverName);

        // 5. Link Album if provided
        if (albumId != null) {
            Album album = albumRepository.findById(albumId).orElse(null);
            song.setAlbum(album);
        }

        return songRepository.save(song);
    }
    @PostMapping("/{id}/play")
    public void playSong(@PathVariable Long id) {
        Song song = songRepository.findById(id).orElseThrow();
        song.setStreamCount(song.getStreamCount() + 1);
        songRepository.save(song);
    }



}