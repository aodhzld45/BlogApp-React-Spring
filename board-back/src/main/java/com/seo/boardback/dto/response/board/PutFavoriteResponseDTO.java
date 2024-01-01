package com.seo.boardback.dto.response.board;

import com.seo.boardback.common.ResponseCode;
import com.seo.boardback.common.ResponseMessage;
import com.seo.boardback.dto.response.ResponseDTO;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class PutFavoriteResponseDTO extends ResponseDTO {

    private PutFavoriteResponseDTO() {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
    }

    public static ResponseEntity<PutFavoriteResponseDTO> success() {
        PutFavoriteResponseDTO result = new PutFavoriteResponseDTO();
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    public static ResponseEntity<ResponseDTO> notExistedBoard() {
        ResponseDTO result = new ResponseDTO(ResponseCode.NOT_EXISTED_BOARD, ResponseMessage.NOT_EXISTED_BOARD);
        return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
    }

    public static ResponseEntity<ResponseDTO> notExitedUser() {
        ResponseDTO result = new ResponseDTO(ResponseCode.NOT_EXISTED_USER, ResponseMessage.NOT_EXISTED_USER);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
    }
}
