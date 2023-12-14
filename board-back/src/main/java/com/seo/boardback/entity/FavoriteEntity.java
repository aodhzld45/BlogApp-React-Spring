package com.seo.boardback.entity;

import com.seo.boardback.entity.primaryKey.FavoritePK;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "favorite")
@Table(name = "favorite")
@IdClass(FavoritePK.class) // 복합키 표시
public class FavoriteEntity {

    @Id
    private String userEmail;

    @Id
    private int boardNumber;

    
}
