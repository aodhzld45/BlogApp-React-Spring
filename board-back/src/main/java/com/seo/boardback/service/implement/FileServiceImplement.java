package com.seo.boardback.service.implement;

import org.hibernate.validator.constraints.UUID;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.seo.boardback.service.FileService;

@Service
public class FileServiceImplement implements FileService {

    @Override
    public String upload(MultipartFile file) {
        if (file.isEmpty()) return null; 

        String originalFileNmae = file.getOriginalFilename();
        String extension = originalFileNmae.substring(originalFileNmae.lastIndexOf("."));
        
            
        
    }

    @Override
    public Resource getImage(String fileName) {
    }
    
}
