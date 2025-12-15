package com.groovehaven.backend.repository;

import com.groovehaven.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    // This magic method finds a user just by typing their name!
    Optional<User> findByUsername(String username);
}