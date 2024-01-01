package com.seo.boardback.service.implement;

import com.seo.boardback.dto.request.board.PostBoardRequestDTO;
import com.seo.boardback.dto.response.ResponseDTO;
import com.seo.boardback.dto.response.board.GetBoardResponseDTO;
import com.seo.boardback.dto.response.board.PostBoardResponseDTO;
import com.seo.boardback.entity.BoardEntity;
import com.seo.boardback.entity.ImageEntity;
import com.seo.boardback.repository.BoardRepository;
import com.seo.boardback.repository.ImageRepository;
import com.seo.boardback.repository.UserRepository;
import com.seo.boardback.repository.resultSet.GetBoardResultSet;
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

}
