package stp.teamSeason.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import stp.teamSeason.models.Team;

import java.util.Optional;

public interface TeamRepository extends JpaRepository<Team, Long> {
    @Query(value = "SELECT t.image FROM TEAM t WHERE t.id = :id", nativeQuery = true)
    String findImageById(Long id);
}
