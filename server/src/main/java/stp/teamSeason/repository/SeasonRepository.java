package stp.teamSeason.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import stp.teamSeason.models.Season;

import java.util.Optional;

public interface SeasonRepository extends JpaRepository<Season, Long> {
    @Query(value = "SELECT s.image FROM SEASON S WHERE s.id = :id", nativeQuery = true)
    String findImageById(Long id);
}
