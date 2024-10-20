package stp.teamSeason.controllers;


import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import stp.teamSeason.models.Team;
import stp.teamSeason.repository.TeamRepository;

@RestController
@AllArgsConstructor
public class GetRestController {
    TeamRepository teamRepository;
    @PostMapping("/set-team")
    public ResponseEntity<Team> createTeam(@RequestBody Team teamReq) {
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
}
