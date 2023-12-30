import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import './style.css';
import { useBoardStore, useLoginUserStore } from 'stores';
import { useNavigate } from 'react-router-dom';
import { MAIN_PATH } from 'constant';
import { useCookies } from 'react-cookie';

// Component : 게시물 작성 화면 (BoardWrite) 컴포넌트
export default function BoardWrite() {

// State : 본문 영역 요소 상태 관리 
const contentRef = useRef<HTMLTextAreaElement | null>(null);
// State : 제목 영역 요소 상태 관리
const titleRef = useRef<HTMLTextAreaElement | null>(null);
// State : 이미지 입력 요소 참조 상태 관리
const imageInputRef = useRef<HTMLInputElement | null>(null);

// State : 게시물 상태 관리
const {title, setTitle} = useBoardStore(); 
const {content, setContent} = useBoardStore();
const {boardImageFileList, setBoardImageFileList} = useBoardStore();
const {resetBoard} = useBoardStore(); 

// State : 쿠키 상태값 관리
const [ cookies, setCookies ] = useCookies();
// State : 게시물 이미지 미리보기 URL 상태
const [imageUrls, setImageUrls] = useState<string[]>([]);

// function : Navigate 함수
const navigate = useNavigate();

// Event handler : 제목 변경 이벤트 처리 핸들러
const onTitleChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
  const {value} = e.target;
  setTitle(value);

  if(!titleRef.current) return;
  titleRef.current.style.height = 'auto';
  titleRef.current.style.height = `${titleRef.current.scrollHeight}px`;
};

// Event handler : 내용(textarea) 변경 이벤트 처리 핸들러
const onContentChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
  const {value} = e.target;
  setContent(value);

  if(!contentRef.current) return;
  contentRef.current.style.height = 'auto';
  contentRef.current.style.height = `${contentRef.current.scrollHeight}px`;
}

// Event handler : 이미지 변경 이벤트 처리 핸들러
const onImageChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
  if (!e.target.files || !e.target.files.length) return;
  const file = e.target.files[0];
  // 썸네일용 이미지 작업
  // 파일 꺼내와서 imageUrls 상태에 담기
  const imageUrl = URL.createObjectURL(file);
  // 새로운 이미지 URL 추가
  setImageUrls(newImageUrls => [...newImageUrls, imageUrl]);

  // APi 통신 이미지 업로드(setBoardImageFileList)에도 셋팅
  const newBoardImageFileList = boardImageFileList.map(item => item);
  newBoardImageFileList.push(file);
  setBoardImageFileList(newBoardImageFileList);

  // 중복 이미지 처리 부분
  if(!imageInputRef.current) return;
  imageInputRef.current.value = '';
};

// Event handler : 이미지 닫기 버튼 클릭 이벤트 처리 핸들러
const imageCloseButtonClickHandler = (deleteIndex : number) => {
  if (!imageInputRef.current) return;
  imageInputRef.current.value = '';

  const newImageUrls = imageUrls.filter((url, index) => index !== deleteIndex);
  setImageUrls(newImageUrls);

  const newBoardImageFileList = boardImageFileList.filter((file, index) => index !== deleteIndex);
  setBoardImageFileList(newBoardImageFileList);

};

// Event handler : 이미지 업로드 버튼 클릭 이벤트 처리 핸들러
const onImageUploadButtonClickHandler = () => {
  if (!imageInputRef.current) return;
  imageInputRef.current.click();
};


// Effect : 첫 렌더 마운트시 실행할 함수
useEffect(() => {
  const accessToken = cookies.accessToken;
  if (!accessToken) {
    navigate(MAIN_PATH());
    return
  }
  resetBoard();
}, []);



// Render : 게시물 작성 화면 (BoardWrite) 렌더링 부분
  return (
    <div id='board-write-wrapper'>
      <div className='board-write-container'>
        <div className='board-write-box'>
          <div className='board-write-title-box'>
            <textarea ref={titleRef} className='board-write-title-textarea' rows={1} placeholder='제목을 작성해주세요.' value={title} onChange={onTitleChangeHandler} />
          </div>

          <div className='divider'></div>

          <div className='board-write-content-box'>
            <textarea ref={contentRef} className='board-write-content-textarea'  placeholder='본문을 작성해주세요.' value={content} onChange={onContentChangeHandler} />
            <div className='icon-button' onClick={onImageUploadButtonClickHandler}>
              <div className='icon image-box-light-icon'></div>
            </div>
            <input ref={imageInputRef} type='file' accept='image/*' style={{"display": "none"}} onChange={onImageChangeHandler}/>
          </div>
         <div className='board-write-images-box'>
          {/* 이미지를 저장할 박스들 */}
          {imageUrls.map((imageUrl, index) => (
              <div className='board-write-image-box' >
              <img className='board-write-image' key={index} src={imageUrl} alt={`썸네일 ${index}`}  />
              <div className='icon-button image-close' onClick={() => {imageCloseButtonClickHandler(index)}}>
                <div className='icon close-icon'></div>
              </div>
            </div>
          ))}
          
         </div>
        </div>
      </div>
    </div>
  )
}
