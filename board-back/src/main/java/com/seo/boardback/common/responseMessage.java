package com.seo.boardback.common;

// 응답(response Message 정의)
public interface ResponseMessage {
    // HTTP Status 200
    /* public static final*/ String SUCCESS = "Success."; 

    //HTTP Status 400
    String VALIDATION_FAILED = "Validation Failed.";        // 유효성 검증 실패
    String DUPLICATE_EMAIL = "Duplicate email.";            // 중복된 이메일
    String DUPLICATE_NICKNAME = "Duplicate Nickname.";      // 중복된 닉네임
    String DUPLICATE_TEL_NUMBER = "Duplicate Tel Number.";  // 중복된 전화번호
    String NOT_EXISTED_USER = "This user does not Exist";   // 존재하지 않는 유저
    String NOT_EXISTED_BOARD = "This board does not Exist"; // 존재하지 않는 게시물

    // HTTP Status 401
    String SIGN_IN_FAIL = "Sign In Failed.";                // 로그인 실패
    String AUTHORIZATION_FAIL = "Authorization Failed.";    // 인증 실패

    //HTTP Status 403
    String NO_PERMISSION =  "NO Permission.";               // 권한 없음

    //HTTP Status 500
    String DATABASE_ERROR = "Database Error.";              // 데이터베이스 에러
    
}
