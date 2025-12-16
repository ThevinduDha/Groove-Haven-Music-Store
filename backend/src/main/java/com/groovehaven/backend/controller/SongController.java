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

    // Define where to save the files.
    // IMPORTANT: Change this to a real folder on your computer!
    // Example for Windows: "C:/GrooveHaven_Music/"
    private static final String UPLOAD_DIR = "C:/Users/DELL/Desktop/groove-haven/GrooveHaven_Music/";

    @GetMapping
    public List<Song> getAllSongs() {
        return songRepository.findAll();
    }

    @PostMapping("/upload")
    public Song uploadSong(
            @RequestParam("title") String title,
            @RequestParam("artist") String artist,
            @RequestParam("file") MultipartFile file) throws IOException {

        // 1. Create the upload directory if it doesn't exist
        File directory = new File(UPLOAD_DIR);
        if (!directory.exists()) {
            directory.mkdirs();
        }

        // 2. Generate a unique file name so uploads don't overwrite each other
        String uniqueFileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
        Path filePath = Paths.get(UPLOAD_DIR + uniqueFileName);

        // 3. Save the actual MP3 file to the folder
        Files.write(filePath, file.getBytes());

        // 4. Save the song details to the Database
        Song song = new Song();
        song.setTitle(title);
        song.setArtist(artist);
        song.setFilePath(uniqueFileName); // We only save the name, not the full path

        return songRepository.save(song);
    }
}