package com.seo.boardback.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.seo.boardback.entity.FavoriteEntity;
import com.seo.boardback.entity.primaryKey.FavoritePK;

@Repository
public interface FavoriteRepository extends JpaRepository<FavoriteEntity, FavoritePK>{

    FavoriteEntity findByBoardNumberAndUserEmail(Integer boardNumber, String userEmail);
    
}
