package com.seo.boardback.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.seo.boardback.entity.BoardListViewEntity;

public interface BoardListViewRepository extends JpaRepository<BoardListViewEntity, Integer> {
    
}
