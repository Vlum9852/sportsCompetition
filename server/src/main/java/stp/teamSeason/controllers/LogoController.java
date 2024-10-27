package stp.teamSeason.controllers;


import java.io.IOException;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import stp.teamSeason.services.FileServices.FileService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;





@Controller
@AllArgsConstructor
public class LogoController {
    FileService fileService;

    @GetMapping(
    value = "/get-logo",
    produces = MediaType.IMAGE_JPEG_VALUE)
    public @ResponseBody byte[] getLogo(@RequestParam("logoName") String logoName) throws IOException   {
        return fileService.getLogo(logoName);
    }

    @PostMapping("/upload-logo")
    public @ResponseBody String uploadLogo(@RequestParam("file") MultipartFile file) {
        return fileService.uploadFile(file);
    }
    

}
