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
        <td>로그인 기능 (signIn)</td>
        <td>사용자 로그인을 처리하는 기능</td>
      </tr>
      <tr>
        <td>회원가입 기능 (signUp)</td>
        <td>새로운 사용자를 등록하는 기능</td>
      </tr>
      <tr>
        <td>주간 Top 3 게시물 (WeeklyTop3List)</td>
        <td>주간 인기 게시물 상위 3개를 표시하는 기능</td>
      </tr>
      <tr>
        <td>최근 게시물 리스트 (currentList)</td>
        <td>가장 최근에 작성된 게시물 목록을 표시하는 기능</td>
      </tr>
      <tr>
        <td>인기 검색어 리스트 (popularWordList)</td>
        <td>사용자들이 많이 검색한 인기 검색어 목록을 표시하는 기능</td>
      </tr>
      <tr>
        <td>검색 게시물 리스트 (searchList)</td>
        <td>사용자가 입력한 검색어에 대한 검색 결과를 표시하는 기능</td>
      </tr>
      <tr>
        <td>관련 검색어 리스트 (relativeWordList)</td>
        <td>현재 검색어와 관련이 있는 다른 검색어 목록을 표시하는 기능</td>
      </tr>
      <tr>
        <td>게시물 상세 보기 (boardDetail)</td>
        <td>선택한 게시물의 상세 내용을 표시하는 기능</td>
      </tr>
      <tr>
        <td>좋아요 리스트 (favoriteList)</td>
        <td>사용자가 누른 좋아요 목록을 표시하는 기능</td>
      </tr>
      <tr>
        <td>좋아요 기능 (favorite)</td>
        <td>게시물에 좋아요를 누르는 기능</td>
      </tr>
      <tr>
        <td>댓글 리스트 (commentList)</td>
        <td>선택한 게시물의 댓글 목록을 표시하는 기능</td>
      </tr>
      <tr>
        <td>댓글 쓰기 (Post Comment)</td>
        <td>게시물에 댓글을 작성하는 기능</td>
      </tr>
      <tr>
        <td>게시물 삭제 (boardDelete)</td>
        <td>사용자가 작성한 게시물을 삭제하는 기능</td>
      </tr>
      <tr>
        <td>게시물 작성 (boardWrite)</td>
        <td>새로운 게시물을 작성하는 기능</td>
      </tr>
      <tr>
        <td>게시물 수정 (boardUpdate)</td>
        <td>사용자가 작성한 게시물을 수정하는 기능</td>
      </tr>
      <tr>
        <td>유저 정보 불러오기 (GetUser)</td>
        <td>현재 로그인한 사용자의 정보를 불러오는 기능</td>
      </tr>
      <tr>
        <td>특정 유저 게시물 리스트 (userBoardList)</td>
        <td>특정 사용자가 작성한 게시물 목록을 표시하는 기능</td>
      </tr>
      <tr>
        <td>파일 업로드 (fileUpload)</td>
        <td>게시물에 첨부 파일을 업로드하는 기능</td>
      </tr>
      <tr>
        <td>파일 불러오기 (getFile)</td>
        <td>게시물에 첨부된 파일을 다운로드하는 기능</td>
      </tr>
      <!-- 나머지 기능들도 유사한 형식으로 추가 -->
    </tbody>
  </table>

<h2>기능 상세 설계</h2>
<pre>
  ===================================
1. 로그인 기능 (signIn)

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
===================================

===================================
2. 회원가입 기능 (signUp)

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
===================================

===================================
3. 주간 Top 3 게시물 (WeeklyTop3List)

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
    writeDatetime : String,
    writerNickname : String,
    writerProfileImage : String
}

실패

데이터 베이스 에러

- HTTP status - 500 (Internal Server Error)
{
    code : "DE",
    message : "Database Error."
} 
===================================

===================================
4. 최근 게시물 리스트 (currentList)

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
    writeDatetime : String,
    writerNickname : String,
    writerProfileImage : String
}

실패

데이터 베이스 에러

- HTTP status - 500 (Internal Server Error)
{
    code : "DE",
    message : "Database Error."
} 

===================================

===================================

5. 인기 검색어 리스트 (popularWordList)

6. 검색 게시물 리스트 (searchList)

===================================
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
    writeDatetime : String,
    writerNickname : String,
    writerProfileImage : String
}

실패

데이터 베이스 에러

- HTTP status - 500 (Internal Server Error)
{
    code : "DE",
    message : "Database Error."
} 
===================================

7. 관련 검색어 리스트 (relativeWordList)

8. 게시물 상세 보기 (boardDetail)

9. 좋아요 리스트 (favoriteList)

10. 좋아요 기능 (favorite)

11. 댓글 리스트 (commentList)

12. 댓글 쓰기 (Post Comment)

13. 게시물 삭제 (boardDelete)

14. 게시물 작성 (boardWrite)

15. 게시물 수정 (boardUpdate)

16. 유저 정보 불러오기 (GetUser)

17. 특정 유저 게시물 리스트 (userBoardList)

18. 파일 업로드 (fileUpload)

19. 파일 불러오기 (getFile)
  
</pre>