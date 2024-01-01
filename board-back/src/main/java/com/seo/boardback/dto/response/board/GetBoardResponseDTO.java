package com.seo.boardback.dto.response.board;

import com.seo.boardback.common.ResponseCode;
import com.seo.boardback.common.ResponseMessage;
import com.seo.boardback.dto.response.ResponseDTO;
import com.seo.boardback.entity.ImageEntity;
import com.seo.boardback.repository.resultSet.GetBoardResultSet;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

@Getter
public class GetBoardResponseDTO extends ResponseDTO {

/*    HTTP status - 200 (ok)
    {
        code: "SU",
        message : "Success",
        boardNumber : int,
        title : Stirng,
        content : String,
        boardImageList : List<String>
        boardImage : String,
        writerEmail : String,
        writeDatetime : String,
        writerNickname : String,
        writerProfileImage : String
    }*/
    private int boardNumber;
    private String title;
    private String content;
    private List<String> boardImageList;
    private String writerEmail;
    private String writeDatetime;
    private String writerNickname;
    private String writerProfileImage;

    private GetBoardResponseDTO(GetBoardResultSet resultSet, List<ImageEntity> imageEntities) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        List<String> boardImageList = new ArrayList<>();
        for (ImageEntity imageEntity: imageEntities) {
            String boardImage = imageEntity.getImage();
            boardImageList.add(boardImage);
        }

        this.boardNumber = resultSet.getBoardNumber();
        this.title = resultSet.getTitle();
        this.content = resultSet.getContent();
        this.boardImageList = boardImageList;
        this.writeDatetime = resultSet.getWriteDatetime();
        this.writerEmail = resultSet.getWriterEmail();
        this.writerNickname = resultSet.getWriterNickname();
        this.writerProfileImage = resultSet.getWriterProfileImage();
    }

    public static ResponseEntity<GetBoardResponseDTO> success(GetBoardResultSet resultSet, List<ImageEntity> imageEntities) {
        GetBoardResponseDTO result = new GetBoardResponseDTO(resultSet, imageEntities);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    public static ResponseEntity<ResponseDTO> noExistedBoard() {
        ResponseDTO result = new ResponseDTO(ResponseCode.NOT_EXISTED_BOARD, ResponseMessage.NOT_EXISTED_BOARD);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
    }

/*  -- 8. 상세 게시물 불러오기
    SELECT
    B.board_number AS board_number,
    B.title AS title,
    B.content AS content,
    B.write_datetime AS write_datetime,
    B.writer_email AS writer_email,
    U.nickname AS nickname,
    U.profile_image AS profile_image
    FROM board AS B
    INNER JOIN `user` AS U
    ON B.writer_email = U.email
    WHERE board_number = 1;

    SELECT image
    FROM image
    WHERE board_number = 1;*/


}
