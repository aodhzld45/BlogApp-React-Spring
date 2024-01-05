package com.seo.boardback.dto.response.board;

import com.seo.boardback.common.ResponseCode;
import com.seo.boardback.common.ResponseMessage;
import com.seo.boardback.dto.object.CommentListItem;
import com.seo.boardback.dto.response.ResponseDTO;
import com.seo.boardback.repository.resultSet.GetCommentListResultSet;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

@Getter
public class GetCommentListResponseDTO extends ResponseDTO {
    private List<CommentListItem> commentList;

    private GetCommentListResponseDTO(List<GetCommentListResultSet> resultSets) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.commentList = CommentListItem.copyList(resultSets);
    }

    public static ResponseEntity<GetCommentListResponseDTO> success(List<GetCommentListResultSet> resultSets){
        GetCommentListResponseDTO result = new GetCommentListResponseDTO(resultSets);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    public static ResponseEntity<ResponseDTO> noExistedBoard() {
        ResponseDTO result = new ResponseDTO(ResponseCode.NOT_EXISTED_BOARD, ResponseMessage.NOT_EXISTED_BOARD);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
    }


}
