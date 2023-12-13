import './style.css'
import { useNavigate, useParams } from 'react-router-dom'
import { AUTH_PATH, MAIN_PATH, SEARCH_PATH, USER_PATH } from 'constant';
import { useState, ChangeEvent,KeyboardEvent, useRef, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useLoginUserStore } from 'stores';

// Component : 헤더 화면 (Header) 컴포넌트
export default function Header() {

// state : 로그인 유저 상태값 관리
const {loginUser, setLoginUser, resetLoginUser} = useLoginUserStore();

// state : 쿠키(Cookie) 상태값 관리
const [cookie, setCookie] = useCookies();

// state : 로그인 상태값 관리
const [isLogin, setIsLogin] = useState<boolean>(false);

// function : 네비게이트 함수 
const navigate = useNavigate();

// event handler : 로고 클릭 이벤트 함수
const onLogoClickHandler = () => {
  navigate(MAIN_PATH());
}

/* ===== 검색 컴포넌트 SearchButton ===== */
// Component : 검색 버튼 컴포넌트
const SearchButton = () => {

// state : 검색어 버튼 요소 참조 상태값 관리
const searchButtonRef = useRef<HTMLDivElement | null>(null);

// State : 검색 버튼 상태값 관리
const [searchStatus, setSearchStatus] = useState<boolean>(true);
// State : 검색어 상태값 관리
const [word, setWord] = useState<string>('');
// State : 검색어 PathVariable 상태값 관리 -> url에 태워보낼 파라미터 이름과 같아야함 searchWord
const { searchWord } = useParams();

// event handler : 검색 버튼 클릭 이벤트 처리 함수
const onSearchButtonClickHandler = () => {
  if (!searchStatus) {
    setSearchStatus(!searchStatus);
    return;
  }
  navigate(SEARCH_PATH(word));
}

// event handler : 검색어 변경 이벤트 처리 함수
const onSearchWordChangHandler = (e :ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;
  setWord(value);
}

// event handler : 검색어 키 이벤트 처리 함수
const onSearchWordkeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
  if (e.key !== 'Enter') return;
  if (!searchButtonRef.current) return;
  searchButtonRef.current.click();
}

// effect : 검색어 Path Variable 변경할 때 마다 실행할 함수
useEffect(() => {
  // 만약 검색어가 존재한다면
  if(searchWord) {
    // 사용자에게 입력된 HTMLInputElement(word) 검색어에 파라미터값인 searchWord를 넣어주고,
    setWord(searchWord);
    // setSearchStatus(true) 값으로 검색 화면으로 이동시 그대로 검색된 검색어를 유지 
    setSearchStatus(true);
  }
}, [searchWord]);


// Render : 검색 아이콘 화면 (SearchButton) 렌더링 (클릭 false 상태)
if(!searchStatus)
  return (
  <div className='icon-button' onClick={onSearchButtonClickHandler}>
    <div className='icon search-light-icon'></div>
  </div>);
// Render : 검색 아이콘 화면 (SearchButton) 렌더링 (클릭 true 상태)
  return (
    <div className='header-search-input-box'>
      <input className='header-search-input' type='text' value={word} placeholder='검색어를 입력해주세요.' onChange={onSearchWordChangHandler} onKeyDown={onSearchWordkeyDownHandler}/>
      <div className='icon-button' onClick={onSearchButtonClickHandler}> 
        <div className='icon search-light-icon'></div>
      </div>
    </div>
  );
}

/* ===== 로그인 또는 마이페이지 버튼 컴포넌트 LoginMyPageButton ===== */
// Component : 로그인 또는 마이페이지 버튼 컴포넌트 
const MyPageButton = () => {

// state : userEmail pathValiable 상태값 관리 -> url에 태워보낼 파라미터 이름과 같아야함 userEmail
const { userEmail } = useParams();


// event handler : 마이페이지 버튼 클릭 이벤트 처리 함수
const onMyPageButtonClickHandler = () => {
  if(!loginUser) return;
  const { email } = loginUser;
  navigate(USER_PATH(email));
} 

// event handler : 로그인 버튼 클릭 이벤트 처리 함수
const onLoiginButtonClickHandler = () => {
  navigate(AUTH_PATH());
} 

// event handler : 로그아웃 버튼 클릭 이벤트 처리 함수
const onSignOutButtonClickHandler = () => {
  navigate(MAIN_PATH());
} 

// Render : 로그아웃 버튼 렌더링
if(isLogin && userEmail === loginUser?.email) // 사용자가 로그인하고 있으며(isLogin:true), 현재 로그인된 사용자의 이메일이 userEmail과 일치하는 경우에만 렌더링
return(<div className='black-button' onClick={onSignOutButtonClickHandler}>{'로그아웃'}</div>);
// Render : 마이페이지 버튼 렌더링
if (isLogin)
  return(<div className='white-button' onClick={onMyPageButtonClickHandler}>{'마이페이지'}</div>);
// Render : 로그인 버튼 렌더링
  return(<div className='black-button' onClick={onLoiginButtonClickHandler}>{'로그인'}</div>);


}


// Render : 헤더 화면 (Header) 렌더링 부분
  return (
    <div id='header'>
      <div className='header-container'>
        <div className='header-left-box' onClick={onLogoClickHandler}>
          <div className='icon-box'>
            <div className='icon log-dark-icon'></div>
          </div>
          <div className='header-logo'>{`Seo's Board`}</div>
        </div>
        <div className='header-light-box'>
          <SearchButton />
          <MyPageButton />
        </div>
      </div>
    </div>
  )
}
