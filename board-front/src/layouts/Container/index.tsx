import React, { useState } from 'react'
import Header from 'layouts/Header'
import Footer from 'layouts/Footer'
import { Outlet, useLocation } from 'react-router-dom'
import { AUTH_PATH } from 'constant';
import { commentListMock, favoriteListMock, top3BoardListMock } from 'mocks';
import CommentItem from 'components/CommentItem';
import FavarioteItem from 'components/FavarioteItem';
import InputBox from 'components/InputBox';
import Top3Item from 'components/Top3Item';

// Component : Container 화면 (Container) 컴포넌트
export default function Container() {

// State : 현재 페이지 path state 상태
const  {pathname } = useLocation();
const [value, setValue] = useState<string>('');

const onTestChangeHandler = () => {
  alert('test')
}


// Render : Container 화면 (Container) 렌더링 부분
  return (
    <>
    <Header />
    <Outlet />
        {/* BoardListMock */}
    {/* {latestBoardListMock.map(boardListItems =>   <BoardItem  boardListItem={boardListItems}/>)} */}

    {/* top3BoardListMock */}
    <div style={ {display: 'flex', justifyContent : 'center', gap : '24px'}}>
      {top3BoardListMock.map(top3ListItems => <Top3Item top3ListItem={top3ListItems}/>)}
    </div>

    {/* commentListMock */}
    <div style={{padding : '0 24px', display: 'flex', flexDirection: 'column', gap : '30px' }}>
      {commentListMock.map(commentListItems => <CommentItem commentListItem={commentListItems} />)}
    </div>

    {/* favoriteListMock */}
    <div style={{display: 'flex', columnGap : '30px', rowGap : '20px' }}>
      {favoriteListMock.map(favoriteListItems => <FavarioteItem favoriteListItme={favoriteListItems} />)}
    </div>

    {/* InputBox */}
    <div>
    <InputBox label='이메일' type='text' placeholder='이메일 주소를 입력해주세요' value={value} error={true} onChange={onTestChangeHandler} message='에러메세지 테스트'/>
    </div>

    {/* <div>
    <Footer />  
    </div> */}
    {/* 만약 pathname '/auth'가 아니면 <Footer /> 출력 */}
    {pathname !== AUTH_PATH() &&  <Footer />}
    </>
  )
}
