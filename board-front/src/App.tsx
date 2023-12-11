import React from 'react';
import './App.css';
import BoardItem from 'components/BoardItem';
import Top3Item from 'components/Top3Item';
import CommentItem from 'components/CommentItem';
import { top3BoardListMock, latestBoardListMock, commentListMock, favoriteListMock  } from "mocks";
import FavarioteItem from 'components/FavarioteItem';


function App() {
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


    </>
  );
}

export default App;
