package com.groovehaven.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity // 1. Tells Spring: "This class maps to a Database Table"
@Data   // 2. Lombok: Automatically generates Getters, Setters, and toString()
public class Artist {

    @Id // 3. This is the Primary Key
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 4. Auto-increment (1, 2, 3...)
    private Long id;

    private String name;

    @Column(columnDefinition = "TEXT") // 5. Allows long text for biographies
    private String bio;

    private String imageUniqueId; // We will store the image ID here later
}