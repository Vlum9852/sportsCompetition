package stp.teamSeason.services;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import lombok.AllArgsConstructor;
import stp.teamSeason.models.Season;
import stp.teamSeason.models.Team;
import stp.teamSeason.repository.SeasonRepository;
import stp.teamSeason.services.FileServices.FileService;

@AllArgsConstructor
@Service
public class SeasonService {
    private SeasonRepository seasonRepository;
    private FileService fileService;

    public List<Season> getSeasons() {
        try {
            return seasonRepository.findAll();
        } catch (Exception e) {
           throw new ResponseStatusException(
            HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    public Season setSeason(Season seasonReq) {
        try {
            Season season = seasonRepository.save(seasonReq);
            return season;
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    public void deleteById(Long id) {
        try {
            String fileName = seasonRepository.findImageById(id);
            seasonRepository.deleteById(id);
            fileService.deleteLogoByName(fileName);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    public void updateSeason(@NonNull Season season) {
        String logoName = seasonRepository.findImageById(season.getId());
        if (!logoName.equals(season.getImage())) {
            fileService.deleteLogoByName(logoName);
        }
        try {
            seasonRepository.save(season);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }
}
