import React from 'react';
import './App.css';
import BoardItem from 'components/BoardItem';
import Top3Item from 'components/Top3Item';
import { top3BoardListMock } from "mocks";
import { latestBoardListMock } from 'mocks';


function App() {
  return (
    <>
    {/* {latestBoardListMock.map(boardListItems =>   <BoardItem  boardListItem={boardListItems}/>)} */}
    <div style={ {display: 'flex', justifyContent : 'center', gap : '24px'}}>
      {top3BoardListMock.map(top3ListItems => <Top3Item top3ListItem={top3ListItems}/>)}
    </div>
    </>
  );
}

export default App;
