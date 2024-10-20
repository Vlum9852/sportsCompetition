package stp.teamSeason.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import stp.teamSeason.models.Team;

import java.util.Optional;

public interface TeamRepository extends JpaRepository<Team, Long> {
}
