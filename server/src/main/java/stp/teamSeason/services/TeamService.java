package stp.teamSeason.services;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import stp.teamSeason.models.Team;
import stp.teamSeason.repository.TeamRepository;
import stp.teamSeason.services.FileServices.FileService;

import java.util.List;

@AllArgsConstructor
@Service
public class TeamService {
    private TeamRepository teamRepository;
    private FileService fileService;
    public List<Team> getAllTeams() {
        try {
            return teamRepository.findAll();
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    public Team setTeam(Team teamReq) {
        try {
            // Team team = teamRepository.save(teamReq);
            return teamRepository.save(teamReq); 
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    public void deleteById(Long id) {
        try {
            fileService.deleteLogoByName(teamRepository.findImageById(id));
            teamRepository.deleteById(id);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    public void updateTeam(@NonNull Team team) {
        String logoName = teamRepository.findImageById(team.getId());
        if (!logoName.equals(team.getImage())) {
            fileService.deleteLogoByName(logoName);
        }
        try {
            teamRepository.save(team);            
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

}
