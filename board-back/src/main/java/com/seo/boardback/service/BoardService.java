package com.seo.boardback.service;

import com.seo.boardback.dto.request.board.PostBoardRequestDTO;
import com.seo.boardback.dto.request.board.PostCommentRequestDTO;
import com.seo.boardback.dto.response.board.*;
import org.springframework.http.ResponseEntity;

public interface BoardService {
    ResponseEntity<? super GetBoardResponseDTO> getBoard(Integer boardNumber);
    ResponseEntity<? super PostBoardResponseDTO> postBoard(PostBoardRequestDTO dto, String email);
    ResponseEntity<? super PostCommentResponseDTO> postComment(PostCommentRequestDTO dto, Integer boardNumber, String email);
    ResponseEntity<? super PutFavoriteResponseDTO> putFavorite(Integer boardNumber, String email);

    ResponseEntity<? super GetCommentListResponseDTO> getCommentList(Integer boardNumber);
    ResponseEntity<? super GetFavoriteListResponseDTO> getFavoriteList(Integer boardNumber);
}
