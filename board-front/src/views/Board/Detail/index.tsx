import React from 'react'
import './style.css';

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
  return(
    <></>
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
