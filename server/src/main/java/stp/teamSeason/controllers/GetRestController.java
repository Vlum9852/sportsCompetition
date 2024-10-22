package stp.teamSeason.controllers;


import lombok.AllArgsConstructor;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import stp.teamSeason.models.Team;
import stp.teamSeason.repository.TeamRepository;
import org.springframework.web.bind.annotation.GetMapping;
import stp.teamSeason.services.TeamService;


@RestController
@AllArgsConstructor
public class GetRestController {
    TeamRepository teamRepository; //temp
    TeamService teamService;


    @GetMapping("/get-team")
    public ResponseEntity<List<Team>> getTeams() {
        return new ResponseEntity<>(teamService.getAllTeams(), HttpStatus.OK);
    }

}