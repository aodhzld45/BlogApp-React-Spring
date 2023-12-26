package com.seo.boardback.service.implement;

import com.seo.boardback.dto.response.board.PostBoardResponseDTO;
import com.seo.boardback.service.BoardService;
import lombok.NoArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@NoArgsConstructor
public class BoardSerivceImplement implements BoardService {

    @Override
    public ResponseEntity<? super PostBoardResponseDTO> postBoard(PostBoardResponseDTO dto, String email) {
        try {

        }catch (Exception e){
            e.printStackTrace();
            return null;
        }



        return null;



    }
}
