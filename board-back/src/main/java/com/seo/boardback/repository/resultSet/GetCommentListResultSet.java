package com.seo.boardback.repository.resultSet;

/*SELECT
        U.nickname AS nickname,
        U.profile_image AS profileImage,
        C.write_datetime AS writeDatetime,
        C.content AS content
        FROM comment AS C
        INNER JOIN `user` AS U
        ON C.user_email = U.email
        WHERE C.board_number = 1
        ORDER BY write_datetime DESC;*/
public interface GetCommentListResultSet {
    String getNickname();
    String getProfileImage();
    String getWriteDatetime();
    String getContent();
}
