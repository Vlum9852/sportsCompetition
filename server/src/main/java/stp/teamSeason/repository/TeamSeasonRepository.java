package stp.teamSeason.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import stp.teamSeason.models.Season;
import stp.teamSeason.models.Team;
import stp.teamSeason.models.TeamSeason;

import java.util.List;

public interface TeamSeasonRepository extends JpaRepository<TeamSeason, Long> {
    List<TeamSeason> findByTeam(Team team);
    List<TeamSeason> findBySeason(Season season);
}
