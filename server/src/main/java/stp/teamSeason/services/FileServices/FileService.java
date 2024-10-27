package stp.teamSeason.services.FileServices;

import org.apache.commons.io.IOUtils;
import org.hibernate.mapping.List;
import org.springframework.stereotype.Service;

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

}
