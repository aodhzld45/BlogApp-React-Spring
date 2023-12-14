package com.seo.boardback.dto.response;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.seo.boardback.common.ResponseCode;
import com.seo.boardback.common.ResponseMessage;

import lombok.Getter;

/**
 * SignUpResponsDTO
 */
@Getter
public class SignUpResponseDTO extends ResponseDTO {

    private SignUpResponseDTO() {
        super(ResponseCode.SUCCESS , ResponseMessage.SUCCESS);
    }

    public static ResponseEntity<SignUpResponseDTO> success() {
        SignUpResponseDTO result = new SignUpResponseDTO();
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    // 이메일 중복
    public static ResponseEntity<ResponseDTO> duplicateEmail() {
        ResponseDTO result = new ResponseDTO(ResponseCode.DUPLICATE_EMAIL, ResponseMessage.DUPLICATE_EMAIL);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
    } 

    
    // 닉네임 중복
    public static ResponseEntity<ResponseDTO> duplicateNickname() {
        ResponseDTO result = new ResponseDTO(ResponseCode.DUPLICATE_NICKNAME, ResponseMessage.DUPLICATE_NICKNAME);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
    } 

    
    // 전화번호 중복
    public static ResponseEntity<ResponseDTO> duplicateTelNumber() {
        ResponseDTO result = new ResponseDTO(ResponseCode.DUPLICATE_TEL_NUMBER, ResponseMessage.DUPLICATE_TEL_NUMBER);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
    } 

    
}