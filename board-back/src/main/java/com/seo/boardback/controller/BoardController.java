package com.seo.boardback.controller;

import com.seo.boardback.dto.request.board.PostBoardRequestDTO;
import com.seo.boardback.dto.request.board.PostCommentRequestDTO;
import com.seo.boardback.dto.response.board.*;
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

    // 게시물 불러오기
    @GetMapping("/{boardNumber}")
    public ResponseEntity<? super GetBoardResponseDTO> getBoard(
            @PathVariable("boardNumber") Integer boardNumber
    ) {
        ResponseEntity<? super GetBoardResponseDTO> response = boardService.getBoard(boardNumber);
        return response;
    }
    // 게시물 작성
    @PostMapping("")
    public ResponseEntity<? super PostBoardResponseDTO> postBoard(
            @RequestBody @Valid PostBoardRequestDTO requestBody,
            @AuthenticationPrincipal String email
            ) {
        ResponseEntity<? super PostBoardResponseDTO> response = boardService.postBoard(requestBody, email);
        return response;
    }
    // 댓글 작성
    @PostMapping("/{boardNumber}/comment")
    public ResponseEntity<? super PostCommentResponseDTO> postComment(
            @RequestBody @Valid PostCommentRequestDTO requestBody,
            @PathVariable("boardNumber") Integer boardNumber,
            @AuthenticationPrincipal String email
            ){
        ResponseEntity<? super PostCommentResponseDTO> response = boardService.postComment(requestBody, boardNumber, email);
        return response;
    }

    @GetMapping("/{boardNumber}/comment-list")
    public ResponseEntity<? super GetCommentListResponseDTO> getCommnetList(
            @PathVariable("boardNumber") Integer boardNumber
    ){
        ResponseEntity<? super GetCommentListResponseDTO> response = boardService.getCommentList(boardNumber);
        return response;
    }

    // 좋아요
    @PutMapping("/{boardNumber}/favorite")
    public ResponseEntity<? super PutFavoriteResponseDTO> putFavorite(
            @PathVariable("boardNumber") Integer boardNumber,
            @AuthenticationPrincipal String email
    ) {
        ResponseEntity<? super PutFavoriteResponseDTO> response = boardService.putFavorite(boardNumber, email);
        return response;
    }
    // 좋아요 리스트 불러오기
    @GetMapping("/{boardNumber}/favorite-list")
    public ResponseEntity<? super GetFavoriteListResponseDTO> getFavoriteList(
            @PathVariable("boardNumber") Integer boardNumber
    ){
        ResponseEntity<? super GetFavoriteListResponseDTO> response = boardService.getFavoriteList(boardNumber);
        return response;
    }


}
