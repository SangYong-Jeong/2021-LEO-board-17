1. comment - 삭제 기능 (옆에 X있으면 좋을듯) - X는 fa fa-times로 
  - upgrade를 해보자
  - 삭제할시 ajax 통신으로 data바로 지워준 후 프론트에서 해당 부분 없애면 괜찮을 듯
  - 우선 디자인 부터 잡아보자 (clear - 삭제 button design 완료)
	- delete router 까지 요청이 잘 들어가는 것 확인
	- view.js에서 댓글 삭제시 프론트에서 바로 안보이게 parent.remove() 해주기
(수정완료)
  - comment removeAt 추가 (완료)

2. 프론트에서 validation 하는 것 추가 하기
  - NOT NULL 부분 체크해서 그 부분 빈문자열로 올 시에 alert 띄우기 (return false 시키기 - e.preventDefault() 사용시 return false 필요 x, submit() 이용해서 내가 form data 전송하는 timing 마음대로 하는 것 가능)
  
  - write(완료, data-lang 이용해서 영어버전 필요), update 부분(완료) -> title , writer validation
  
  - comment 부분(완료) -> writer, comment validation 

3. comment - pager 기능(view-router에서 pager 해야할듯) - listRouter 참고
  - pager-comment.ejs 수정 및 pager.css view.ejs에 붙이기
  - page를 어떻게 가져올것인가가 key point
  - (view Router 수정 -> /view/:id/:page)
  (댓글 pager 처리는 완료)
  commentForm에서 comment 전송할때 안되는 거 확인 필요 (redirect 수정 필요)
  - 댓글 추가 시 잘 작동하게 완료 pager.ejs list와 view에서 동시에 사용 할 수 있도록 수정함

4. board/list 번호 부분 post.id 쓰지 않고 for문 써서 totalRecord 기준에 맞춰서 추가(완료)

5. board table에 updateAt 추가해서 수정했을때 시간 데이터 추가적으로 넣어주면 괜찮을듯
  - updateAt board에만 추가 나중에 comment table에도 추가
  - 수정완료 - > 과거 게시글에는 적용 안됨 싹 지우고 다시 하면 될듯

6. comment 수정기능 추가하면 괜찮을듯( 수정 되는 거 완료)
  - 수정 버튼 누르고 누르면은 api 통해서 해당 부분에 form input 집어 넣고 짜면 될듯
  - 모든 수정 버튼 click시 아래의 delete button 과 동일한 event를 준다. 
  - pager 아래에 있는 input의 css를 주자.
  - 수정의 경우에도 DB에 있는 해당 댓글 data의 statuts를 0으로 바꿔주고 댓글 작성 부분, 댓글 리스트 테이블, 부분을 지워버리고 수정부분만 추가하자 (완료)
  - 수정부분 input을 put으로 보낸다. (put으로 보내는 거 까지 완료!) 이제 수정할 부분 해주고 redirect로 쏴주면 된다. 
  - redirect로 viewpage 보이게 한다. 
  - comments table에 updateAt 추가하고 updateAt comment put router 에서 수정하기



7. file upload 하는 기능 추가하면 좋을 듯 
  - 이 경우 테이블 하나 추가적으로 만들어서 처리하면 좋을듯

8. version upgrade 다 되면 pug version으로 한 번 짜보기
