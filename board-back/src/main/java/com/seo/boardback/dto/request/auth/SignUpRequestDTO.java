package com.seo.boardback.dto.request.auth;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor

public class SignUpRequestDTO {

    //required - NotBlank

    @NotBlank @Email
    private String email;

    @NotBlank @Size(min= 0 , max = 20)
    private String password;

    @NotBlank
    private String nickname;

    @NotBlank @Pattern(regexp = "^[0-9](11,13)$") // 숫자 0~9 11, 13자리 정규식
    private String telNumber;

    @NotBlank
    private String address;

    private String addressDetail;

    @NotNull @AssertTrue
    private Boolean agreePersonal; // 개인정보 수집 동의 반드시 True


    
}
