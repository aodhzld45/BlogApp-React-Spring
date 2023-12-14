package com.seo.boardback.service;

import org.springframework.http.ResponseEntity;

import com.seo.boardback.dto.request.auth.SignUpRequestDTO;
import com.seo.boardback.dto.response.SignUpResponsDTO;

public interface AuthService {

    // ? super 부모타입도 같이 반환을 받음
    ResponseEntity<? super SignUpResponsDTO> signUp(SignUpRequestDTO dto);
    
}
