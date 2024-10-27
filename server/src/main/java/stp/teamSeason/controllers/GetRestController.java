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
import stp.teamSeason.repository.TeamRepository;
import org.springframework.web.bind.annotation.GetMapping;

import stp.teamSeason.services.SeasonService;
import stp.teamSeason.services.TeamService;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
@AllArgsConstructor
public class GetRestController {
    TeamService teamService;
    SeasonService seasonService;

    @GetMapping("/get-team")
    public ResponseEntity<List<Team>> getTeams() {
        return new ResponseEntity<>(teamService.getAllTeams(), HttpStatus.OK);
    }

    @GetMapping("/get-seasons")
    public ResponseEntity<List<Season>> getSeasons() {
        return new ResponseEntity<>(seasonService.getAllSeasons(), HttpStatus.OK);
    }
    

}