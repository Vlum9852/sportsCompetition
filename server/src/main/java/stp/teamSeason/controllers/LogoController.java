package stp.teamSeason.controllers;


import java.io.IOException;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import lombok.AllArgsConstructor;
import stp.teamSeason.services.FileService;




@Controller
@AllArgsConstructor
public class LogoController {
    FileService fileService;

    @GetMapping(
    value = "/get-logo",
    produces = MediaType.IMAGE_JPEG_VALUE)
    public @ResponseBody byte[] getLogo(@RequestParam String logoName) throws IOException   {
        return fileService.getLogo(logoName);
    }
}
