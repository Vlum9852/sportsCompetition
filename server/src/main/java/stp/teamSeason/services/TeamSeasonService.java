package stp.teamSeason.services;

import lombok.AllArgsConstructor;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import stp.teamSeason.models.Season;
import stp.teamSeason.models.Team;
import stp.teamSeason.models.TeamSeason;
import stp.teamSeason.repository.SeasonRepository;
import stp.teamSeason.repository.TeamRepository;
import stp.teamSeason.repository.TeamSeasonRepository;

@Service
@AllArgsConstructor
public class TeamSeasonService {

    private TeamSeasonRepository teamSeasonRepository;
    private TeamRepository teamRepository;
    private SeasonRepository seasonRepository;

    public TeamSeason setTeamSeason(TeamSeason teamSeasonReq) {
        try {
            return teamSeasonRepository.save(teamSeasonReq);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    public List<TeamSeason> getSeasonByTeamId(Long id) {
        try {
            Optional<Team> team = teamRepository.findById(id);
            if (team.isPresent()) {
                return teamSeasonRepository.findByTeam(team.get());
            } else {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "");
            }
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    public List<TeamSeason> getTeamBySeasonId(Long id) {
        try {
            Optional<Season> season = seasonRepository.findById(id);
            if (season.isPresent()) {
                return teamSeasonRepository.findBySeason(season.get());
            } else {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "");
            }
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

}
