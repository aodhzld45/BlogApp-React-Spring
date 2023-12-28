import React, { useEffect, useRef, useState } from 'react'
import './style.css';
import { useBoardStore } from 'stores';

// Component : 게시물 작성 화면 (BoardWrite) 컴포넌트
export default function BoardWrite() {

// State : 본문 영역 요소 상태 관리 
const contentRef = useRef<HTMLTextAreaElement | null>(null);
// State : 이미지 입력 요소 참조 상태 관리
const imageInputRef = useRef<HTMLInputElement | null>(null);

// State : 게시물 상태 관리
const {title, setTitle} = useBoardStore(); 
const {content, setContent} = useBoardStore();
const {boardImageFileList, setBoardImageFileList} = useBoardStore();
const {resetBoard} = useBoardStore(); 

// State : 게시물 이미지 미리보기 URL 상태
const [imageUrls, setImageUrls] = useState<String[]>([]);

// Effect : 첫 렌더 마운트시 실행할 함수
useEffect(() => {
  resetBoard();
}, []);



// Render : 게시물 작성 화면 (BoardWrite) 렌더링 부분
  return (
    <div id='board-write-wrapper'>
      <div className='board-write-container'>
        <div className='board-write-box'>
          <div className='board-write-title-box'>
            <input className='board-write-title-input' type='text' placeholder='제목을 작성해주세요.' value={title} />
          </div>

          <div className='divider'></div>

          <div className='board-write-content-box'>
            <textarea ref={contentRef} className='board-write-content-textarea'  placeholder='본문을 작성해주세요.' value={content} />
            <div className='icon-button'>
              <div className='icon image-box-light-icon'></div>
            </div>
            <input ref={imageInputRef} type='file' accept='image/*' style={{"display": "none"}}/>
          </div>
         <div className='board-write-images-box'>
          {/* 이미지를 저장할 박스들 */}
          <div className='board-write-image-box'>
            <img className='board-write-image' alt='newJeans1' src='https://file2.nocutnews.co.kr/newsroom/image/2023/01/21/202301210408091762_0.jpg' />
            <div className='icon-button image-close'>
              <div className='icon close-icon'></div>
            </div>


            <div className='board-write-image-box'>
            <img className='board-write-image'alt='newJeans2' src='https://www.kukinews.com/data/kuk/image/2023/08/07/kuk202308070046.680x.0.jpg' />
            <div className='icon-button image-close'>
              <div className='icon close-icon'></div>
            </div>
          </div>
          </div>
         </div>
        </div>
      </div>
    </div>
  )
}
