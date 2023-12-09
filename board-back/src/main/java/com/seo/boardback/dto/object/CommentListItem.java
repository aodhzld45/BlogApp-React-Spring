package com.seo.boardback.dto.object;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class CommentListItem {
    private String nickName;
    private String profileImage;
    private String writeDatetime;
    private String content;
}
