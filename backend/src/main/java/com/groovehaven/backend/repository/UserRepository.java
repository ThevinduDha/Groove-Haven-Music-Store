package com.groovehaven.backend.repository;

import com.groovehaven.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    List<User> findByRole(String role);

    // 👇 NEW: Search for Artists by username (Case Insensitive)
    List<User> findByRoleAndUsernameContainingIgnoreCase(String role, String username);
}