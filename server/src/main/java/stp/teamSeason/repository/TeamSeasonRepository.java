package stp.teamSeason.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import stp.teamSeason.models.TeamSeason;

public interface TeamSeasonRepository extends JpaRepository<TeamSeason, Long> {
}
