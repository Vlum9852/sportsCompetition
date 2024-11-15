package stp.teamSeason.controllers;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import stp.teamSeason.models.Season;
import stp.teamSeason.models.TeamSeason;
import stp.teamSeason.services.SeasonService;
import stp.teamSeason.services.TeamSeasonService;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/seasons")
public class SeasonController {
    SeasonService seasonService;
    TeamSeasonService teamSeasonService;
    @GetMapping
    public ResponseEntity<List<Season>> getSeasons() {
        return new ResponseEntity<>(seasonService.getSeasons(), HttpStatus.OK);
    }

    @GetMapping("/by-teams/{id}")
    public ResponseEntity<List<TeamSeason>> getSeasonsByTeamId(@PathVariable Long id) {
        return new ResponseEntity<>(teamSeasonService.getSeasonsByTeamId(id), HttpStatus.OK);
    }

    @PostMapping("/add")
    public void setSeason(@RequestBody Season seasonReq) {
         seasonService.setSeason(seasonReq);
    }

    @PutMapping
    public void updateSeason(@RequestBody Season seasonReq) {
        seasonService.updateSeason(seasonReq);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteSeason(@PathVariable Long id) {
        seasonService.deleteById(id);
    }
}
