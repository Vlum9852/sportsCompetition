package stp.teamSeason.services;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import stp.teamSeason.models.Team;
import stp.teamSeason.repository.TeamRepository;

import java.util.List;

@AllArgsConstructor
@Service
public class TeamService {
    TeamRepository teamRepository;

    public List<Team> getAllTeams() {
        try {
            return teamRepository.findAll();
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    public boolean setTeam(Team teamReq) {
        try {
            Team team = teamRepository.save(teamReq);
            return team != null ? true : false; 
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

}
