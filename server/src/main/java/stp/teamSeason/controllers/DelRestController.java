package stp.teamSeason.controllers;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import stp.teamSeason.services.SeasonService;

@RestController
@AllArgsConstructor
public class DelRestController {
    SeasonService seasonService;

    @DeleteMapping("/delete-season")
    public void deleteSeason(@RequestParam("id") Long id) {
        seasonService.deleteById(id);
    }
}
