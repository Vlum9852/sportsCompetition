package stp.teamSeason.controllers;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import stp.teamSeason.models.Season;
import stp.teamSeason.services.SeasonService;

@RestController
@AllArgsConstructor
public class PutRestController {
    SeasonService seasonService;

    @PutMapping("/upd-season")
    public void updateSeason(@RequestBody Season seasonReq) {
        seasonService.updateSeason(seasonReq);
    }
}
