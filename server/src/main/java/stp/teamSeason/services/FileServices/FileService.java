package stp.teamSeason.services.FileServices;

import org.apache.commons.io.IOUtils;
import org.hibernate.mapping.List;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import lombok.AllArgsConstructor;

import java.util.*;
import java.io.IOException;
import java.io.InputStream;
import java.io.File;
import java.io.FileInputStream;
import org.apache.commons.io.IOUtils;

@Service
@AllArgsConstructor
public class FileService {
    private FilePath filePath;

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
        return in != null ? IOUtils.toByteArray(in) : null;
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
                file.transferTo(new File(filePath.getSaveDirPath() + filePath.getSepOS() + resultFilename));
            } catch (IOException ex) {
                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST, ex.getMessage()); // подумать о статусе ошибки
            }
        }
        return resultFilename;
    }

}
