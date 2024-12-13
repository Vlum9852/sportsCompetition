package stp.teamSeason.controllers;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import stp.teamSeason.models.Team;
import stp.teamSeason.models.TeamSeason;
import stp.teamSeason.services.TeamSeasonService;
import stp.teamSeason.services.TeamService;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/teams")
public class TeamController {
    TeamService teamService;
    TeamSeasonService teamSeasonService;
    @GetMapping
    public ResponseEntity<List<Team>> getTeams() {
        return new ResponseEntity<>(teamService.getTeams(), HttpStatus.OK);
    }

    @GetMapping("/by-seasons/{id}")
    public ResponseEntity<List<TeamSeason>> getTeamsBySeasonId(@PathVariable Long id) {
        return new ResponseEntity<>(teamSeasonService.getTeamsBySeasonId(id), HttpStatus.OK);
    }

    @PostMapping("/add")
    public Team setTeam(@RequestBody Team teamReq) {
        return teamService.setTeam(teamReq);
    }

    @PostMapping("/add-season")
    public TeamSeason setTeamSeason(@RequestBody TeamSeason teamSeasonReq) {
        return  teamSeasonService.setTeamSeason(teamSeasonReq);
    }
    @PutMapping
    public void updateTeam(@RequestBody Team teamReq) {
        teamService.updateTeam(teamReq);
    }

    @DeleteMapping("/{id}")
    public void deleteTeam(@PathVariable Long id) {
        teamService.deleteById(id);

    }
}
