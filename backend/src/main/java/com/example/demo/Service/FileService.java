package com.example.demo.Service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class FileService {
    @Value("${fileUpload.rootPath}")
    private String rootPath;
    private Path root;

    private void init() {
        try {
            root = Paths.get(rootPath);
            System.out.println(root);
            System.out.println(rootPath);
            if(Files.notExists(root)) {
                Files.createDirectories(root);
            }
        }catch (Exception e) {
            System.out.println("Error create foder root: "+ e.getMessage());
        }
    }

    public boolean saveFile(MultipartFile file) {
        init();
        try {
            Files.copy(file.getInputStream(), root.resolve(file.getOriginalFilename()), StandardCopyOption.REPLACE_EXISTING);
            return true;
        }catch (Exception e) {
            System.out.println("Error save file: "+ e.getMessage());
        }
        return false;
    }

    public Resource loadFile(String fileName) {
        init();
        try {
            Path file = root.resolve(fileName);
            Resource resource = new UrlResource(file.toUri());
            if(resource.exists() || resource.isReadable()) {
                return resource;
            }
        }catch (Exception e) {
            System.out.println("Error load file: "+ e.getMessage());
        }
        return null;
    }
}
