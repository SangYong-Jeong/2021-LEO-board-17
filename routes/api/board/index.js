const path = require('path')
const express = require('express')
const router = express.Router()

/*
		/board/api/file 가면 ajax 통신
*/
const commentApiRouter = require('./comment-api')
const fileApiRouter = require('./file-api')

router.use('/file', fileApiRouter)
router.use('/comment', commentApiRouter)

module.exports = router