package com.groovehaven.backend.controller;

import com.groovehaven.backend.entity.Song;
import com.groovehaven.backend.repository.SongRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/songs")
@CrossOrigin(origins = "http://localhost:5173")
public class SongController {

    @Autowired
    private SongRepository songRepository;

    // 👇 KEEP YOUR DESKTOP PATH HERE!
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
            @RequestParam("cover") MultipartFile cover) throws IOException { // 👈 Added 'cover' param

        // 1. Create directory if needed
        File directory = new File(UPLOAD_DIR);
        if (!directory.exists()) directory.mkdirs();

        // 2. Save MP3 File
        String uniqueMp3Name = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
        Files.write(Paths.get(UPLOAD_DIR + uniqueMp3Name), file.getBytes());

        // 3. Save Cover Image File
        String uniqueCoverName = UUID.randomUUID().toString() + "_" + cover.getOriginalFilename();
        Files.write(Paths.get(UPLOAD_DIR + uniqueCoverName), cover.getBytes());

        // 4. Save to DB
        Song song = new Song();
        song.setTitle(title);
        song.setArtist(artist);
        song.setFilePath(uniqueMp3Name);
        song.setCoverImage(uniqueCoverName); // 👈 Save the image name

        return songRepository.save(song);
    }
}