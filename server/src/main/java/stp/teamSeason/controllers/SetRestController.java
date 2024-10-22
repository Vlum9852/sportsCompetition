package stp.teamSeason.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import lombok.*;
import stp.teamSeason.models.Team;
import stp.teamSeason.repository.TeamRepository;
import stp.teamSeason.services.TeamService;

@RestController
@AllArgsConstructor
public class SetRestController {
    TeamService teamService;

    @PostMapping("/set-team")
    public boolean createTeam(@RequestBody Team teamReq) {
        return teamService.setTeam(teamReq);
    }
}