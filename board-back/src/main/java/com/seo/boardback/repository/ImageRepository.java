package com.seo.boardback.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.seo.boardback.entity.ImageEntity;

import java.util.List;

public interface ImageRepository extends JpaRepository<ImageEntity, Integer>{
    List<ImageEntity> findByBoardNumber(Integer boardNumber);
}
