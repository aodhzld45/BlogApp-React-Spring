package com.seo.boardback.service;

import com.seo.boardback.dto.response.auth.SignInResponseDTO;
import com.seo.boardback.dto.response.auth.SignUpResponseDTO;
import org.springframework.http.ResponseEntity;

import com.seo.boardback.dto.request.auth.SignInRequestDTO;
import com.seo.boardback.dto.request.auth.SignUpRequestDTO;

public interface AuthService {

    // ? super 부모타입도 같이 반환을 받음
    // 회원가입
    ResponseEntity<? super SignUpResponseDTO> signUp(SignUpRequestDTO dto);

    // 로그인
    ResponseEntity<? super SignInResponseDTO> signIn(SignInRequestDTO dto);
                           
    
}
