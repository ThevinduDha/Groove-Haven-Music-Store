package com.groovehaven.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Artist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String bio;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
}