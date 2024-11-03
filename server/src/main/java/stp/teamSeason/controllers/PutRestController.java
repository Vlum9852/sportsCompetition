package stp.teamSeason.controllers;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import stp.teamSeason.models.Season;
import stp.teamSeason.models.Team;
import stp.teamSeason.models.TeamSeason;
import stp.teamSeason.services.SeasonService;
import stp.teamSeason.services.TeamService;

import org.springframework.web.bind.annotation.PathVariable;


@RestController
@AllArgsConstructor
public class PutRestController {
    SeasonService seasonService;
    TeamService teamService;
    @PutMapping("/upd-season")
    public void updateSeason(@RequestBody Season seasonReq) {
        seasonService.updateSeason(seasonReq);
    }

    @PutMapping("/upd-team")
    public void updateTeam(@RequestBody Team teamReq) {
        teamService.updateTeam(teamReq);
    }
}
