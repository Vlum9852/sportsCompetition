package stp.teamSeason.services.FileServices;

import org.apache.commons.io.IOUtils;
import org.hibernate.mapping.List;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import lombok.AllArgsConstructor;
import stp.teamSeason.repository.SeasonRepository;

import java.util.*;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.io.File;
import java.io.FileInputStream;
import org.apache.commons.io.IOUtils;

@Service
@AllArgsConstructor
public class FileService {
    private FilePath filePath;
    private SeasonRepository seasonRepository;
    public byte[] getLogo(String logoName) throws IOException {

        InputStream in = null;
        File logoFile = null;
        try {
            logoFile = new File(filePath.getSaveDirPath() + filePath.getSepOS() + logoName);
            if (logoFile.exists()) {
                in = new FileInputStream(logoFile);
            }
            
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        byte[] bytes = IOUtils.toByteArray(in); 
        in.close();
        return in != null ? bytes : null;
    }

    public void deleteLogoByName(String fileName) {
        try {            
            File removeFile = new File(filePath.getSaveDirPath() + filePath.getSepOS() + fileName);
            if (removeFile.exists()) {
                removeFile.delete();
            } else {
                // throw new ResponseStatusException(
                //     HttpStatus.BAD_REQUEST, "Логотип отсутствует.");
            }
        } catch (Exception ex) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, ex.getMessage());
        }
    }

    public String uploadFile(MultipartFile file)  {
        String resultFilename = null;
        if (file != null && !file.getOriginalFilename().isEmpty()) {
            String fileName = file.getOriginalFilename().split("\\.")[1];
            if (
                    !fileName.equals("jpeg") &&
                    !fileName.equals("jpg") &&
                    !fileName.equals("png")) {
                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST, "Неверный формат файла!");
            }
            File uploadDir = new File(filePath.getSaveDirPath());
            if (!uploadDir.exists()) {
                uploadDir.mkdir();
                
            }
            
            String uuidFile = UUID.randomUUID().toString();
            resultFilename = uuidFile + "." + file.getOriginalFilename().split("\\.")[1];
            try {
                //File saveFile = new File(filePath.getSaveDirPath() + filePath.getSepOS() + resultFilename);
                
                file.transferTo(Paths.get(filePath.getSaveDirPath() + filePath.getSepOS() + resultFilename));
                
                
            } catch (IOException ex) {
                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST, ex.getMessage()); // подумать о статусе ошибки
            }
        }
        return resultFilename;
    }

}
