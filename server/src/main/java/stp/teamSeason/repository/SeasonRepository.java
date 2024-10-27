package stp.teamSeason.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import stp.teamSeason.models.Season;

import java.util.Optional;

public interface SeasonRepository extends JpaRepository<Season, Long> {

}
