package stp.teamSeason.controllers;


import lombok.AllArgsConstructor;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import stp.teamSeason.models.Season;
import stp.teamSeason.models.Team;
import stp.teamSeason.models.TeamSeason;
import stp.teamSeason.repository.TeamRepository;
import org.springframework.web.bind.annotation.GetMapping;

import stp.teamSeason.services.SeasonService;
import stp.teamSeason.services.TeamSeasonService;
import stp.teamSeason.services.TeamService;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
@AllArgsConstructor
public class GetRestController {
    TeamService teamService;
    SeasonService seasonService;
    TeamSeasonService teamSeasonService;
    @GetMapping("/get-team")
    public ResponseEntity<List<Team>> getTeams() {
        return new ResponseEntity<>(teamService.getAllTeams(), HttpStatus.OK);
    }

    @GetMapping("/get-seasons")
    public ResponseEntity<List<Season>> getSeasons() {
        return new ResponseEntity<>(seasonService.getAllSeasons(), HttpStatus.OK);
    }
    
    @GetMapping("/get-seasons-by-team")
    public ResponseEntity<List<TeamSeason>> getSeasonByTeamId(@RequestParam("id") Long id) {
        return new ResponseEntity<>(teamSeasonService.getSeasonByTeamId(id), HttpStatus.OK);
    }

    @GetMapping("/get-teams-by-season")
    public ResponseEntity<List<TeamSeason>> getTeamsBySeasonId(@RequestParam("id") Long id) {
        return new ResponseEntity<>(teamSeasonService.getTeamBySeasonId(id), HttpStatus.OK);
    }
    

}