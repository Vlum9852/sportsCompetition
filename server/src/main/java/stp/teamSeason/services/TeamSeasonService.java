package stp.teamSeason.services;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import stp.teamSeason.models.TeamSeason;
import stp.teamSeason.repository.TeamSeasonRepository;

@Service
@AllArgsConstructor
public class TeamSeasonService {
    private TeamSeasonRepository teamSeasonRepository;
    public TeamSeason setTeamSeason(TeamSeason teamSeasonReq) {
        try {
            return teamSeasonRepository.save(teamSeasonReq);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

}
