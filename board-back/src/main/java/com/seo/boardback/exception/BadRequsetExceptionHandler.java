package com.seo.boardback.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.seo.boardback.dto.response.ResponseDTO;

/**
 * BadRequsetExceptionHandler
 */
@RestControllerAdvice
public class BadRequsetExceptionHandler {

    @ExceptionHandler({MethodArgumentNotValidException.class, HttpMessageNotReadableException.class})
    public ResponseEntity<ResponseDTO> vaildationExceptionHandler(Exception exception){
        return ResponseDTO.vaildationFailed();
        
    }

    
}