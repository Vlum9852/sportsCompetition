package stp.teamSeason.services;

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
    
    public byte[] getLogo(String logoName) throws IOException {

        InputStream in = null;
        File logoFile = null;
        try {
            //  in = getClass()
            // .getResourceAsStream("E:\\stp\\server\\src\\main\\resources\\static\\logo.png");
            logoFile = new File("E:\\stp\\server\\src\\main\\resources\\static\\logo.png");
            if (logoFile.exists()) {
                in = new FileInputStream(logoFile);
            }
            
        } catch (Exception e) {
            // TODO: handle exception
            System.out.println(e.getMessage());
        }
        // System.out.println(in);
        // return null;
        return in != null ? IOUtils.toByteArray(in) : null;
    }

}
