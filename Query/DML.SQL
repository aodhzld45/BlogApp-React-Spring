-- Active: 1701694673746@@127.0.0.1@3306@board
-- 회원가입
INSERT INTO 
`user` VALUES 
('test@naver.com', 'P!ssw0rd', 'nickname2','01045678900','서울특별시 강남구', '강남역', NULL);

--로그인
SELECT * FROM `user` WHERE `email` = 'test@naver.com';

--게시물 작성 + 이미지 삽입
INSERT INTO board (title, content, write_datetime, favorite_count, comment_count, view_count, writer_email)
 VALUES ('제목입니다2.', '내용입니다2.','2023-12-06 16:40', 0,0,0,'prking94@naver.com');

 INSERT INTO 
 image VALUES (1, 'URL');

 -- 댓글 작성 
 INSERT INTO 
 comment (content, write_datetime, user_email, board_number )
 VALUES('댓글 내용입니다.', '2023-12-06 16:24', 'prking94@naver.com', 1);

-- 게시물 댓글수 +1 중복 허용
 UPDATE board SET comment_count = comment_count + 1 WHERE board_number = 1;

 -- 좋아요
 INSERT INTO 
 favorite VALUES ('prking94@naver.com', 1);

 -- 좋아요 수 +1 중복 허용
 UPDATE board SET favorite_count = favorite_count + 1 WHERE board_number = 1;

 -- 좋아요 취소
 DELETE FROM favorite WHERE user_email = 'prking94@naver.com' AND board_number = 1;

 -- 게시물 수정 : 이미지 삭제 후 다시 INSERT
 UPDATE board SET title = '수정 테스트 제목입니다.', content = '수정 테스트 내용입니다.' WHERE board_number = 1;
 DELETE FROM image WHERE board_number = 1;
  INSERT INTO 
 image VALUES (1, 'URL');

 -- 게시물 삭제
DELETE FROM comment WHERE board_number = 1;
DELETE FROM favorite WHERE board_number = 1;
DELETE FROM board WHERE board_number = 1;

-- 상세 게시물 불러오기
SELECT 
    B.board_number AS board_number,
    B.title AS title,
    B.content AS content,
    B.write_datetime AS write_datetime,
    B.writer_email AS writer_email,
    U.nickname AS nickname,
    U.profile_image AS profile_image
FROM board AS B
INNER JOIN `user` AS U
ON B.writer_email = U.email
WHERE board_number = 1;

SELECT image 
FROM image
WHERE board_number = 1;

-- 최신 게시물 리스트 불러오기 상위 5개- 1  ANY_VALUE MYSQL 함수를 이용한 방법
-- SELECT 
--     B.board_number AS board_number,
--     B.title AS title,
--     B.content AS content,
--     I.image AS title_image,
--     B.view_count AS view_count,
--     B.favorite_count AS favorite_count,
--     B.comment_count AS comment_count,
--     B.write_datetime AS write_datetime,
--     U.nickname AS nickname,
--     U.profile_image AS profile_image
-- FROM board AS B
-- INNER JOIN `user` AS U
-- ON B.writer_email = U.email
-- LEFT JOIN (SELECT board_number, ANY_VALUE(image) AS image FROM image GROUP BY board_number) AS I
-- ON B.board_number = I.board_number
-- ORDER BY write_datetime
-- LIMIT 0, 5;

-- 최신 게시물 리스트 불러오기 상위 5개 - 2 스칼라 서브쿼리를 이용한 방법
SELECT 
    B.board_number AS board_number,
    B.title AS title,
    B.content AS content,
    (SELECT image FROM image WHERE board_number = B.board_number LIMIT 1) AS image,
    B.view_count AS view_count,
    B.favorite_count AS favorite_count,
    B.comment_count AS comment_count,
    B.write_datetime AS write_datetime,
    U.nickname AS nickname,
    U.profile_image AS profile_image
FROM board AS B
INNER JOIN `user` AS U ON B.writer_email = U.email
ORDER BY write_datetime
LIMIT 0, 5;

-- 검색어 리스트 불러오기 스칼라 서브쿼리를 이용한 방법
SELECT 
    B.board_number AS board_number,
    B.title AS title,
    B.content AS content,
    (SELECT image FROM image WHERE board_number = B.board_number LIMIT 1) AS image,
    B.view_count AS view_count,
    B.favorite_count AS favorite_count,
    B.comment_count AS comment_count,
    B.write_datetime AS write_datetime,
    U.nickname AS nickname,
    U.profile_image AS profile_image
FROM board AS B
INNER JOIN `user` AS U ON B.writer_email = U.email
WHERE title LIKE '%테스트%' OR content LIKE '%테스트%'
ORDER BY write_datetime;

-- 주간 TOP 3 게시물
SELECT 
    B.board_number AS board_number,
    B.title AS title,
    B.content AS content,
    (SELECT image FROM image WHERE board_number = B.board_number LIMIT 1) AS image,
    B.view_count AS view_count,
    B.favorite_count AS favorite_count,
    B.comment_count AS comment_count,
    B.write_datetime AS write_datetime,
    U.nickname AS nickname,
    U.profile_image AS profile_image
FROM board AS B
INNER JOIN `user` AS U ON B.writer_email = U.email
WHERE B.write_datetime BETWEEN '2023-12-06 00:00' AND '2023-12-13 23:59'
ORDER BY favorite_count DESC, comment_count DESC, view_count DESC, write_datetime DESC
LIMIT 3;







