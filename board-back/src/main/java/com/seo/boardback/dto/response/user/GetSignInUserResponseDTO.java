package com.seo.boardback.dto.response.user;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.seo.boardback.common.ResponseCode;
import com.seo.boardback.common.ResponseMessage;
import com.seo.boardback.dto.response.ResponseDTO;
import com.seo.boardback.entity.UserEntity;

import lombok.Getter;

@Getter
public class GetSignInUserResponseDTO extends ResponseDTO {
    
    private String email;
    private String nickname;
    private String profileImg; 

    public GetSignInUserResponseDTO(UserEntity userEntity) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.email = userEntity.getEmail();
        this.nickname = userEntity.getNickname();
        this.profileImg = userEntity.getProfileImage();
    }

    public static ResponseEntity<GetSignInUserResponseDTO> success(UserEntity userEntity) {
        GetSignInUserResponseDTO result = new GetSignInUserResponseDTO(userEntity);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    public static ResponseEntity<ResponseDTO> NOtExistedUser() {
        ResponseDTO result = new ResponseDTO(ResponseCode.NOT_EXISTED_USER, ResponseMessage.NOT_EXISTED_USER);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
    }


    
    
}
