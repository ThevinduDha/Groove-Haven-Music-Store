package com.groovehaven.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Data
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String text;
    private LocalDateTime createdAt = LocalDateTime.now(); // Auto-timestamp

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user; // Who wrote it

    @ManyToOne
    @JoinColumn(name = "song_id")
    private Song song; // Which song is it for
}