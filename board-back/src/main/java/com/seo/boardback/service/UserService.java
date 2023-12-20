package com.seo.boardback.service;

import org.springframework.http.ResponseEntity;

import com.seo.boardback.dto.response.user.GetSignInUserResponseDTO;

public interface UserService {
    // 유저 정보 불러오기
        ResponseEntity<? super GetSignInUserResponseDTO> getSignInUser(String email);
} 
