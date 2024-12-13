package stp.teamSeason.controllers;


import java.io.IOException;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import stp.teamSeason.services.FileServices.FileService;


@RestController
@AllArgsConstructor
@RequestMapping("/logos")
public class LogoController {
    FileService fileService;

    @GetMapping(
    value = "/{logoName}",
    produces = MediaType.IMAGE_JPEG_VALUE)
    public @ResponseBody byte[] getLogo(@PathVariable String logoName)   {
        return fileService.getLogo(logoName);
    }

    @PostMapping("/upload")
    public @ResponseBody String uploadLogo(@RequestParam("file") MultipartFile file) {
        return fileService.uploadFile(file);
    }
    

}
