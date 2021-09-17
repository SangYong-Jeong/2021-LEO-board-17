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
  - files2로 file 관련 테이블 하나 더 추가 -> files1과 동일하게 테이블 잡는다. (완료)
  - files2에 데이터를 넣는 input관련 write, view, update 순으로 수정 작업 시작
  - (설계)
  - create-router 에서는 uploader.fields로 처리해 각 파일 데이터를 데이터베이스에 넣으면 될 것 같다. (multer에서 if문 써서 files의 파일은 storage-files1에 files2의 파일은 storage-files2에 집어 넣는다. 이 경우 삭제할 때, delete 이용하고 moveFile, relPath, absPath 수정좀 들어가야한다. ) - 데이터 집어넣는 부분 완료 , static 포함 다 수정 완료
  - view-router 에서는 데이터를 불러올 때 LEFT JOIN이 한 번 더 들어가서 files2에 있는 데이터를 가져오면 될 것 같다. (완료)
  - delete-router 에서 지울 때 어떻게 지울지 설계가 필요하다. (delete router 에서 지우는 거 (완료))
  - download-router 수정해서 두 번째 첨부파일도 다운받을 수 있게 만들기 (완료)
  - update.ejs 수정 완료
  - file-api.js 수정 완료
  - update-router 에서는 내용 업데이트는 동일하게 진행하고 파일 업데이트에 if문이 한 번 더 들어가서 files2에 데이터 있는지 확인하고 지워주면 될 것 같다.
  - update-router validation 하기 (검증 완료)
  - (추가적으로 해보고 싶은게 storages1에는 files1의 데이터가 들어가게 하고 storages2에는 files2의 데이터가 들어가게 만드는것도 재미있을것 같다. multer를 통과할때 위에 있는 type="file " input부터 차례대로 미들웨어를 통과하게 되므로 디버거로 한 번 찍어본 후에 진행할 수 있을것 같다.) - 이미 완성했다. 


8. 전부 다 하고 filename 수정해서 각 첨부파일마다 다른 파일이름을 써보자 (굳이 그래야할까?) 응 한 번 해보자 다하고나서
  - 이 경우에는 우선 middleware에 있는 multer 수정하고나서 util에 있는 relPath, absPath, moveFile 수정해야한다. 나중에 해도 괜찮을 것 같다.

The End -> ejs로 게시판 만들기 완성인것 같다.

9.  version upgrade 다 되면 처음부터 pug version으로 한 번 짜보기

... 그 외 생각나는 부분 있으면 한 번 짜보자