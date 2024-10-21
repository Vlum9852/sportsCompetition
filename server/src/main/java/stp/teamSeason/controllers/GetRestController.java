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


@RestController
@AllArgsConstructor
public class GetRestController {
    TeamRepository teamRepository;
    @PostMapping("/set-team")
    public ResponseEntity<Team> createTeam() {
        Long tmp = 1L;
        Short temp = 2001;
        Team teamReq = new Team(tmp, "name", "country", "im", temp);
        try {
            Team team = teamRepository.save(new Team(
                    teamReq.getId(),
                    teamReq.getName(),
                    teamReq.getCountry(),
                    teamReq.getImage(),
                    teamReq.getFormationName())
            );
            return new ResponseEntity<>(team, HttpStatus.CREATED);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/get-team")
    public ResponseEntity<List<Team>> getTeams() {
        try {
            List<Team> teams = teamRepository.findAll();
            return new ResponseEntity<>(teams, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}