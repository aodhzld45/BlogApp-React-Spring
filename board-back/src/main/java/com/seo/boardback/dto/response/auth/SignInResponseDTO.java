package com.seo.boardback.dto.response.auth;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.seo.boardback.common.ResponseCode;
import com.seo.boardback.common.ResponseMessage;
import com.seo.boardback.dto.response.ResponseDTO;

import lombok.Getter;

@Getter
public class SignInResponseDTO extends ResponseDTO {

    private String token;
    private int expirationTime;

    public SignInResponseDTO(String token) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.token =token;
        this.expirationTime = 3000;
    }

    public static ResponseEntity<SignInResponseDTO> success(String token) {
        SignInResponseDTO result = new SignInResponseDTO(token);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    public static ResponseEntity<ResponseDTO> signInFail() {
        ResponseDTO result = new ResponseDTO(ResponseCode.SIGN_IN_FAIL, ResponseMessage.SIGN_IN_FAIL);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
    }

    


    

    
}
