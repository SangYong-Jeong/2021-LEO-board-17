const path = require('path')
const express = require('express')
const router = express.Router()

/*
# board 주소체계
- list 												: 	GET 		| /board/list, board/list/:page
- view 												: 	GET 		| /board/view/:id
- write(form) + update(form) 	: 	GET 		| [/form], [/form/:id] 
- create											:		POST 		| /board
- update											:		POST 		| /board/:id
- delete											:		DELETE 	| /board/delete/:id
- file download 							: 	GET			| /board/download/<id> 
파일 업로드 만들고 다운로드 추가
- comment save								:		POST		| /board/comment
*/

const listRouter = require('./list-router')
const writeRouter = require('./create-router')
const formRouter = require('./form-router')
const viewRouter = require('./view-router')
const deleteRouter = require('./delete-router')
const updateRouter = require('./update-router')

router.post('/', writeRouter)
router.post('/:id', updateRouter)
router.use('/delete', deleteRouter)
router.use('/form', formRouter)
router.use('/list', listRouter)
router.use('/view', viewRouter)

module.exports = router