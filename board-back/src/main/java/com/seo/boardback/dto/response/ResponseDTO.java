package com.seo.boardback.dto.response;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.seo.boardback.common.ResponseCode;
import com.seo.boardback.common.ResponseMessage;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ResponseDTO {
    private String code;
    private String message;

    public static ResponseEntity<ResponseDTO> databaseError() {
        
        ResponseDTO responseBody = new ResponseDTO(ResponseCode.DATABASE_ERROR, ResponseMessage.DATABASE_ERROR);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseBody);
    }
     
}
