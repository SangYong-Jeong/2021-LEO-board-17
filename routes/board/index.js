const path = require('path')
const express = require('express')
const router = express.Router()

/*
# board 주소체계
- list 									: 	GET 		| /board/list, board/list/<페이지>
- view 									: 	GET 		| /board/view/<idx>
- write(form)						: 	GET 		| /form
- update(form)					: 	GET 		| /form/:idx
- create + update				:		POST 		| /board/<idx>
- delete								:		DELETE 	| /board/<idx>
- file download 				: 	GET			| /board/download/<idx> 
- comment save					:		POST		| /board/comment
*/

const listRouter = require('./list-router')
const writeRouter = require('./save-router')
const formRouter = require('./form-router')
const viewRouter = require('./view-router')

router.post('/', writeRouter)
router.use('/form', formRouter)
router.use('/list', listRouter)
router.use('/view', viewRouter)

module.exports = router