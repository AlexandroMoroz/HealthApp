package io.justina.justinaio.repositories;
import io.justina.justinaio.model.Rol;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RolRepository extends JpaRepository<Rol, Integer> {
    Optional<Rol> findByNombre(String roleStudent);

    boolean existsByNombre(String roleName);
}