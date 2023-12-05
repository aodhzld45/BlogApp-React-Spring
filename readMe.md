<h1> React(Front) & Spring Boot(Back) + MySQL(DB) </h1>
<pre>
    React(Front) & Spring Boot(Back) + MySQL(DB) 게시판형 블로그 만들기
</pre>

<h2>게시판 기능 목록</h2>
<table style= {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }>
    <thead>
      <tr>
        <th>기능</th>
        <th>설명</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1. 로그인 기능 (signIn)</td>
        <td>사용자 로그인을 처리하는 기능</td>
      </tr>
      <tr>
        <td>2. 회원가입 기능 (signUp)</td>
        <td>새로운 사용자를 등록하는 기능</td>
      </tr>
      <tr>
        <td>3. 주간 Top 3 게시물 (WeeklyTop3List)</td>
        <td>주간 인기 게시물 상위 3개를 표시하는 기능</td>
      </tr>
      <tr>
        <td>4. 최근 게시물 리스트 (currentList)</td>
        <td>가장 최근에 작성된 게시물 목록을 표시하는 기능</td>
      </tr>
      <tr>
        <td>5. 인기 검색어 리스트 (popularWordList)</td>
        <td>사용자들이 많이 검색한 인기 검색어 목록을 표시하는 기능</td>
      </tr>
      <tr>
        <td>6. 검색 게시물 리스트 (searchList)</td>
        <td>사용자가 입력한 검색어에 대한 검색 결과를 표시하는 기능</td>
      </tr>
      <tr>
        <td>7. 관련 검색어 리스트 (relativeWordList)</td>
        <td>현재 검색어와 관련이 있는 다른 검색어 목록을 표시하는 기능</td>
      </tr>
      <tr>
        <td>8. 게시물 상세 보기 (boardDetail)</td>
        <td>선택한 게시물의 상세 내용을 표시하는 기능</td>
      </tr>
      <tr>
        <td>9. 좋아요 리스트 (favoriteList)</td>
        <td>사용자가 누른 좋아요 목록을 표시하는 기능</td>
      </tr>
      <tr>
        <td>10. 좋아요 기능 (favorite)</td>
        <td>게시물에 좋아요를 누르는 기능</td>
      </tr>
      <tr>
        <td>11. 댓글 리스트 (commentList)</td>
        <td>선택한 게시물의 댓글 목록을 표시하는 기능</td>
      </tr>
      <tr>
        <td>12. 댓글 쓰기 (Post Comment)</td>
        <td>게시물에 댓글을 작성하는 기능</td>
      </tr>
      <tr>
        <td>13. 게시물 삭제 (boardDelete)</td>
        <td>사용자가 작성한 게시물을 삭제하는 기능</td>
      </tr>
      <tr>
        <td>14. 게시물 작성 (boardWrite)</td>
        <td>새로운 게시물을 작성하는 기능</td>
      </tr>
      <tr>
        <td>15. 게시물 수정 (boardUpdate)</td>
        <td>사용자가 작성한 게시물을 수정하는 기능</td>
      </tr>
      <tr>
        <td>16. 유저 정보 불러오기 (GetUser)</td>
        <td>현재 로그인한 사용자의 정보를 불러오는 기능</td>
      </tr>
      <tr>
        <td>17. 특정 유저 게시물 리스트 (userBoardList)</td>
        <td>특정 사용자가 작성한 게시물 목록을 표시하는 기능</td>
      </tr>
      <tr>
        <td>18. 닉네임 수정 (patchNickname)</td>
        <td>사용자의 닉네잉을 수정하는 기능</td>
      </tr>
      <tr>
        <td>19. 프로필 이미지 수정 (patchProFileImage)</td>
        <td>사용자의 프로필 이미지를 수정하는 기능</td>
      </tr>
      <tr>
        <td>20. 파일 업로드 (fileUpload)</td>
        <td>게시물에 첨부 파일을 업로드하는 기능</td>
      </tr>
      <tr>
        <td>21. 파일 불러오기 (getFile)</td>
        <td>게시물에 첨부된 파일을 다운로드하는 기능</td>
      </tr>
      <!-- 나머지 기능들도 유사한 형식으로 추가 -->
    </tbody>
  </table>

<h2>Back-End InterFace API 명세</h2>
<pre>

<hr />

<h3>1. 로그인 기능 (signIn) / Method : POST / API URL - /api/v1/auth/sign-in</h3>

<hr />

- request 
{
    emailAddress : String,
    passWord : String
}

- response

성공 (Success) 

- HTTP status - 200 (ok)
{
    code : "SU",
    message : "Success",
    token : "jwt...",
    expiredDate : number13213
}

실패 (Failure)

필수 정보 미입력 (이메일, 패스워드)

- HTTP status - 401 (Unautomatic)
{
    code : "SF",
    message : "Sign In Failed."
} 

데이터 베이스 에러

- HTTP status = 500 (Internal Server Error)
{
    code : "DE",
    message : "Database Error."
} 
<hr />

<h3>2. 회원가입 기능 (signUp) / API URL - /api/v1/auth/sign-up</h3>

<hr />

- request
{
    email : String,
    password : String,
    nickname : String,
    telNumber : String,
    address : String,
    addressDetail : String,
}

- response

성공 (Success) 

- HTTP status - 200 (ok)
{
    code : "SU",
    message : "Success"
}

실패 (Failure)

필수 정보 미입력 / 이메일 포맷 불일치 / 비밀번호 8자 미만 / 전화번호 포맷 불일치

- HTTP status - 400 (Bad Request)
{
    code : "EE",
    message : "Existed Email..."
} 

데이터 베이스 에러

- HTTP status - 500 (Internal Server Error)
{
    code : "DE",
    message : "Database Error."
} 
<hr />

<h3>3. 주간 Top 3 게시물 (WeeklyTop3List) / API URL - /api/v1/board/top-3</h3>

<hr />

- response

성공 (Success) 

- HTTP status - 200 (ok)
{
    code : "SU",
    message : "Success",
    top3List: boardListItem[]
}

boardListItem[] 배열 구조 -
{
    boardNumber : int,
    title : stirng,
    content : string,
    favoriteCount : int,
    commentCount : int,
    viewCount : int,
    boardTitleImage : String,
    writeDatetime : String,
    writerNickname : String,
    writerProfileImage : String
}

실패 (Failure)

데이터 베이스 에러

- HTTP status - 500 (Internal Server Error)
{
    code : "DE",
    message : "Database Error."
} 
<hr />

<h3>4. 최근 게시물 리스트 (currentList) / API URL - /api/v1/board/current-list/{pageNumber}
</h3>

<hr />
- response

성공 (Success)
 
- HTTP status - 200 (ok)
{
    code : "SU",
    message : "Success",
    currentList: boardListItem[]
}

boardListItem[] 배열 구조 -
{
    boardNumber : int,
    title : stirng,
    content : string,
    favoriteCount : int,
    commentCount : int,
    viewCount : int,
    boardTitleImage : String,
    writeDatetime : String,
    writerNickname : String,
    writerProfileImage : String
}

실패 (Failure)

데이터 베이스 에러

- HTTP status - 500 (Internal Server Error)
{
    code : "DE",
    message : "Database Error."
} 
<hr />

5. 인기 검색어 리스트 (popularWordList)

<hr />

-response

성공 (Success)

- HTTP status - 200 (ok)
{
    code: "SU",
    message : "Success",
    popularWordList: String[]
}

실패 (Failure)

데이터 베이스 에러

- HTTP status - 500 (Internal Server Error)
{
    code : "DE",
    message : "Database Error."
} 
<hr />

<h3>6. 검색 게시물 리스트 (searchList) / API URL - /api/v1/board/search-list/{searchWord}</h3>

<hr />

- response

성공 (Success)

- HTTP status - 200 (ok)
{
    code : "SU",
    message : "Success",
    searchList: boardListItem[]
}

boardListItem[] 배열 구조 -
{
    boardNumber : int,
    title : stirng,
    content : string,
    favoriteCount : int,
    commentCount : int,
    viewCount : int,
    boardTitleImage : String,
    writeDatetime : String,
    writerNickname : String,
    writerProfileImage : String
}

실패 (Failure)

데이터 베이스 에러

- HTTP status - 500 (Internal Server Error)
{
    code : "DE",
    message : "Database Error."
} 
<hr />

7. 관련 검색어 리스트 (relativeWordList)

<hr />

-response

성공 (Success)

- HTTP status - 200 (ok)
{
    code: "SU",
    message : "Success",
    relativeWordList: String[]
}

실패 (Failure)

데이터 베이스 에러

- HTTP status - 500 (Internal Server Error)
{
    code : "DE",
    message : "Database Error."
} 
<hr />

<h3>8. 게시물 상세 보기 (boardDetail) / API URL - /api/v1/board/{boardNumber}</h3>

<hr />

-response

성공 (Success)

- HTTP status - 200 (ok)
{
    code: "SU",
    message : "Success",
    boardNumber : int,
    title : Stirng,
    content : String,
    boardImage : String,
    writerEmail : String,
    writeDatetime : String,
    writerNickname : String,
    writerProfileImage : String
}

실패 (Failure)

존재하지 않는 게시물

- HTTP status - 400 (Bad Request)
{
    code : "NB",
    message : "NO Existed Board Number",
} 
<hr />

<h3>9. 좋아요 리스트 (favoriteList) / API URL - /api/v1/board/{boardNumber}/favorite-list</h3>

<hr />

-response

성공 (Success)

- HTTP status - 200 (ok)
{
    code: "SU",
    message : "Success",
    favoriteList: favoriteListItem[]
}

favoriteListItem[] 구조 
{
    email : String,
    nickname : String,
    profileImg : String
}

실패 (Failure)

데이터 베이스 에러

- HTTP status - 500 (Internal Server Error)
{
    code : "DE",
    message : "Database Error."
} 
<hr />

10. 좋아요 기능 (favorite)

<hr />
- request
{
    boardNumber : int
}

- response

성공 (Success)

- HTTP status - 200 (ok)
{
    code: "SU",
    message : "Success"
}

실패 (Failure)

데이터 베이스 에러

- HTTP status - 500 (Internal Server Error)
{
    code : "DE",
    message : "Database Error."
} 
<hr />

<h3>11. 댓글 리스트 (commentList) / API URL - /api/v1/board/{boardNumber}/comment-list</h3>

<hr />

- response

성공 (Success)

- HTTP status - 200 (ok)
{
    code: "SU",
    message : "Success",
    commentList : commentListItem[]
}

commentListItem[] 배열 구조
{
    email : String,
    nickname : String,
    writeDatetime : String,
    content : String
}

실패 (Failure)

데이터 베이스 에러

- HTTP status - 500 (Internal Server Error)
{
    code : "DE",
    message : "Database Error."
} 
<hr />

12. 댓글 쓰기 (postComment)

<hr />

- request

{
    content: String
}

- response

성공 (Success)

- HTTP status - 200 (ok)
{
    code: "SU",
    message : "Success"
}

실패 (Failure)

1. 존재하지 않는 게시물

- HTTP status - 400 (Bad Request)
{
    code : "NB",
    message : "NO Existed Board Number"
} 

2. 존재하지 않는 유저

- HTTP status - 400 (Bad Request)
{
    code : "NU",
    message : "NO Existed User..."
} 

3. 데이터 베이스 에러

- HTTP status - 500 (Internal Server Error)
{
    code : "DE",
    message : "Database Error."
} 
<hr />

13. 게시물 삭제 (boardDelete)

<hr />

- response

성공 (Success)

- HTTP status - 200 (ok)
{
    code: "SU",
    message : "Success"
}

실패 (Failure)

1. 존재하지 않는 게시물

- HTTP status - 400 (Bad Request)
{
    code : "NB",
    message : "NO Existed Board Number"
} 
2. 존재하지 않는 유저

- HTTP status - 400 (Bad Request)
{
    code : "NU",
    message : "NO Existed User..."
} 

3. 권한 없음

- HTTP status - 403 (forbidden)
{
    code : "NP",
    message : "NO Permission..."
}

4. 데이터 베이스 에러

- HTTP status - 500 (Internal Server Error)
{
    code : "DE",
    message : "Database Error."
} 
<hr />

14. 게시물 작성 (boardWrite) * 필수값

<hr />

- request 
{
    *title : String,
    *content : String,
    boardImageList : String,
}

- response 

성공 (Success)

- HTTP status - 200 (ok)
{
    code: "SU",
    message : "Success"
}

실패 (Failure)

1. 존재하지 않는 게시물

- HTTP status - 400 (Bad Request)
{
    code : "NB",
    message : "NO Existed Board Number"
} 
2. 존재하지 않는 유저

- HTTP status - 400 (Bad Request)
{
    code : "NU",
    message : "NO Existed User..."
} 

3. 권한 없음

- HTTP status - 403 (forbidden)
{
    code : "NP",
    message : "NO Permission..."
}

4. 데이터 베이스 에러

- HTTP status - 500 (Internal Server Error)
{
    code : "DE",
    message : "Database Error."
} 
<hr />

15. 게시물 수정 (boardUpdate)

<hr />

- request 

{
    *title : String,
    *content : String,
    boardImageList : String,
}

- response 

성공 (Success)

- HTTP status - 200 (ok)
{
    code: "SU",
    message : "Success"
}

실패 (Failure)

1. 존재하지 않는 게시물

- HTTP status - 400 (Bad Request)
{
    code : "NB",
    message : "NO Existed Board Number"
} 
2. 존재하지 않는 유저

- HTTP status - 400 (Bad Request)
{
    code : "NU",
    message : "NO Existed User..."
} 

3. 권한 없음

- HTTP status - 403 (forbidden)
{
    code : "NP",
    message : "NO Permission..."
}

4. 데이터 베이스 에러

- HTTP status - 500 (Internal Server Error)
{
    code : "DE",
    message : "Database Error."
} 

<hr />

16. 유저 정보 불러오기 (GetUser)

<hr />

- response

성공 (Success)

- HTTP status - 200 (ok)
{
    code : "SU",
    message : "Success",
    email: String,
    nickname: String,
    profileImg : String
}

실패 (Failure)

1. 존재하지 않는 유저

- HTTP status - 400 (Bad Request)
{
    code : "NU",
    message : "NO Existed User..."
} 

2. 데이터 베이스 에러

- HTTP status - 500 (Internal Server Error)
{
    code : "DE",
    message : "Database Error."
} 
<hr />

<h3>17. 특정 유저 게시물 리스트 (userBoardList) / API URL - /api/v1/board/user-board-list/{email}</h3>

<hr />

- response

성공 (Success)

- HTTP status - 200 (ok)
{
    code : "SU",
    message : "Success",
    boardList: boardListItem[]
}

boardListItem[] 배열 구조 -
{
    boardNumber : int,
    title : stirng,
    content : string,
    favoriteCount : int,
    commentCount : int,
    viewCount : int,
    writeDatetime : String,
    writerNickname : String,
    writerProfileImage : String
}

실패 (Failure)

데이터 베이스 에러

- HTTP status - 500 (Internal Server Error)
{
    code : "DE",
    message : "Database Error."
} 
<hr />

18. 닉네임 수정 (patchNickname)

<hr />

- request 
{
    nickname : String
}

- response

성공 (Success)

- HTTP status - 200 (ok)
{
    code : "SU",
    message : "Success",
}

실패 (Failure)

1. 존재하지 않는 유저

- HTTP status - 400 (Bad Request)
{
    code : "NU",
    message : "NO Existed User..."
} 

2. 데이터 베이스 에러

- HTTP status - 500 (Internal Server Error)
{
    code : "DE",
    message : "Database Error."
} 
<hr />

19. 프로필 이미지 수정 (patchProFileImage)

<hr />

- request 
{
    profileImage : String
}

- response

성공 (Success)

- HTTP status - 200 (ok)
{
    code : "SU",
    message : "Success",
}

실패 (Failure)

1. 존재하지 않는 유저

- HTTP status - 400 (Bad Request)
{
    code : "NU",
    message : "NO Existed User..."
} 

2. 데이터 베이스 에러

- HTTP status - 500 (Internal Server Error)
{
    code : "DE",
    message : "Database Error."
} 
<hr />

20. 파일 업로드 (fileUpload)

<hr />

<hr />

21. 파일 불러오기 (getFile)

<hr />

<hr />

</pre>