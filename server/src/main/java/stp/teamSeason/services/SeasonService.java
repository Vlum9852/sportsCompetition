package stp.teamSeason.services;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import lombok.AllArgsConstructor;
import stp.teamSeason.models.Season;
import stp.teamSeason.models.Team;
import stp.teamSeason.repository.SeasonRepository;

@AllArgsConstructor
@Service
public class SeasonService {
    private SeasonRepository seasonRepository;

    public List<Season> getAllSeasons() {
        try {
            return seasonRepository.findAll();
        } catch (Exception e) {
           throw new ResponseStatusException(
            HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    public boolean setSeason(Season seasonReq) {
        try {
            Season season = seasonRepository.save(seasonReq);
            return season != null ? true : false; 
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }
}
