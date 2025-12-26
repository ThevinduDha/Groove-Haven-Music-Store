package com.groovehaven.backend.repository;

import com.groovehaven.backend.entity.Album;
import com.groovehaven.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AlbumRepository extends JpaRepository<Album, Long> {
    List<Album> findByArtist(User artist);
}