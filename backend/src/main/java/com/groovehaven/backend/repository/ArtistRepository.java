package com.groovehaven.backend.repository;

import com.groovehaven.backend.entity.Artist;
import com.groovehaven.backend.entity.User; // 👈 This must match your Entity package!
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ArtistRepository extends JpaRepository<Artist, Long> {

    Optional<Artist> findByUser(User user);

}