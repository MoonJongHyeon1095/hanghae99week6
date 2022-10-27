# hanghae99week6

## 항해99 6주차 미니프로젝트 백엔드  

<br>   

## 프로젝트소개  
- 거리응원 모임, 스터디 모임, 혹은 맛집 탐방 모임...    
- 유저가 스스로 다양한 모임을 등록하고 참여자를 모집합니다.

<br>   

## 프로젝트 기간
- 2022년10월21일 ~ 27일

<br>   

## 와이어 프레임
https://excalidraw.com/#room=050e1181906a87f2b2b0,QUiV1km1hkJVEKoVQZpetA  

<br>   

## 🛠 개발툴

- Server: AWS EC2 
- Framework: Express (NodeJS)
- Database: MySQL, AWS S3

<br>   

## 핵심기능
- 모임모집 게시글 CRUD
- 모임모집 게시글에 대한 참여 및 좋아요 표시 CRUD
- 모임모집 게시글에 대한 댓글 CRUD
- 회원가입 및 로그인 : JWT토큰 발행 및 Passport를 이용한 소셜로그인   

<br>   
   
## 트러블 슈팅

<details><summary>
Sezulize 관련
</summary>

[include사용시 as 별칭 에러](https://github.com/MoonJongHyeon1095/hanghae99week6/issues/15#issue-1419712147)   


</details>


<details><summary>
Multer S3 관련
</summary>

[Multer S3 패키지 버전 관련 에러](https://github.com/MoonJongHyeon1095/hanghae99week6/issues/12#issue-1419561439)   

[AWS S3 문자열 파싱 기능장애 관련](https://github.com/MoonJongHyeon1095/hanghae99week6/issues/13#issue-1419567497)   

</details>


<details><summary>
라우터 관련
</summary>

[이미지 업로드 라우터 경로 문제](https://github.com/MoonJongHyeon1095/hanghae99week6/issues/14#issue-1419573072)   

</details>

  
   
<br>   
   

   
## API   

- users routes

| 기능 | Method | URL | Request | Response |
| --- | --- | --- | --- | --- |
| 로그인 요청 | POST  | /login | {"email" : “test@test.com”, "password": "1234"} | JWT 토큰이 담긴 쿠키 |
| 회원가입 | POST | /signup | {"email" : “test@test.com”,"nickname": “test”, "password :"1234"} ||
| 마이 페이지 | GET | /mypage |

- meetings routes

| 기능 | Method | URL | Request | Response |
| --- | --- | --- | --- | --- |
| 게시글전체목록조회 | GET | /meetings | | {"data": [{"meetingId": 4, "userId": 1, "nickname": "test", "title": "테스트입니다4", "content": "테스트랄까요", "createdAt": "2022-10-23T02:58:20.000Z", "updatedAt": "2022-10-23T02:58:20.000Z", "participateCount": 0, "likeCount": 0, "isLike": false},{"meetingId": 3, "userId": 1, "nickname": "test", "title": "테스트입니다3", "content": "테스트랄까요", "createdAt": "2022-10-23T02:58:17.000Z", "updatedAt": "2022-10-24T08:41:33.000Z", "participateCount": 1, "likeCount": 0, "isLike": false},{"meetingId": 2, "userId": 1, "nickname": "test", "title": "테스트입니다2", "content": "테스트랄까요", "createdAt": "2022-10-23T02:58:13.000Z", "updatedAt": "2022-10-24T08:19:19.000Z", "participateCount": 1, "likeCount": 1, "isLike": true},{"meetingId": 1, "userId": 1, "nickname": "test", "title": "수정을해봅니다", "content": "수정을해봅시다", "createdAt": "2022-10-23T02:57:35.000Z", "updatedAt": "2022-10-24T08:19:15.000Z", "participateCount": 1, "likeCount": 1, "isLike": true}]}|
| 게시글 상세조회 | GET | /meetings/:meetingId | | {"data": {"meetingId": 1,"userId": 1,"nickname": "test", "title": "수정을해봅니다", "content": "수정을해봅시다", "createdAt": "2022-10-23T02:57:35.000Z", "updatedAt": "2022-10-24T08:19:15.000Z", "likeCount": 1, "participateCount": 1, "isLike": true}}|
| 게시글 작성 | POST | /meetings/:meetingId |{title : “너만오면”, content: “고”} |{"message" : “게시글이 생성되었습니다.”} | 
| 게시글 이미지 업로드 | POST | /meetings/:meetingId/images| req.files |[  imageUrls : “https://S3버킷이름/이미지이름”, “https://S3버킷이름/이미지이름”, “https://S3버킷이름/이미지이름”, “https://S3버킷이름/이미지이름”, “https://S3버킷이름/이미지이름”, ] |
| 게시글 수정 | PUT | /meetings/:meetingId |{"meetingId":1,"title" : “너만왔다면”,"content": “고”} |{"message" : “게시글이 수정되었습니다.”}|
| 게시글 삭제 | DELETE | /meetings/:meetingId |{"meetingId":1} |{"message" : “게시글이 삭제되었습니다.”}|
| 게시글 이미지 삭제 | DELETE | /meetings/:meetingId/images |{"name" : "삭제할이미지이름"}|{"message" : “이미지가 삭제되었습니다.”}|


<br>   

- likes routes

| 기능 | Method | URL | Request | Response |
| --- | --- | --- | --- | --- |
| 좋아요 등록 및 취소 | PUT | /likes/:meetingId | {"meetingId" : 1} | {msg:"좋아요!"}|


<br>

- participates routes


| 기능 | Method | URL | Request | Response |
| --- | --- | --- | --- | --- |
| 좋아요 등록 및 취소 | PUT | /participates/:meetingId | {"meetingId" : 1} |{msg:"참여하기 완료!"} |

<br>

- comments routes

| 기능 | Method | URL | Request | Response |
| --- | --- | --- | --- | --- |
| 댓글조회 | GET | /comments/:meetingId || |
| 댓글 작성| POST | /comments/:meetingId |{"comment": “댓글입니다”}|{"message": “댓글이 등록되었습니다”}|
| 댓글수정 | PUT | /comments/:commentId | {"commentId":1,"conmment": “댓글수정입니다”}| {"message" : “댓글이 수정되었습니다.”}|
| 댓글삭제 | DELETE | /comments/:commentId |{"commentId":1}|{"message" : “댓글이 삭제되었습니다.”}|

<br>

## ERD

![ERD](https://user-images.githubusercontent.com/98438390/198233067-f286fbad-7418-4c01-8991-c8f70e2d2c50.png)

