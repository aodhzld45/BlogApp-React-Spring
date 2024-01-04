package com.seo.boardback.service.implement;

import com.seo.boardback.dto.request.board.PostBoardRequestDTO;
import com.seo.boardback.dto.request.board.PostCommentRequestDTO;
import com.seo.boardback.dto.response.ResponseDTO;
import com.seo.boardback.dto.response.board.*;
import com.seo.boardback.entity.BoardEntity;
import com.seo.boardback.entity.CommentEntity;
import com.seo.boardback.entity.FavoriteEntity;
import com.seo.boardback.entity.ImageEntity;
import com.seo.boardback.repository.*;
import com.seo.boardback.repository.resultSet.GetBoardResultSet;
import com.seo.boardback.repository.resultSet.GetFavoriteListResultSet;
import com.seo.boardback.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BoardServiceImplement implements BoardService {
    private final BoardRepository boardRepository;
    private final ImageRepository imageRepository;
    private final UserRepository userRepository;
    private final FavoriteRepository favoriteRepository;
    private final CommentRepository commentRepository;

    // 게시물 상세
    @Override
    public ResponseEntity<? super GetBoardResponseDTO> getBoard(Integer boardNumber) {

        GetBoardResultSet resultSet = null;
        List<ImageEntity> imageEntities = new ArrayList<>();

        try {
            resultSet = boardRepository.getBoard(boardNumber);
            if (resultSet == null) return GetBoardResponseDTO.noExistedBoard();
            imageEntities = imageRepository.findByBoardNumber(boardNumber);

            BoardEntity boardEntity = boardRepository.findByBoardNumber(boardNumber);
//          조회수 증가
            boardEntity.increaseViewCount();
            boardRepository.save(boardEntity);

        }catch (Exception e){
            e.printStackTrace();
            return ResponseDTO.databaseError();
        }

        return GetBoardResponseDTO.success(resultSet, imageEntities);

    }

    // 게시물 작성
    @Override
    public ResponseEntity<? super PostBoardResponseDTO> postBoard(PostBoardRequestDTO dto, String email) {
        try {
            boolean existsByEmail = userRepository.existsByEmail(email);
            if (!existsByEmail) return  PostBoardResponseDTO.NOtExistedUser();
            BoardEntity boardEntity = new BoardEntity(dto, email);
            boardRepository.save(boardEntity);

            int boardNumber = boardEntity.getBoardNumber();

            List<String> boardImageList = dto.getBoardImageList();
            List<ImageEntity> imageEntities = new ArrayList<>();

//          반복으로 이미지 테이블에 이미지 추가
            for (String image: boardImageList) {
                ImageEntity imageEntity = new ImageEntity(boardNumber, image);
                imageEntities.add(imageEntity);

            }

            imageRepository.saveAll(imageEntities);

        }catch (Exception e){
            e.printStackTrace();
            return ResponseDTO.databaseError();
        }

        return PostBoardResponseDTO.success();

    }
    // 댓글 작성
    @Override
    public ResponseEntity<? super PostCommentResponseDTO> postComment(PostCommentRequestDTO dto, Integer boardNumber, String email) {
        try {
            BoardEntity boardEntity = boardRepository.findByBoardNumber(boardNumber);
            if (boardEntity == null) return PostCommentResponseDTO.noExistBoard();

            boolean existedUser = userRepository.existsByEmail(email);
            if (!existedUser) return PostCommentResponseDTO.noExistUser();

            CommentEntity commentEntity = new CommentEntity(dto, boardNumber, email);
            boardEntity.increaseCommentCount();
            commentRepository.save(commentEntity);

        }catch (Exception e){
            e.printStackTrace();
            return ResponseDTO.databaseError();
        }

        return PostCommentResponseDTO.success();

    }

    //  좋아요 기능
    @Override
    public ResponseEntity<? super PutFavoriteResponseDTO> putFavorite(Integer boardNumber, String email) {
       try {
           // 만약 해당 이메일로 등록된 사용자가 존재하지 않는다면, 존재하지 않는 사용자로 간주하고 해당 응답을 반환
           boolean existsByEmail = userRepository.existsByEmail(email);
           if (!existsByEmail) return PutFavoriteResponseDTO.notExitedUser();

           BoardEntity boardEntity = boardRepository.findByBoardNumber(boardNumber);
           if (boardEntity == null) return PutFavoriteResponseDTO.notExistedBoard();

           // 주어진 게시판 번호와 사용자 이메일에 대한 좋아요 정보를 데이터베이스에서 조회
           FavoriteEntity favoriteEntity = favoriteRepository.findByBoardNumberAndUserEmail(boardNumber, email);
           // 만약 조회한 즐겨찾기 정보가 없다면 (null), 새로운 FavoriteEntity 객체를 생성하고 데이터베이스에 저장
           if (favoriteEntity == null){
               favoriteEntity = new FavoriteEntity(email, boardNumber);
               favoriteRepository.save(favoriteEntity);
               boardEntity.increaseFavoriteCount();
           }else {
               // 조회한 좋아요 정보가 이미 존재한다면, 해당 정보를 데이터베이스에서 삭제
               favoriteRepository.delete(favoriteEntity);
               boardEntity.decreaseFavoriteCount();
           }
           boardRepository.save(boardEntity);

       }catch (Exception e) {
           e.printStackTrace();
           return ResponseDTO.databaseError();
       }
        return PutFavoriteResponseDTO.success();
    }



    //  좋아요 리스트 불러오기
    @Override
    public ResponseEntity<? super GetFavoriteListResponseDTO> getFavoriteList(Integer boardNumber) {
        List<GetFavoriteListResultSet> resultSets = new ArrayList<>();

        try{
            boolean existedBoard = boardRepository.existsByBoardNumber(boardNumber);
            if (!existedBoard) return GetFavoriteListResponseDTO.noExistedBoard();

            resultSets = favoriteRepository.getFavoriteList(boardNumber);

        }catch (Exception e){
            e.printStackTrace();
            return ResponseDTO.databaseError();

        }

        return GetFavoriteListResponseDTO.success(resultSets);
    }

}
