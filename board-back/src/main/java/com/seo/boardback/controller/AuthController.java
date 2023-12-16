package com.seo.boardback.controller;

import com.seo.boardback.dto.response.auth.SignUpResponseDTO;
import com.seo.boardback.dto.response.auth.SignInResponseDTO;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.seo.boardback.dto.request.auth.SignInRequestDTO;
import com.seo.boardback.dto.request.auth.SignUpRequestDTO;
import com.seo.boardback.service.AuthService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    // Service에서 비즈니스 로직을 작성
    private final AuthService authService;

    // Controller에서는 비즈니스 로직 X -> requset을 받아서 response만 해주는 역할.
    @PostMapping("/sign-up")
    public ResponseEntity<? super SignUpResponseDTO> signUp(@RequestBody @Valid SignUpRequestDTO requestBody) {

        // System.out.println(requestBody);
        ResponseEntity<? super SignUpResponseDTO> response = authService.signUp(requestBody);
        return response;
    
    }

    @PostMapping("/sign-in")
    public ResponseEntity<? super SignInResponseDTO> signIn(@RequestBody @Valid SignInRequestDTO requestBody){
       System.out.println(requestBody);
        ResponseEntity<? super SignInResponseDTO>  response = authService.signIn(requestBody);
        return response;
    }

    

    
}
