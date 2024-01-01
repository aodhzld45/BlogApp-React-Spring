package com.seo.boardback.controller;

import com.seo.boardback.dto.request.board.PostBoardRequestDTO;
import com.seo.boardback.dto.response.board.GetBoardResponseDTO;
import com.seo.boardback.dto.response.board.PostBoardResponseDTO;
import com.seo.boardback.dto.response.board.PutFavoriteResponseDTO;
import com.seo.boardback.service.BoardService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/board")
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;

    @GetMapping("/{boardNumber}")
    public ResponseEntity<? super GetBoardResponseDTO> getBoard(
            @PathVariable("boardNumber") Integer boardNumber
    ) {
        ResponseEntity<? super GetBoardResponseDTO> response = boardService.getBoard(boardNumber);
        return response;
    }

    @PostMapping("")
    public ResponseEntity<? super PostBoardResponseDTO> postBoard(
            @RequestBody @Valid PostBoardRequestDTO requestBody,
            @AuthenticationPrincipal String email
            ) {
        ResponseEntity<? super PostBoardResponseDTO> response = boardService.postBoard(requestBody, email);
        return response;
    }

    @PutMapping("/{boardNumber}/favorite")
    public ResponseEntity<? super PutFavoriteResponseDTO> putFavorite(
            @PathVariable("boardNumber") Integer boardNumber,
            @AuthenticationPrincipal String email
    ) {
        ResponseEntity<? super PutFavoriteResponseDTO> response = boardService.PutFavorite(boardNumber, email);
        return response;
    }

}
