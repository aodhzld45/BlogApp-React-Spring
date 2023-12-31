import React, { useEffect, useState } from 'react'
import './style.css';
import FavarioteItem from 'components/FavarioteItem';
import { CommentListItem, FavoriteListItem } from 'types/interface';
import { commentListMock, favoriteListMock } from 'mocks';
import CommentItem from 'components/CommentItem';
import Pagination from 'components/Pagination';

// Component : 게시물 상세 화면 (BoardDetail) 컴포넌트
export default function BoardDetail() {

// Component : 게시물 상세 화면 (BoardDetail) 상단 컴포넌트
const BoardDetailTop = () => {
  return(
    <div id='board-detail-top'>
    <div className='board-detail-top-header'>
      <div className='board-detail-title'>{'타이틀타이틀타이틀타이틀타이틀타이틀'}</div>
      <div className='board-detail-top-sub-box'>

        <div className='board-detail-write-info-box'>
          <div className='board-detail-writer-profile-image'></div>
          <div className='board-detail-writer-nickname'>{'닉네닉네임닉네임임닉네임닉네임닉네임'}</div>
          <div className='board-detail-info-divider'>{`\|`}</div>
          <div className='board-detail-write-date'>{'2024. 01. 06 '}</div>
        </div>

        <div className='icon-button'>
          <div className='icon more-icon'></div>
        </div>

        <div className='board-detail-more-box'>
          <div className='board-detail-update-button'>{'수정'}</div>
          <div className='divider'></div>
          <div className='board-detatil-delete-button'>{'삭제'}</div>
        </div>

      </div>
    </div>
    <div className='divider'></div>
    <div className='board-detail-top-main'>
      <div className='board-detatil-main-text'>{'메인 텍스트 글입니다.'}</div>
      <div className='board-detatil-main-image'></div>
    </div>
  </div>
  );
};


// Component : 게시물 상세 화면 (BoardDetail) 하단 컴포넌트
const BoardDetailBottom = () => {

  const [favoriteList, setFavoriteList] = useState<FavoriteListItem[]>([]);
  const [commentList, setCommentList] = useState<CommentListItem[]>([]);

// Effect : 
useEffect(()  => {
  setFavoriteList(favoriteListMock);
  setCommentList(commentListMock);
},[]) 

  return(
    <div id='board-detail-bottom'>

      <div className='board-detail-bottom-button-box'>

        <div className='board-detail-bottom-button-group'>
          <div className='icon-button'>
            <div className='icon favorite-fill-icon'></div>
          </div>

          <div className='board-detail-bottom-button-text'>{`좋아요 ${12}`}</div>

          <div className='icon-button'>
            <div className='icon up-light-icon'></div>
          </div>
        </div>

        <div className='board-detail-bottom-button-group'>
          <div className='icon-button'>
            <div className='icon comment-icon'></div>
          </div>
          <div className='board-detail-bottom-button-text'>{`댓글 ${12}`}</div>

          <div className='icon-button'>
            <div className='icon up-light-icon'></div>
          </div>
        </div>
        
      </div>

      <div className='board-detail-bottom-favorite-box'>

        <div className='board-detail-bottom-favorite-container'>
          <div className='board-detail-bottom-favorite-title'>{'좋아요'}<span className='emphasis'>{12}</span></div>
          <div className='board-detail-bottom-favorite-contents'>
            {favoriteList.map(item => <FavarioteItem favoriteListItem={item} />)}
          </div>
        </div>

      </div>

      <div className='board-detail-bottom-comment-box'>
        <div className='board-detail-bottom-comment-container'>
          <div className='board-detail-bottom-comment-title'>{'댓글'}<span className='emphasis'>{12}</span></div>
          <div className='board-detail-bottom-comment-list-container'>
            {commentList.map(item => <CommentItem commentListItem={item} />)}
          </div>
        </div>
        <div className='divider'></div>
        <div className='board-detail-bottom-comment-pagination-box'>
        <Pagination />
        </div>
        <div className='board-detail-bottom-comment-input-container'>
          <div className='board-detail-bottom-comment-input-container'>
            <textarea className='board-detail-bottom-comment-textarea' placeholder='댓글을 작성해주세요.'/>
            <div className='board-detail-bottom-comment-button-box'>
              <div className='disable-button'>{'댓글달기'}</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

// Render : 게시물 상세 화면 (BoardDetail) 렌더링 부분
  return (
    <div id='board-detail-wrapper'>
      <div className='board-detail-container'>

        <BoardDetailTop />
        <BoardDetailBottom />

      </div>
    </div>
  )
}
