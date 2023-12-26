package com.seo.boardback.service;

import com.seo.boardback.dto.request.board.PostBoardRequestDTO;
import com.seo.boardback.dto.response.board.PostBoardResponseDTO;
import org.springframework.http.ResponseEntity;

public interface BoardService {
    ResponseEntity<? super PostBoardResponseDTO> postBoard(PostBoardRequestDTO dto, String email);
}
