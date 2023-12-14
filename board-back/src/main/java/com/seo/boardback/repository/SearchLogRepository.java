package com.seo.boardback.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.seo.boardback.entity.SearchLogEntity;

public interface SearchLogRepository extends JpaRepository<SearchLogEntity, Integer> {
    
}
