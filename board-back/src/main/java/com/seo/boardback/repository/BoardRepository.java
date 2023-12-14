package com.seo.boardback.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.seo.boardback.entity.BoardEntity;

/**
 * BoardRepository
 */
@Repository
public interface BoardRepository extends JpaRepository<BoardEntity, Integer>{

}

