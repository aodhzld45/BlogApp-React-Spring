package com.seo.boardback.repository;

import com.seo.boardback.dto.response.board.GetFavoriteListResponseDTO;
import com.seo.boardback.repository.resultSet.GetFavoriteListResultSet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.seo.boardback.entity.FavoriteEntity;
import com.seo.boardback.entity.primaryKey.FavoritePK;

import java.util.List;

@Repository
public interface FavoriteRepository extends JpaRepository<FavoriteEntity, FavoritePK>{

    FavoriteEntity findByBoardNumberAndUserEmail(Integer boardNumber, String userEmail);

    @Query(
            value = "SELECT U.email AS email, U.nickname AS nickname, U.profile_image AS profileImage " +
                    "FROM favorite AS F " +
                    "INNER JOIN user AS U ON F.user_email = U.email " +
                    "WHERE F.board_number = ?1 ",
            nativeQuery = true
    )
    List<GetFavoriteListResultSet> getFavoriteList(@Param("boardNumber") Integer boardNumber);
    
}
