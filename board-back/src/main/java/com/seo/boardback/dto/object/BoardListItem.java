package com.seo.boardback.dto.object;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

/*boardListItem[] 배열 구조 -
{
boardNumber : int,
title : stirng,
content : string,
favoriteCount : int,
commentCount : int,
viewCount : int,
boardTitleImage : String,
writeDatetime : String,
writerNickname : String,
writerProfileImage : String
}   */
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class BoardListItem {

    private int boardNumber;
    private String title;
    private String content;
    private String boardTitleImage;
    private int favoriteCount;
    private int commentCount;
    private int viewCount;
    private String writeDatetime;
    private String writerNickname;
    private String writerProfileImage;

}
