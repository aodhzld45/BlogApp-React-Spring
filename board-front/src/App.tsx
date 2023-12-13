import './App.css';
import { Route, Routes } from 'react-router-dom';
import Main from 'views/Main';
import Authentication from 'views/Authentication';
import User from 'views/User';
import BoardDetail from 'views/Board/Detail';
import BoardWrite from 'views/Board/Write';
import BoardUpdate from 'views/Board/Update';
import Container from 'layouts/Container';
import {
  MAIN_PATH, AUTH_PATH, SEARCH_PATH, USER_PATH,
  BOARD_PATH, BOARD_WRITE_PATH, BOARD_UPDATE_PATH, BOARD_DETAIL_PATH
 } from 'constant';
import Search from 'views/Search';

// Component : Application 컴포넌트
// description : 메인화면 '/' - main
// description : 인증 - 로그인 / 회원가입 화면 '/auth' Authenticator
// description : 게시물 상세 화면 '/board/detail' BoardDetail
// description : 게시물 작성 화면 '/board/write' BoardWrite
// description : 게시물 수정 화면 '/board/update' BoardUpdate
// description : 검색 화면 '/search/searchWord' Search
// description : 유저 페이지 '/user/userEmail' User

function App() {


// Reder : Application rendering
  return (

    <>

    <Routes>

      {/* Layout 설정 부분 */}
    <Route element={<Container />}>
      <Route path={MAIN_PATH()} element={<Main />} />
      <Route path={AUTH_PATH()} element={<Authentication />} />
      <Route path={SEARCH_PATH(':searchWord')} element={<Search />}  />
      <Route path={USER_PATH(':userEmail')} element={<User />} />
      <Route path={BOARD_PATH()}>
        <Route path={BOARD_WRITE_PATH()} element={<BoardWrite />} />
        <Route path={BOARD_DETAIL_PATH(':boardNumber')} element={<BoardDetail />} />
        <Route path={BOARD_UPDATE_PATH(':boardNumber')} element={<BoardUpdate />} />
      </Route>

      <Route path='*' element={<h1>404 NOT FOUND 페이지를 찾을 수 없습니다.</h1>} />

    </Route>


    </Routes>


    </>
  );
}

export default App;
