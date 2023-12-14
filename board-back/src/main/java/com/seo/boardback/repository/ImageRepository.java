package com.seo.boardback.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.seo.boardback.entity.ImageEntity;

public interface ImageRepository extends JpaRepository<ImageEntity, Integer>{
    
}
