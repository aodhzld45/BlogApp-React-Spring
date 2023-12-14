package com.seo.boardback.service;

import com.seo.boardback.dto.response.auth.SignUpResponseDTO;
import org.springframework.http.ResponseEntity;

import com.seo.boardback.dto.request.auth.SignUpRequestDTO;

public interface AuthService {

    // ? super 부모타입도 같이 반환을 받음
    ResponseEntity<? super SignUpResponseDTO> signUp(SignUpRequestDTO dto);
    
}
