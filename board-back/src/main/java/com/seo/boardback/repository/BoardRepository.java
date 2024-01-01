package com.seo.boardback.repository;

import com.seo.boardback.repository.resultSet.GetBoardResultSet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.seo.boardback.entity.BoardEntity;

/**
 * BoardRepository
 */
@Repository
public interface BoardRepository extends JpaRepository<BoardEntity, Integer>{

//    boolean existedByBoardNumber(Integer boardNumber);
    BoardEntity findByBoardNumber(Integer boardNumber);
    
//  Native Query ?1은 매개변수로 오는것 중에 첫번째로 오는것을 적용한다는 뜻
    @Query(
        value =
        "SELECT " +
                "B.board_number AS boardNumber, " +
                "B.title AS title, " +
                "B.content AS content, " +
                "B.write_datetime AS writeDatetime, " +
                "B.writer_email AS writerEmail, " +
                "U.nickname AS writerNickname, " +
                "U.profile_image AS writerProfileImage " +
                "FROM board AS B " +
                "INNER JOIN user AS U " +
                "ON B.writer_email = U.email " +
                "WHERE board_number = ?1 ",
            nativeQuery = true
    )
    GetBoardResultSet getBoard(@Param("boardNumber")Integer boardNumber);

}

