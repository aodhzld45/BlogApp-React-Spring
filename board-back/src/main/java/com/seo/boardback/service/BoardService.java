package com.seo.boardback.service;

import com.seo.boardback.dto.request.board.PostBoardRequestDTO;
import com.seo.boardback.dto.response.board.GetBoardResponseDTO;
import com.seo.boardback.dto.response.board.GetFavoriteListResponseDTO;
import com.seo.boardback.dto.response.board.PostBoardResponseDTO;
import com.seo.boardback.dto.response.board.PutFavoriteResponseDTO;
import org.springframework.http.ResponseEntity;

public interface BoardService {
    ResponseEntity<? super GetBoardResponseDTO> getBoard(Integer boardNumber);
    ResponseEntity<? super PostBoardResponseDTO> postBoard(PostBoardRequestDTO dto, String email);
    ResponseEntity<? super PutFavoriteResponseDTO> putFavorite(Integer boardNumber, String email);

    ResponseEntity<? super GetFavoriteListResponseDTO> getFavoriteList(Integer boardNumber);
}
