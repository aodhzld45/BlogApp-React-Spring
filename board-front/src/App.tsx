import React, { useState } from 'react';
import './App.css';
import BoardItem from 'components/BoardItem';
import Top3Item from 'components/Top3Item';
import CommentItem from 'components/CommentItem';
import { top3BoardListMock, latestBoardListMock, commentListMock, favoriteListMock  } from "mocks";
import FavarioteItem from 'components/FavarioteItem';
import InputBox from 'components/InputBox';
import Footer from 'layouts/Footer';


function App() {

  const [value, setValue] = useState<string>('');


  return (
    <>
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
    <InputBox label='이메일' type='text' placeholder='이메일 주소를 입력해주세요' value={value} error={true} setValue={setValue} message='에러메세지 테스트'/>
    </div>

    <div>
    <Footer />  
    </div>


    </>
  );
}

export default App;
