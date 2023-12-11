import { CommentListItem } from "types/interface";
import writerProfileImage from "assets/image/ryan.jpg"
import boardTitleImage from "assets/image/sanrio.gif"

const commentListMock: CommentListItem[] = [

    {
        "nickName": "사용자1",
        "profileImage": writerProfileImage,
        "writeDatetime": "2023-12-11T10:30:00",
        "content": "안녕하세요! 반갑습니다."
      },
      {
        "nickName": "사용자2",
        "profileImage": null,
        "writeDatetime": "2023-12-11T11:45:00",
        "content": "오늘 날씨가 정말 좋네요."
      },
      {
        "nickName": "사용자3",
        "profileImage": boardTitleImage,
        "writeDatetime": "2023-12-11T13:20:00",
        "content": " 정말 유용하네요!"
      }

]

export default commentListMock;