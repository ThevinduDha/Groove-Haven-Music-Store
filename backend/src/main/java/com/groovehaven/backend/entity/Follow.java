package com.groovehaven.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Follow {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "follower_id")
    private User follower; // The fan

    @ManyToOne
    @JoinColumn(name = "artist_id")
    private User artist;   // The star
}