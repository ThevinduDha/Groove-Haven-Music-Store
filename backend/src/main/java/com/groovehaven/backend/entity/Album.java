package com.groovehaven.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Data
public class Album {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private String coverImage; // Store the filename of the album art

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User artist;

    @OneToMany(mappedBy = "album") // One Album has many songs
    private List<Song> songs;
}