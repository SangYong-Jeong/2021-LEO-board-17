module.exports = _lang => {
	lang = _lang.toUpperCase()
	switch(lang) {
		case 'KO':
			return {
				ERROR: {
					NOT_FOUND : '존재하지 않는 데이터입니다.'
				},
				GLOBAL : {
					LOGO 			: '노드 게시판',
					TAB_TITLE : 'Express 게시판',
					NAVI : ['게시글 등록', '게시글 리스트']
				},
				LIST : {
					TITLE : '게시글 리스트',
					DESC	: '노드 게시판 리스트 입니다.'
				},
				VIEW : {
					TITLE : '게시글 상세 보기',
					DESC	: '노드 게시판 게시글 상세 보기입니다.'
				},
				CREATE : {
					TITLE : '게시글 신규 등록',
					DESC	: '노드 게시판 게시글 등록페이지 입니다.'
				},
				UPDATE : {
					TITLE : '게시글 수정',
					DESC	: '노드 게시판 게시글 수정페이지 입니다.'
				},
				FIELD : {
					NO : '번호',
					TITLE	: '제목',
					WRITER	: '작성자',
					CONTENT	: '내용',
					UPFILE	: '첨부파일',
					DATE	: '작성일',
					READCOUNT	: '조회수',
				},
				BT : {
					CREATE : '등록',
					UPDATE	: '수정',
					DELETE	: '삭제',
					LIST	: '리스트',
					RESET	: '다시 등록',
				},
				MSG : {
					DELETE : '정말로 삭제하시겠습니까?'
				}
			}
		case 'EN':
			return {
				ERROR: {
					NOT_FOUND : 'Not Found Data'
				},
				GLOBAL : {
					LOGO 			: 'Node Board',
					TAB_TITLE : 'Express Board',
					NAVI : ['Post registration', 'Post List']
				},
				LIST : {
					TITLE : 'Post List',
					DESC	: 'This is a list of node bulletin boards.'
				},
				VIEW : {
					TITLE : 'View post details',
					DESC	: 'This is a detailed view of the Node bulletin board post.'
				},
				CREATE : {
					TITLE : 'New post',
					DESC	: 'Node bulletin board post registration page.'
				},
				UPDATE : {
					TITLE : 'Edit post',
					DESC	: 'Node bulletin board post edit page.'
				},
				FIELD : {
					NO : 'No',
					TITLE	: 'Title',
					WRITER	: 'Writer',
					CONTENT	: 'Content',
					UPFILE	: 'Upfile',
					DATE	: 'Date',
					READCOUNT	: 'Readcount',
				},
				BT : {
					CREATE : 'CREATE',
					UPDATE	: 'UPDATE',
					DELETE	: 'DELETE',
					LIST	: 'LIST',
					RESET	: 'RESET',
				},
				MSG : {
					DELETE : 'Are you sure you want to delete it?'
				}
			}
	}
}