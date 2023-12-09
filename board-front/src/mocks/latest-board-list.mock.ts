import { BoardListItem } from "types/interface";
import writerProfileImage from "assets/image/ryan.jpg"
import boardTitleImage from "assets/image/sanrio.gif"



const latestBoardListMock: BoardListItem[] = [
    {
        "boardNumber": 1,
        "title": "첫번째 게시글입니다.",
        "content": "풀스택을 공부하고 있습니다. 풀스택을 공부하고 있습니다. 풀스택을 공부하고 있습니다. 풀스택을 공부하고 있습니다.",
        "boardTitleImage": boardTitleImage,
        "favoriteCount": 0,
        "commentCount": 0,
        "viewCount": 0,
        "writeDatetime": "2023.12.09. 20:00",
        "writerNickname": "HyunSeok",
        "writerProfileImage": writerProfileImage
    },
    {
        "boardNumber": 2,
        "title": "두번째 게시글입니다.",
        "content": "취업을 하고 싶어요",
        "boardTitleImage": boardTitleImage,
        "favoriteCount": 0,
        "commentCount": 0,
        "viewCount": 0,
        "writeDatetime": "2023.12.09. 20:00",
        "writerNickname": "HyunSeok",
        "writerProfileImage": writerProfileImage
    },
    {
        "boardNumber": 3,
        "title": "세번째 게시글입니다.",
        "content": "좋아하는 가수는 윤도현입니다.",
        "boardTitleImage": boardTitleImage,
        "favoriteCount": 0,
        "commentCount": 0,
        "viewCount": 0,
        "writeDatetime": "2023.12.09. 20:00",
        "writerNickname": "HyunSeok",
        "writerProfileImage": writerProfileImage
    }

]

export default latestBoardListMock;

